'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#FF5E00] animate-ping opacity-25" />
            <div className="absolute inset-2 rounded-full border-2 border-[#FFD000] animate-pulse shadow-[0_0_15px_rgba(255,208,0,0.5)]" />
            <div className="absolute inset-0 rounded-full border-t-2 border-[#FF5E00] animate-spin" />
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
