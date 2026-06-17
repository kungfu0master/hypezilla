import { useEffect, useRef } from 'react';

class Point {
  x: number;
  y: number;
  lifetime: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
  }
}

export function SleekLineCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const points: Point[] = [];
    
    // Config
    const maxLifeTime = 60;
    const dropRate = 1.0;

    const onMouseMove = (e: MouseEvent) => {
      points.push(new Point(e.clientX, e.clientY));
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        points[i].lifetime += dropRate;
        if (points[i].lifetime > maxLifeTime) {
          points.splice(i, 1);
          i--;
        }
      }

      if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          // Determine opacity/thickness based on lifetime
          // Newer points (closer to end of array) have lower lifetime.
          // The head is points[points.length - 1]
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const opacity = Math.max(0, 1 - (p1.lifetime / maxLifeTime));
          
          // Color variation matching gradient: from #FF5E00 (tail) to yellowish-orange (head)
          const r = 255;
          const g = Math.floor(94 + 114 * opacity); // 94 to 208
          const b = 0;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`;
          ctx.lineWidth = 8 * Math.pow(opacity, 1.5);
          ctx.lineCap = 'round';
          ctx.shadowBlur = 18 * opacity;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: 0.8 }}
    />
  );
}
