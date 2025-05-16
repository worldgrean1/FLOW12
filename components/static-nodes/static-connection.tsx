interface StaticConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  active?: boolean
  animated?: boolean
  thickness?: number
  fromNodeId?: string
  toNodeId?: string
  cornerPosition?: "auto" | "horizontal-first" | "vertical-first"
}

export default function StaticConnection({
  from,
  to,
  active = false,
  animated = true,
  thickness = 3,
  fromNodeId,
  toNodeId,
  cornerPosition = "auto",
}: StaticConnectionProps) {
  // Calculate the path with a straight line for precise alignment
  // This ensures the connection goes directly from point to point
  const path = `M${from.x},${from.y} L${to.x},${to.y}`

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
      {/* Main connection line */}
      <path
        d={path}
        stroke={active ? "#10b981" : "#475569"}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        style={{
          filter: active ? "drop-shadow(0 0 3px rgba(16, 185, 129, 0.7))" : "none",
          transition: "stroke 0.3s ease, filter 0.3s ease",
        }}
      />

      {/* Connection endpoints - ensures perfect alignment with nodes */}
      <circle cx={from.x} cy={from.y} r={thickness} fill={active ? "#10b981" : "#475569"} />
      <circle cx={to.x} cy={to.y} r={thickness} fill={active ? "#10b981" : "#475569"} />

      {/* Animated particles when active */}
      {active && animated && (
        <>
          <circle r="3" fill="#10b981" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="2" fill="#10b981" opacity="0.6">
            <animateMotion dur="2s" begin="0.3s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="2" fill="#10b981" opacity="0.6">
            <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="1" fill="#10b981" opacity="0.4">
            <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="1" fill="#10b981" opacity="0.4">
            <animateMotion dur="2s" begin="1.5s" repeatCount="indefinite" path={path} />
          </circle>
        </>
      )}
    </svg>
  )
}
