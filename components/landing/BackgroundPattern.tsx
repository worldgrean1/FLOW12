"use client"

interface BackgroundPatternProps {
  active: boolean
}

export default function BackgroundPattern({ active }: BackgroundPatternProps) {
  return (
    <div className="absolute inset-0 opacity-10" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wave-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z" fill="#4ade80" fillOpacity="0.2"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-pattern)"></rect>

        {/* Additional animated wave patterns when active */}
        {active && (
          <>
            <pattern id="wave-pattern-animated" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z" fill="#4ade80" fillOpacity="0.3">
                <animate
                  attributeName="d"
                  values="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z;
                          M0,10 C30,5 70,15 100,10 L100,0 L0,0 Z;
                          M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
            <rect width="100%" height="100%" fill="url(#wave-pattern-animated)" opacity="0.3">
              <animate attributeName="y" values="0;20;0" dur="15s" repeatCount="indefinite" />
            </rect>
          </>
        )}
      </svg>
    </div>
  )
}
