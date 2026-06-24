'use client'

import { Line, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Group,
  Mesh,
  Vector2,
  Vector3
} from 'three'

const rotorPositions: Array<[number, number, number]> = [
  [-1.62, 0.1, -1.03],
  [1.62, 0.1, -1.03],
  [-1.62, 0.1, 1.03],
  [1.62, 0.1, 1.03]
]

const brandCyan = '#8de1e8'
const brandAqua = '#76c2d0'
const brandTeal = '#298ea5'
const deepBlack = '#02080c'

function DroneRotor({
  index,
  position,
  registerRotor
}: {
  index: number
  position: [number, number, number]
  registerRotor: (index: number, node: Group | null) => void
}) {
  const isFront = position[2] < 0

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.18, 32]} />
        <meshStandardMaterial color="#060a12" metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.012, 8, 96]} />
        <meshStandardMaterial
          color={isFront ? brandCyan : '#ff6b6b'}
          emissive={isFront ? brandTeal : '#ff384f'}
          emissiveIntensity={0.85}
          metalness={0.55}
          roughness={0.2}
        />
      </mesh>
      <group ref={(node) => registerRotor(index, node)} position={[0, 0.16, 0]}>
        <mesh>
          <boxGeometry args={[0.92, 0.018, 0.09]} />
          <meshStandardMaterial color="#d7e4ea" metalness={0.75} roughness={0.28} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.92, 0.018, 0.09]} />
          <meshStandardMaterial color="#d7e4ea" metalness={0.75} roughness={0.28} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.012, 64]} />
          <meshBasicMaterial
            color={brandCyan}
            transparent
            opacity={0.12}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

function DroneBody() {
  return (
    <group>
      <mesh castShadow receiveShadow scale={[1.25, 0.26, 0.72]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#e8eef2"
          emissive="#0b1f2c"
          emissiveIntensity={0.08}
          metalness={0.82}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.18, -0.02]} scale={[0.82, 0.035, 0.52]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#07101f" metalness={0.92} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.22, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 48]} />
        <meshBasicMaterial color={brandCyan} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.26, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.22, 32]} />
        <meshStandardMaterial color="#050914" metalness={0.82} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.26, -0.69]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
        <meshStandardMaterial
          color="#0b1727"
          emissive={brandTeal}
          emissiveIntensity={0.28}
          metalness={0.9}
          roughness={0.16}
        />
      </mesh>
    </group>
  )
}

function DroneArms() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.03, -1.03]}>
        <cylinderGeometry args={[0.045, 0.045, 3.22, 24]} />
        <meshStandardMaterial color="#08111f" metalness={0.86} roughness={0.22} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.03, 1.03]}>
        <cylinderGeometry args={[0.045, 0.045, 3.22, 24]} />
        <meshStandardMaterial color="#08111f" metalness={0.86} roughness={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.1, 24]} />
        <meshStandardMaterial color="#050914" metalness={0.9} roughness={0.2} />
      </mesh>
      {rotorPositions.map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x * 0.5, y - 0.06, z * 0.5]} rotation={[0, Math.atan2(x, z), 0]}>
          <boxGeometry args={[0.08, 0.08, 1.55]} />
          <meshStandardMaterial color="#0a1220" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function DroneLandingGear() {
  return (
    <group position={[0, -0.55, 0.15]}>
      {[-0.48, 0.48].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[0.22, 0, 0]} position={[0, 0.12, -0.36]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7, 16]} />
            <meshStandardMaterial color="#050914" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh rotation={[-0.22, 0, 0]} position={[0, 0.12, 0.36]}>
            <cylinderGeometry args={[0.025, 0.025, 0.7, 16]} />
            <meshStandardMaterial color="#050914" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 1.18, 16]} />
            <meshStandardMaterial color="#050914" metalness={0.7} roughness={0.32} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DroneModel() {
  const droneRef = useRef<Group>(null)
  const rotorRefs = useRef<Array<Group | null>>([])
  const pointerRef = useRef(new Vector2(0, 0))

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2
      )
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame(({ clock }, delta) => {
    const drone = droneRef.current

    if (!drone) {
      return
    }

    const elapsed = clock.getElapsedTime()
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const scrollProgress =
      typeof window === 'undefined'
        ? 0
        : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.25)
    const baseScale = isMobile ? 0.58 : 0.98
    const baseX = isMobile ? 1.08 : 2.26
    const baseY = isMobile ? 1.42 : 0.08
    const baseZ = isMobile ? -1.86 : -1.08
    const baseRotationY = isMobile ? -0.72 : -0.5

    drone.scale.setScalar(baseScale)
    drone.position.x = baseX - scrollProgress * (isMobile ? 0.14 : 0.36)
    drone.position.y = baseY + Math.sin(elapsed * 1.7) * 0.08 + scrollProgress * 0.1
    drone.position.z = baseZ + scrollProgress * (isMobile ? 0.22 : 0.42)
    drone.rotation.x =
      -0.08 + Math.sin(elapsed * 1.25) * 0.035 + pointerRef.current.y * 0.055
    drone.rotation.y =
      baseRotationY + Math.sin(elapsed * 0.72) * 0.07 + pointerRef.current.x * 0.16
    drone.rotation.z = 0.08 + Math.sin(elapsed * 1.1) * 0.05

    rotorRefs.current.forEach((rotor, index) => {
      if (rotor) {
        rotor.rotation.y += delta * (index % 2 === 0 ? 54 : -54)
      }
    })
  })

  const registerRotor = (index: number, node: Group | null) => {
    rotorRefs.current[index] = node
  }

  return (
    <group ref={droneRef}>
      <DroneArms />
      <DroneBody />
      <DroneLandingGear />
      {rotorPositions.map((position, index) => (
        <DroneRotor
          key={`${position[0]}-${position[2]}`}
          index={index}
          position={position}
          registerRotor={registerRotor}
        />
      ))}
      <pointLight position={[0, 0.35, -0.8]} color={brandCyan} intensity={3.6} distance={4.2} />
      <pointLight position={[0, 0.1, 1.2]} color="#ff6b6b" intensity={1.8} distance={3.2} />
    </group>
  )
}

