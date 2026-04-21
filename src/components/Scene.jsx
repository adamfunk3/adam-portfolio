import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import * as THREE from 'three'
import Building from './Building'
import Street from './Street'
import People from './People'
import Landscapes from './Landscapes'
// buildings now passed as prop from App (supports localStorage edits)

// ── Camera modes ─────────────────────────────────────────────────────────────
// "helicopter" = high overview for intro backdrop
// "street"     = first-person on the ground
const STREET_POS   = new THREE.Vector3(0, 1.8, 13)
const STREET_YAW   = 0
const STREET_PITCH = 0.05
const HELI_POS     = new THREE.Vector3(0, 40, 0)
const HELI_YAW     = 0
const HELI_PITCH   = 1.35 // looking almost straight down at the city

function getWalkGoal(building) {
  if (!building) return { pos: STREET_POS.clone(), yaw: STREET_YAW, pitch: STREET_PITCH }
  const bx = building.position[0], bz = building.position[2]
  const isRight = bx > 0
  return {
    pos:   new THREE.Vector3(isRight ? 3.2 : -3.2, 1.8, bz),
    yaw:   isRight ? -Math.PI / 2 : Math.PI / 2,
    pitch: -0.08,
  }
}

// Smaller set of background city blocks — only to the sides now (no end-of-street void)
const BG = [
  { p:[22,0,-12],w:8, h:28, d:8, c:'#2a3040' }, { p:[22,0,-2], w:6, h:20, d:6, c:'#242c38' },
  { p:[22,0, 6], w:7, h:16, d:7, c:'#2e3644' }, { p:[22,0,14], w:5, h:12, d:5, c:'#2a3040' },
  { p:[-22,0,-10],w:8,h:22, d:8, c:'#262e3c' }, { p:[-22,0,-1],w:6,h:18, d:6, c:'#242c38' },
  { p:[-22,0, 8], w:7,h:14, d:7, c:'#2c3442' }, { p:[-22,0,16],w:5,h:10, d:5, c:'#2a3040' },
]

const TREES = [
  [4.1,-10],[4.1,-7],[4.1,-4],[4.1,-1],[4.1,2],[4.1,5],[4.1,8],[4.1,11],
  [-4.1,-10],[-4.1,-7],[-4.1,-4],[-4.1,-1],[-4.1,2],[-4.1,5],[-4.1,8],[-4.1,11],
]
const LAMPS = [[2.4,-9],[2.4,-3],[2.4,3],[2.4,9],[-2.4,-6],[-2.4,0],[-2.4,6],[-2.4,12]]

