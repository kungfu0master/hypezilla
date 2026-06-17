import { useState, useEffect, useRef, useId } from 'react';

export function LiquidLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const [baseFreq, setBaseFreq] = useState("0.015 0.025");
  const [scale, setScale] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const idSeed = useId();
  const filterId = `liquid-logo-filter-${idSeed.replace(/:/g, '')}`;
  const filterUrl = `url(#${filterId})`;

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;
    let currentScale = 3;

    const tick = () => {
      // Speed up flow when hovered
      time += isHovered ? 0.045 : 0.015;
      const targetScale = isHovered ? 12 : 3.5;

      // Smooth interpolation for fluid shift on hover/exit
      currentScale += (targetScale - currentScale) * 0.12;

      // Calculate continuous fluid waves using dual-octave sine/cosine movement
      const fX = 0.012 + Math.sin(time) * 0.005;
      const fY = 0.022 + Math.cos(time * 0.85) * 0.005;

      setBaseFreq(`${fX} ${fY}`);
      setScale(currentScale);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-start cursor-pointer select-none group transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Absolute SVG filter definition for clean liquid displacement */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFreq}
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="1.2"
              result="blur"
            />
            <feComposite
              in="displaced"
              in2="blur"
              operator="over"
            />
          </filter>
        </defs>
      </svg>

      {/* Styled Logo Frame with exact original sizes and borders */}
      <div 
        className="flex font-display font-black text-3xl leading-none relative pl-3 pr-4 pt-2 pb-0"
        style={{ filter: filterUrl }}
      >
        {/* Original corner borders and hover states */}
        <div className="absolute top-0 left-0 w-6 h-8 border-t-[3px] border-l-[3px] border-zinc-500 transition-colors group-hover:border-white"></div>
        <div className="absolute -bottom-2 right-0 w-6 h-8 border-b-[3px] border-r-[3px] border-[#cc2428] transition-colors group-hover:border-red-400"></div>

        {/* EXACT ORIGINAL text elements, fonts and colors */}
        <span className="text-[#cc2428] tracking-tighter">HY</span>
        <span className="text-zinc-500 tracking-tighter">PE</span>
      </div>

      {/* ZILLA Badge with exact original style, margins, padding, text size, and colors */}
      <div 
        className="ml-3 bg-[#eab308] text-black text-[0.65rem] font-bold tracking-widest px-8 py-0.5 mt-0 z-10 relative"
        style={{ filter: filterUrl }}
      >
        ZILLA
      </div>
    </div>
  );
}

