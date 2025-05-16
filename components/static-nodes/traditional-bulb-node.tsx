interface TraditionalBulbNodeProps {
  position: { x: number; y: number }
  bulbOn: boolean
  scale?: number
}

export default function TraditionalBulbNode({ position, bulbOn, scale = 1 }: TraditionalBulbNodeProps) {
  const width = 100 * scale
  const height = 150 * scale

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="absolute"
        style={{
          width: width * 0.8,
          height: height * 0.8,
          borderRadius: "50%",
          opacity: bulbOn ? 0.4 : 0,
          background: "radial-gradient(circle, rgba(144, 238, 144, 0.8) 0%, rgba(0, 255, 128, 0.2) 70%)",
          filter: "blur(10px)",
          transition: "opacity 0.5s ease",
          zIndex: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Bulb glass */}
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="40"
          fill={bulbOn ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"}
          stroke={bulbOn ? "#ffffff" : "#888888"}
          strokeWidth="1"
        />

        {/* Filament */}
        <path
          d="M40 50 Q 50 30, 60 50 Q 50 70, 40 50"
          stroke={bulbOn ? "#ffcc00" : "#666666"}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Base */}
        <rect
          x="42"
          y="90"
          width="16"
          height="10"
          fill={bulbOn ? "#e0e0e0" : "#888888"}
          stroke={bulbOn ? "#ffffff" : "#666666"}
          strokeWidth="1"
        />

        {/* Screw base */}
        <path
          d="M42 100 L42 110 Q 50 115, 58 110 L58 100"
          fill={bulbOn ? "#ffd700" : "#aa8800"}
          stroke={bulbOn ? "#ffffff" : "#666666"}
          strokeWidth="1"
        />

        {/* Connection to glass */}
        <path
          d="M42 90 L45 80 Q 50 75, 55 80 L58 90"
          fill={bulbOn ? "#e0e0e0" : "#888888"}
          stroke={bulbOn ? "#ffffff" : "#666666"}
          strokeWidth="1"
        />

        {/* Inner glow when active */}
        {bulbOn && (
          <>
            <ellipse cx="50" cy="50" rx="15" ry="25" fill="rgba(255, 255, 200, 0.6)" />
            <ellipse cx="50" cy="50" rx="8" ry="15" fill="rgba(255, 255, 150, 0.8)" />
          </>
        )}
      </svg>
    </div>
  )
}
