import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// People walk between zMin and zMax, then smoothly turn and go back
const PEOPLE = [
  { id:1, x: 3.5, startZ: 6, speed:0.9, color:'#3a5a8c', skin:'#f0c090' },
  { id:2, x: 3.8, startZ:-4, speed:0.6, color:'#5a3a3a', skin:'#c8956a' },
  { id:3, x: 3.3, startZ: 2, speed:1.1, color:'#2a4a2a', skin:'#e8b888' },
  { id:4, x:-3.5, startZ: 4, speed:0.7, color:'#4a4a5a', skin:'#f0c090' },
  { id:5, x:-3.7, startZ:-2, speed:1.0, color:'#5a4a2a', skin:'#c8956a' },
  { id:6, x:-3.4, startZ: 8, speed:0.8, color:'#3a3a5a', skin:'#e8b888' },
]

const Z_MIN = -11
const Z_MAX = 11

function Person({ x, startZ, speed, color, skin }) {
  const groupRef = useRef()
  const zRef = useRef(startZ)
  const dirRef = useRef(-1) // -1 = walking toward -Z, +1 = walking toward +Z
  const rotY = useRef(Math.PI) // facing -Z

  useFrame((_, delta) => {
    if (!groupRef.current) return

    zRef.current += dirRef.current * speed * delta

    // When reaching either end, reverse direction (turn around at buildings)
    if (zRef.current < Z_MIN) { zRef.current = Z_MIN; dirRef.current = 1 }
    if (zRef.current > Z_MAX) { zRef.current = Z_MAX; dirRef.current = -1 }

    groupRef.current.position.z = zRef.current

    // Smooth turn rotation
    const targetRot = dirRef.current < 0 ? Math.PI : 0
    rotY.current += (targetRot - rotY.current) * Math.min(delta * 6, 1)
    groupRef.current.rotation.y = rotY.current

    // Walking bob
    const t = performance.now() / 300
    groupRef.current.position.y = Math.abs(Math.sin(t * speed)) * 0.04
  })

  return (
    <group ref={groupRef} position={[x, 0, startZ]}>
      <mesh position={[0.1,0.5,0]}>
        <capsuleGeometry args={[0.07,0.5,4,8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[-0.1,0.5,0]}>
        <capsuleGeometry args={[0.07,0.5,4,8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0,1.15,0]}>
        <capsuleGeometry args={[0.16,0.5,4,8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0,1.72,0]}>
        <sphereGeometry args={[0.16,10,10]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]}>
        <circleGeometry args={[0.22,8]} />
        <meshBasicMaterial color="black" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function People() {
  return <>{PEOPLE.map(p => <Person key={p.id} {...p} />)}</>
}