const Scene = forwardRef(function Scene({ selectedBuilding, onSelect, isEditMode, onEdit, cameraMode, buildings = [] }, ref) {
  const { camera } = useThree()
  const cameraYaw   = useRef(HELI_YAW)
  const cameraPitch = useRef(HELI_PITCH)
  const cameraPos   = useRef(HELI_POS.clone())
  const goalYaw     = useRef(HELI_YAW)
  const goalPitch   = useRef(HELI_PITCH)
  const goalPos     = useRef(HELI_POS.clone())
  const isDragging  = useRef(false)
  const lastMouse   = useRef({ x:0, y:0 })
  const hasDragged  = useRef(false)
  const mode        = useRef('helicopter')
  // Save/restore camera when opening/closing a building modal
  const savedGoalPos   = useRef(null)
  const savedGoalYaw   = useRef(null)
  const savedGoalPitch = useRef(null)

  useEffect(() => {
    camera.position.copy(HELI_POS)
    camera.quaternion.setFromEuler(new THREE.Euler(HELI_PITCH, HELI_YAW, 0, 'YXZ'))
    camera.fov = 75; camera.updateProjectionMatrix()
  }, [camera])

  // ── Mode transitions ───────────────────────────────────────────────────────
  useEffect(() => {
    if (cameraMode === 'street' && mode.current !== 'street') {
      mode.current = 'street'
      goalPos.current.copy(STREET_POS)
      goalYaw.current   = STREET_YAW
      goalPitch.current = STREET_PITCH
    }
    if (cameraMode === 'helicopter' && mode.current !== 'helicopter') {
      mode.current = 'helicopter'
      goalPos.current.copy(HELI_POS)
      goalYaw.current   = HELI_YAW
      goalPitch.current = HELI_PITCH
    }
  }, [cameraMode])

  // ── Mouse drag (street mode only) ─────────────────────────────────────────
  useEffect(() => {
    const onDown = e => {
      if (e.button !== 0 || mode.current !== 'street') return
      isDragging.current = true; hasDragged.current = false
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMove = e => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMouse.current.x, dy = e.clientY - lastMouse.current.y
      if (Math.abs(dx)>3||Math.abs(dy)>3) hasDragged.current = true
      goalYaw.current  -= dx * 0.003
      goalPitch.current = Math.max(-0.3, Math.min(0.45, goalPitch.current + dy*0.0025))
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => { isDragging.current = false; setTimeout(()=>{hasDragged.current=false},60) }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  // ── Building selection — save position before, restore on close ───────────
  useEffect(() => {
    if (mode.current !== 'street') return
    if (selectedBuilding) {
      // Save current camera goal so we can restore when modal closes
      savedGoalPos.current   = goalPos.current.clone()
      savedGoalYaw.current   = goalYaw.current
      savedGoalPitch.current = goalPitch.current
      const g = getWalkGoal(selectedBuilding)
      goalPos.current.copy(g.pos); goalYaw.current = g.yaw; goalPitch.current = g.pitch
    } else if (savedGoalPos.current) {
      // Restore the position the user was at before clicking the building
      goalPos.current.copy(savedGoalPos.current)
      goalYaw.current   = savedGoalYaw.current
      goalPitch.current = savedGoalPitch.current
      savedGoalPos.current = null
    }
  }, [selectedBuilding])

  // ── Helicopter slow orbit ─────────────────────────────────────────────────
  useFrame((state, delta) => {
    if (mode.current === 'helicopter') {
      goalYaw.current += delta * 0.08 // slow rotation
    }

    const k = Math.min(delta * 2.5, 1)
    cameraYaw.current   += (goalYaw.current   - cameraYaw.current)   * k
    cameraPitch.current += (goalPitch.current - cameraPitch.current) * k
    cameraPos.current.lerp(goalPos.current, k * 0.7)
    camera.position.copy(cameraPos.current)
    camera.quaternion.setFromEuler(new THREE.Euler(cameraPitch.current, cameraYaw.current, 0, 'YXZ'))
  })

  const getHasDragged = () => hasDragged.current

  // ── Expose navigate() for the forward/back buttons in App ─────────────────
  useImperativeHandle(ref, () => ({
    navigate(dir) {
      if (mode.current !== 'street') return
      const step = dir === 'forward' ? -5 : 5
      // Clamp to street extents: z=13 (south start) to z=-12 (north end)
      goalPos.current.z = Math.max(-12, Math.min(13, goalPos.current.z + step))
    }
  }), [])

  return (
    <>
      <Sky sunPosition={[0.4,0.08,-1]} turbidity={5} rayleigh={1.2} mieCoefficient={0.006} mieDirectionalG={0.85} />

      <ambientLight color="#b0c8e8" intensity={0.55} />
      <directionalLight color="#ffe8b0" intensity={2.2} position={[12,18,8]} castShadow
        shadow-mapSize={[2048,2048]} shadow-camera-left={-20} shadow-camera-right={20}
        shadow-camera-top={20} shadow-camera-bottom={-20} shadow-camera-far={60} />
      <directionalLight color="#5080c0" intensity={0.4} position={[-10,8,-12]} />
      <hemisphereLight skyColor="#87ceeb" groundColor="#4a5240" intensity={0.5} />

      <Street />
      <Landscapes />

      {/* Side background city blocks */}
      {BG.map((b,i) => (
        <mesh key={i} position={[b.p[0], b.h/2, b.p[2]]} castShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={b.c} roughness={0.6} metalness={0.3} />
        </mesh>
      ))}

      {TREES.map(([x,z],i) => (
        <group key={i} position={[x,0,z]}>
          <mesh position={[0,0.9,0]} castShadow>
            <cylinderGeometry args={[0.1,0.14,1.8,6]} />
            <meshStandardMaterial color="#4a2e10" roughness={0.95} />
          </mesh>
          <mesh position={[0,2.4,0]} castShadow>
            <sphereGeometry args={[0.75,10,8]} />
            <meshStandardMaterial color={i%3===0?'#1a5c28':i%3===1?'#226632':'#1e7038'} roughness={0.9} />
          </mesh>
        </group>
      ))}

      {LAMPS.map(([x,z],i) => (
        <group key={i} position={[x,0,z]}>
          <mesh position={[0,2.5,0]}>
            <cylinderGeometry args={[0.045,0.06,5,6]} />
            <meshStandardMaterial color="#8a8a8a" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[x>0?0.4:-0.4,4.9,0]}>
            <boxGeometry args={[0.8,0.22,0.35]} />
            <meshStandardMaterial color="#aaa" metalness={0.9} emissive="#fff8dc" emissiveIntensity={0.5} />
          </mesh>
          <pointLight position={[x>0?0.4:-0.4,4.7,0]} color="#fff5d0" intensity={1.2} distance={8} />
        </group>
      ))}

      <People />

      {buildings.map(b => (
        <Building key={b.id} data={b} onSelect={onSelect}
          isSelected={selectedBuilding?.id === b.id}
          isEditMode={isEditMode} onEdit={onEdit}
          getHasDragged={getHasDragged} />
      ))}
    </>
  )
})
export default Scene
