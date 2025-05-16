"use client"

import { useEffect, useRef } from "react"
import StaticConnection from "./static-nodes/static-connection"
import { useConnectionPoints } from "../hooks/use-connection-points"

interface NodeConnectionManagerProps {
  connections: Array<{
    from: string
    to: string
    active?: boolean
    animated?: boolean
  }>
}

export default function NodeConnectionManager({ connections }: NodeConnectionManagerProps) {
  const { connectionPoints, updateConnectionPoints, setConnectionPoints } = useConnectionPoints()
  const containerRef = useRef<HTMLDivElement>(null)

  // Force an update when the component mounts to ensure connections are drawn correctly
  useEffect(() => {
    // Small delay to ensure all nodes are rendered
    const timer = setTimeout(() => {
      updateConnectionPoints()
    }, 100)

    return () => clearTimeout(timer)
  }, [updateConnectionPoints])

  return (
    <div className="absolute inset-0 pointer-events-none z-0" ref={containerRef}>
      {connections.map((connection, index) => {
        const fromPoint = connectionPoints[connection.from]
        const toPoint = connectionPoints[connection.to]

        // Only render connection if both points exist
        if (fromPoint && toPoint) {
          return (
            <StaticConnection
              key={`${connection.from}-${connection.to}-${index}`}
              from={fromPoint}
              to={toPoint}
              active={connection.active}
              animated={connection.animated}
              fromNodeId={connection.from}
              toNodeId={connection.to}
            />
          )
        }
        return null
      })}
    </div>
  )
}
