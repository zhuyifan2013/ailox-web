"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, Float, Line } from "@react-three/drei"
import * as THREE from "three"
import { APPS, AppItem } from "@/lib/apps-data"

// Place app nodes in a circle around center
const NODE_RADIUS = 2.8
const appPositions: [number, number, number][] = APPS.map((_, i) => {
  const angle = (i / APPS.length) * Math.PI * 2
  return [
    Math.cos(angle) * NODE_RADIUS,
    Math.sin(angle) * NODE_RADIUS * 0.5, // slightly flat ellipse
    Math.sin(angle) * 0.8,
  ]
})

function CoreNode() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.3
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
      <Html center>
        <div className="text-white text-xs font-bold bg-indigo-900/80 px-2 py-0.5 rounded-full border border-indigo-500/50 pointer-events-none whitespace-nowrap">
          Ailox Core
        </div>
      </Html>
    </mesh>
  )
}

function AppNode({
  app,
  position,
  hovered,
  onHover,
}: {
  app: AppItem
  position: [number, number, number]
  hovered: boolean
  onHover: (id: string | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.08
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = hovered ? 1.2 : 0.4
  })

  const color = new THREE.Color(app.color)

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => onHover(app.id)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[hovered ? 0.22 : 0.16, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        <Html center>
          <div
            className="text-center pointer-events-none"
            style={{ transform: "translateY(-28px)" }}
          >
            <div className="text-lg">{app.icon}</div>
            {hovered && (
              <div className="mt-1 bg-slate-900/90 border border-white/10 rounded-lg p-2 w-36 text-left">
                <p className="text-white text-xs font-semibold">{app.name}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{app.tagline}</p>
              </div>
            )}
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

function ConnectionLines({ hoveredId }: { hoveredId: string | null }) {
  return (
    <>
      {APPS.map((app, i) => {
        const isHighlighted = hoveredId === app.id
        const color = isHighlighted ? app.color : "#6366f133"
        return (
          <Line
            key={app.id}
            points={[[0, 0, 0], appPositions[i]]}
            color={color}
            lineWidth={isHighlighted ? 1.5 : 0.5}
            transparent
            opacity={isHighlighted ? 1 : 0.4}
          />
        )
      })}
    </>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.08
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2]} intensity={1} color="#6366f1" />
      <CoreNode />
      <ConnectionLines hoveredId={hoveredId} />
      {APPS.map((app, i) => (
        <AppNode
          key={app.id}
          app={app}
          position={appPositions[i]}
          hovered={hoveredId === app.id}
          onHover={setHoveredId}
        />
      ))}
    </group>
  )
}

export function EcosystemGraph() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <Scene />
    </Canvas>
  )
}
