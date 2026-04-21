import { useMemo } from 'react'
import * as THREE from 'three'

function createRoadTex() {
  const c = document.createElement('canvas')
  c.width = 256; c.height = 1024
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, 256, 1024)
  // lane divider dashes
  ctx.strokeStyle = '#ffff00'
  ctx.lineWidth = 4
  ctx.setLineDash([60, 60])
  ctx.beginPath(); ctx.moveTo(128, 0); ctx.lineTo(128, 1024); ctx.stroke()
  ctx.setLineDash([])
  // edge lines
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(8, 1024); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(248, 0); ctx.lineTo(248, 1024); ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping
  t.repeat.set(1, 4)
  return t
}

function createSidewalkTex() {
  const c = document.createElement('canvas')
  c.width = 256; c.height = 256
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#b0a898'
  ctx.fillRect(0, 0, 256, 256)
  ctx.strokeStyle = '#8a8278'
  ctx.lineWidth = 1.5
  for (let x = 0; x <= 256; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke() }
  for (let y = 0; y <= 256; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke() }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping
  t.repeat.set(3, 12)
  return t
}

function createCrosswalkTex() {
  const c = document.createElement('canvas')
  c.width = 256; c.height = 128
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, 256, 128)
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  const stripeW = 22, gap = 12, stripes = 9
  const totalW = stripes * stripeW + (stripes - 1) * gap
  let startX = (256 - totalW) / 2
  for (let i = 0; i < stripes; i++) {
    ctx.fillRect(startX + i * (stripeW + gap), 8, stripeW, 112)
  }
  return new THREE.CanvasTexture(c)
}

export default function Street() {
  const roadTex = useMemo(createRoadTex, [])
  const sidewalkTex = useMemo(createSidewalkTex, [])
  const crosswalkTex = useMemo(createCrosswalkTex, [])

  const roadLen = 50

  return (
    <group>
      {/* ── Road ─────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3]} receiveShadow>
        <planeGeometry args={[5, roadLen]} />
        <meshStandardMaterial map={roadTex} roughness={0.9} />
      </mesh>

      {/* ── Right sidewalk ───────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.75, 0.02, -3]} receiveShadow>
        <planeGeometry args={[2.5, roadLen]} />
        <meshStandardMaterial map={sidewalkTex} color="#c8bfb0" roughness={0.95} />
      </mesh>

      {/* ── Left sidewalk ────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.75, 0.02, -3]} receiveShadow>
        <planeGeometry args={[2.5, roadLen]} />
        <meshStandardMaterial map={sidewalkTex} color="#c8bfb0" roughness={0.95} />
      </mesh>

      {/* ── Beyond sidewalks (ground fill) ───────────────────────── */}
      {/* y=0.005 avoids z-fighting with Utah desert floor at y=0.01 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -3]}>
        <planeGeometry args={[80, roadLen + 20]} />
        <meshStandardMaterial color="#4a5240" roughness={1}
          polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
      </mesh>

      {/* ── Crosswalks at z=-7 and z=0 ───────────────────────────── */}
      {[-7, 5].map(z => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, z]}>
          <planeGeometry args={[5, 4]} />
          <meshStandardMaterial map={crosswalkTex} roughness={0.9} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* ── Curb edges (slight raised lip) ───────────────────────── */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 2.6, 0.06, -3]} receiveShadow>
          <boxGeometry args={[0.18, 0.12, roadLen]} />
          <meshStandardMaterial color="#888" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