function FlightPath() {
  const isCompactViewport = typeof window !== 'undefined' && window.innerWidth < 768
  const pathPoints = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.4, -0.86, -2.75),
      new Vector3(1.24, -0.34, -2.18),
      new Vector3(2.24, 0.08, -1.62),
      new Vector3(2.96, 0.24, -1.08),
      new Vector3(3.86, 0.02, -1.72)
    ])

    return curve.getPoints(96)
  }, [])

  return isCompactViewport ? null : (
    <group>
      <Line points={pathPoints} color={brandCyan} lineWidth={1.2} transparent opacity={0.38} />
      <mesh position={[2.96, 0.24, -1.08]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.008, 8, 128]} />
        <meshBasicMaterial color={brandCyan} transparent opacity={0.22} blending={AdditiveBlending} />
      </mesh>
      <mesh position={[2.96, 0.24, -1.08]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.006, 8, 128]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.18} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}

function SensorSweep() {
  const sweepRef = useRef<Mesh>(null)
  const isCompactViewport = typeof window !== 'undefined' && window.innerWidth < 768

  useFrame(({ clock }) => {
    if (!sweepRef.current) {
      return
    }

    sweepRef.current.rotation.z = clock.getElapsedTime() * 0.28
  })

  return isCompactViewport ? null : (
    <mesh ref={sweepRef} position={[2.96, 0.24, -1.08]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.18, 1.16, 96, 1, 0, Math.PI * 0.32]} />
      <meshBasicMaterial color={brandCyan} transparent opacity={0.28} blending={AdditiveBlending} />
    </mesh>
  )
}

export function AeroScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full min-h-[92svh] w-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.42, 5.9], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <fog attach="fog" args={[deepBlack, 7.4, 15]} />
        <ambientLight intensity={0.44} />
        <hemisphereLight intensity={0.22} groundColor="#050914" color="#f8fafc" />
        <directionalLight
          position={[4.5, 4.2, 5.5]}
          intensity={2.1}
          color="#f8fafc"
          castShadow
        />
        <pointLight position={[-3.6, -0.8, 2.8]} intensity={2.8} color={brandTeal} />
        <pointLight position={[2.8, 1.2, -2.4]} intensity={2.1} color={brandAqua} />
        <Stars radius={58} depth={28} count={1200} factor={2.9} saturation={0} fade speed={0.3} />
        <FlightPath />
        <SensorSweep />
        <DroneModel />
      </Canvas>
    </div>
  )
}
