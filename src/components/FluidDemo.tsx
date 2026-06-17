'use client';

import React, { useState } from 'react';
import { FluidCursor } from './ui/FluidCursor';

export const FluidDemo = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center gap-4 border-t border-white/10 z-20 bg-black/50 backdrop-blur-sm">
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="font-sans text-lg">Enable Effect</span>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 p-1 ${
            enabled ? 'bg-[#FF5E00]' : 'bg-white/20'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              enabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      
      {enabled && (
        <span className="text-4xl font-semibold opacity-50 font-display transition-opacity duration-500">
          Hover anywhere
        </span>
      )}
      
      {enabled && <FluidCursor />}
    </div>
  );
};
