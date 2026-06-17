'use client';
import React, { useEffect, useRef } from 'react';

interface FluidCursorProps {
  simResolution?: number;
  dyeResolution?: number;
  captureResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  backColor?: { r: number; g: number; b: number };
  transparent?: boolean;
}

export const FluidCursor: React.FC<FluidCursorProps> = ({
  simResolution = 128,
  dyeResolution = 1024,
  captureResolution = 512,
  densityDissipation = 1,
  velocityDissipation = 0.2,
  pressure = 0.8,
  pressureIterations = 20,
  curl = 30,
  splatRadius = 0.25,
  splatForce = 6000,
  shading = true,
  colorUpdateSpeed = 10,
  backColor = { r: 0, g: 0, b: 0 },
  transparent = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.width = window.innerWidth * dpr;
    let height = canvas.height = window.innerHeight * dpr;

    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, stencil: false, antialias: false }) || 
               canvas.getContext('webgl', { alpha: true, depth: false, stencil: false, antialias: false }) as any;
    
    if (!gl) return;

    const isWebGL2 = !!(gl as any).blitFramebuffer;

    // Detect mobile touch devices or lower performance environments
    const isMobile = typeof navigator !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );

    // Dynamic resolution scaling to maintain fluid 60fps
    const activeDyeRes = isMobile ? Math.min(dyeResolution, 256) : Math.min(dyeResolution, 512);
    const activeSimRes = isMobile ? Math.min(simResolution, 64) : Math.min(simResolution, 128);

    // --- Shader Logic ---
    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const copyShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `;

    const splatShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspect;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspect;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    const displayShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertex: string, fragment: string) {
      const p = gl.createProgram()!;
      gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vertex));
      gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(p);
      return p;
    }

    const splatProgram = createProgram(gl, baseVertexShader, splatShader);
    const advectProgram = createProgram(gl, baseVertexShader, advectionShader);
    const displayProgram = createProgram(gl, baseVertexShader, displayShader);

    // --- State and Buffers ---
    let dye: any;
    let velocity: any;

    function createFBO(gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      return { texture, fbo, width: w, height: h };
    }

    function createDoubleFBO(gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
      let fbo1 = createFBO(gl, w, h, internalFormat, format, type, filter);
      let fbo2 = createFBO(gl, w, h, internalFormat, format, type, filter);

      return {
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }
      };
    }

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

      return (target: any) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function initFramebuffers() {
      const type = gl.getExtension('OES_texture_half_float')?.HALF_FLOAT_OES || gl.FLOAT;
      dye = createDoubleFBO(gl, activeDyeRes, activeDyeRes, gl.RGBA, gl.RGBA, type, gl.LINEAR);
      velocity = createDoubleFBO(gl, activeSimRes, activeSimRes, gl.RGBA, gl.RGBA, type, gl.LINEAR);
    }

    initFramebuffers();

    // --- Interaction Logic (Delay and Ripple) ---
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rippleTime = 0;
    let animationFrameId: number;
    let lastInteractionTime = performance.now();
    let isIdle = false;
    let isInitialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX * dpr;
      const y = e.clientY * dpr;
      if (!isInitialized) {
        mouseX = prevMouseX = targetX = x;
        mouseY = prevMouseY = targetY = y;
        isInitialized = true;
      } else {
        targetX = x;
        targetY = y;
      }
      lastInteractionTime = performance.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const x = e.touches[0].clientX * dpr;
        const y = e.touches[0].clientY * dpr;
        if (!isInitialized) {
          mouseX = prevMouseX = targetX = x;
          mouseY = prevMouseY = targetY = y;
          isInitialized = true;
        } else {
          targetX = x;
          targetY = y;
        }
        lastInteractionTime = performance.now();
      }
    };

    const handleResize = () => {
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * currentDpr;
      height = canvas.height = window.innerHeight * currentDpr;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    function update(time: number) {
      if (time - lastInteractionTime > 3000) {
        if (!isIdle) {
           gl.viewport(0, 0, width, height);
           gl.clearColor(0, 0, 0, 0);
           gl.clear(gl.COLOR_BUFFER_BIT);
           isIdle = true;
        }
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      isIdle = false;

      const dt = 0.016;

      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Smooth following with delay (lerp)
      mouseX += dx * 0.18;
      mouseY += dy * 0.18;

      const isMoving = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1;

      gl.viewport(0, 0, activeSimRes, activeSimRes);
      
      // Advection for velocity
      gl.useProgram(advectProgram);
      gl.uniform2f(gl.getUniformLocation(advectProgram, 'texelSize'), 1/activeSimRes, 1/activeSimRes);
      gl.uniform1i(gl.getUniformLocation(advectProgram, 'uVelocity'), 0);
      gl.uniform1i(gl.getUniformLocation(advectProgram, 'uSource'), 0);
      gl.uniform1f(gl.getUniformLocation(advectProgram, 'dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectProgram, 'dissipation'), 0.985); 
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      blit(velocity.write.fbo);
      velocity.swap();

      if (isMoving && isInitialized) {
        const distance = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
        // Optimize steps: fewer iterations drastically decreases overdraw & CPU lock.
        const steps = isMobile ? 1 : Math.min(Math.ceil(distance / 16.0), 4);

        let dirX = dx;
        let dirY = dy;
        let len = Math.sqrt(dirX * dirX + dirY * dirY);
        if (len > 0.0001) {
             dirX = (dirX / len) * 4.0;
             dirY = (dirY / len) * 4.0;
        }

        gl.useProgram(splatProgram);
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'aspect'), width / height);
        gl.uniform3f(gl.getUniformLocation(splatProgram, 'color'), (dirX / dpr) * 0.6, -(dirY / dpr) * 0.6, 1.0);
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'radius'), 0.0018 / dpr);
        gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), 0);

        for (let i = 0; i < steps; i++) {
          const t = steps > 1 ? i / (steps - 1) : 0.5;
          const currX = prevMouseX + (mouseX - prevMouseX) * t;
          const currY = prevMouseY + (mouseY - prevMouseY) * t;
          gl.uniform2f(gl.getUniformLocation(splatProgram, 'point'), currX / width, 1 - currY / height);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
          blit(velocity.write.fbo);
          velocity.swap();
        }
      }

      // Ripple effect (subtle pulse) - less frequent to save performance, and only near last active pos
      rippleTime += dt;
      if (Math.sin(rippleTime * 3) > 0.95 && !isMoving && isInitialized) {
         gl.useProgram(splatProgram);
         gl.uniform2f(gl.getUniformLocation(splatProgram, 'point'), mouseX / width + (Math.random() - 0.5) * 0.02, 1 - mouseY / height + (Math.random() - 0.5) * 0.02);
         gl.uniform3f(gl.getUniformLocation(splatProgram, 'color'), (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, 0.0);
         gl.uniform1f(gl.getUniformLocation(splatProgram, 'radius'), 0.001);
         blit(velocity.write.fbo);
         velocity.swap();
      }

      // Advection for color (dye)
      gl.viewport(0, 0, activeDyeRes, activeDyeRes);
      gl.useProgram(advectProgram);
      gl.uniform2f(gl.getUniformLocation(advectProgram, 'texelSize'), 1/activeDyeRes, 1/activeDyeRes);
      gl.uniform1i(gl.getUniformLocation(advectProgram, 'uVelocity'), 0);
      gl.uniform1i(gl.getUniformLocation(advectProgram, 'uSource'), 1);
      gl.uniform1f(gl.getUniformLocation(advectProgram, 'dissipation'), 0.994); 
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
      blit(dye.write.fbo);
      dye.swap();

      if (isMoving && isInitialized) {
        const distance = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
        // Match step count for velocity
        const steps = isMobile ? 1 : Math.min(Math.ceil(distance / 16.0), 4);

        // Dynamic colors based on speed and time (Match brand: Red #cc2428 to Yellow #eab308)
        let speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.02, 1.0);
        
        let r = 0.82 + speed * 0.1 + Math.sin(time * 0.001) * 0.04;
        let g = 0.14 + speed * 0.52 + Math.cos(time * 0.002) * 0.04;
        let b = 0.14 - speed * 0.10 + Math.sin(time * 0.0015) * 0.04;

        gl.useProgram(splatProgram);
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'aspect'), width / height);
        gl.uniform3f(gl.getUniformLocation(splatProgram, 'color'), r, g, b);
        gl.uniform1f(gl.getUniformLocation(splatProgram, 'radius'), 0.003 / dpr); 
        gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), 0);

        for (let i = 0; i < steps; i++) {
          const t = steps > 1 ? i / (steps - 1) : 0.5;
          const currX = prevMouseX + (mouseX - prevMouseX) * t;
          const currY = prevMouseY + (mouseY - prevMouseY) * t;
          gl.uniform2f(gl.getUniformLocation(splatProgram, 'point'), currX / width, 1 - currY / height);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
          blit(dye.write.fbo);
          dye.swap();
        }
      }

      // Display
      gl.viewport(0, 0, width, height);
      gl.useProgram(displayProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
      blit(null);

      animationFrameId = requestAnimationFrame(update);
    }

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [simResolution, dyeResolution]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

