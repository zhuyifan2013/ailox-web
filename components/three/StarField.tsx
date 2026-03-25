"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

function AnimatedStars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ mouse }) => {
    if (!starsRef.current) return
    starsRef.current.rotation.x += (mouse.y * 0.0005 - starsRef.current.rotation.x) * 0.05
    starsRef.current.rotation.y += (mouse.x * 0.0005 - starsRef.current.rotation.y) * 0.05
  })

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0.5}
      fade
      speed={0.5}
    />
  )
}

export function StarField() {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: false, alpha: true }}
    >
      <AnimatedStars />
    </Canvas>
  )
}
