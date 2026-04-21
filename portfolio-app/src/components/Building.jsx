import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

function makeFacadeTex(color, accentColor) {
  const W = 512, H = 1024
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  ctx.fillStyle = color; ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 2
  for (let x = 0; x < W; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
  // Lobby / ground floor darkness
  ctx.fillStyle = 'rgba(0,0,0,0.40)'; ctx.fillRect(0, H * 0.88, W, H * 0.12)
  ctx.fillStyle = '#0d0d0d'
  const ew = W*0.28, eh = H*0.075; ctx.fillRect((W-ew)/2, H*0.89, ew, eh)
  // Windows
  const cols = 8, rows = 18
  const winW = (W-(cols+1)*10)/cols, topArea = H*0.87, winH = (topArea-(rows+1)*8)/rows
  for (let r=0;r<rows;r++) for (let cc=0;cc<cols;cc++) {
    const x = 10+cc*(winW+10), y = 8+r*(winH+8), lit = Math.random()
    ctx.fillStyle = lit>0.2 ? (lit>0.85?accentColor+'BB':lit>0.65?'#FFFFF0AA':'#CCE8FFAA') : 'rgba(0,0,0,0.65)'
    ctx.fillRect(x, y, winW, winH)
  }
  return new THREE.CanvasTexture(c)
}
function makeSideTex(color) {
  const c = document.createElement('canvas'); c.width=256; c.height=512
  const ctx = c.getContext('2d'); ctx.fillStyle=color; ctx.fillRect(0,0,256,512)
  ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=1
  for (let x=0;x<256;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke()}
  for (let y=0;y<512;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(256,y);ctx.stroke()}
  return new THREE.CanvasTexture(c)
}

export default function Building({ data, onSelect, isSelected, isEditMode, onEdit, getHasDragged }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { height, width, depth, color, accentColor, position, name, years, logoSvg } = data
  const side    = position[0] > 0 ? 'right' : 'left'
  const faceSign = side === 'right' ? -1 : 1
  const faceX    = faceSign * width / 2  // local x of street-facing surface

  const facadeTex = useMemo(() => makeFacadeTex(color, accentColor), [color, accentColor])
  const sideTex   = useMemo(() => makeSideTex(color), [color])

  const mats = useMemo(() => {
    const F = new THREE.MeshStandardMaterial({ map: facadeTex, roughness: 0.25, metalness: 0.55 })
    const S = new THREE.MeshStandardMaterial({ map: sideTex,   roughness: 0.4,  metalness: 0.4  })
    const R = new THREE.MeshStandardMaterial({ color: '#111',  roughness: 0.6,  metalness: 0.3  })
    const B = new THREE.MeshStandardMaterial({ color: '#0a0a0a' })
    return side === 'right' ? [S,F,R,B,S,S] : [F,S,R,B,S,S]
  }, [facadeTex, sideTex, side])

  const glowColor = useMemo(() => new THREE.Color(accentColor), [accentColor])

  useFrame((_,delta) => {
    const target = (hovered||isSelected) ? 0.2 : 0
    mats.forEach(m => { m.emissive=glowColor; m.emissiveIntensity+=(target-m.emissiveIntensity)*delta*5 })
  })

  // World y of the entrance sign = 4.5 regardless of building height
  // In local coords: localSignY = 4.5 - height/2
  const localSignY = 4.5 - height / 2

  return (
    <group
      ref={groupRef}
      position={[position[0], height/2, position[2]]}
      onPointerOver={e=>{e.stopPropagation();setHovered(true);document.body.style.cursor='pointer'}}
      onPointerOut={()=>{setHovered(false);document.body.style.cursor='default'}}
      onClick={e=>{
        if (getHasDragged?.()) return
        e.stopPropagation(); onSelect(data)
      }}
    >
      {/* ── Main building body ───────────────────────────────── */}
      <mesh material={mats} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
      </mesh>

      {/* ── Rooftop setback ──────────────────────────────────── */}
      {height > 12 && (
        <mesh position={[0, height/2+0.8, 0]} castShadow>
          <boxGeometry args={[width*0.6, 1.6, depth*0.6]} />
          <meshStandardMaterial color={color} roughness={0.5} metalness={0.5}
            emissive={glowColor} emissiveIntensity={isSelected?0.3:0.05} />
        </mesh>
      )}
      {height > 18 && <>
        <mesh position={[0, height/2+2.8, 0]}>
          <boxGeometry args={[width*0.15, 5, width*0.15]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} metalness={0.9} />
        </mesh>
        <pointLight color={accentColor} intensity={2} distance={7} position={[0, height/2+5.5, 0]} />
      </>}

      {/* ── Physical sign board on facade (glowing backing) ──── */}
      <mesh position={[faceX * 1.02, localSignY, 0]} castShadow>
        <boxGeometry args={[0.15, 3.4, Math.min(depth * 0.72, 4.5)]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor}
          emissiveIntensity={isSelected ? 0.6 : 0.3} metalness={0.9} roughness={0.08} />
      </mesh>

      {/* ── Entrance sign — billboard, always faces camera ────── */}
      {/* Positioned at world y≈4.5, right at eye level / entrance area */}
      <Html
        position={[faceX * 0.86, localSignY, 0]}
        center distanceFactor={14} zIndexRange={[10,0]} occlude={false}
      >
        <div style={{
          width: 230, padding: '12px 16px',
          background: 'rgba(4,8,18,0.94)',
          border: `2px solid ${accentColor}88`,
          borderTop: `4px solid ${accentColor}`,
          borderRadius: 12, cursor: 'pointer',
          boxShadow: `0 0 32px ${accentColor}44, 0 4px 24px rgba(0,0,0,0.8)`,
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'Inter,-apple-system,sans-serif',
          backdropFilter: 'blur(8px)',
        }}>
          {/* Logo */}
          <div style={{
            width: 60, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
            background: 'rgba(255,255,255,0.04)',
          }} dangerouslySetInnerHTML={{__html: logoSvg}} />
          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, lineHeight: 1.2, marginBottom: 3 }}>{name}</div>
            {years && <div style={{ color: accentColor, fontSize: 11, fontWeight: 600 }}>{years}</div>}
            <div style={{ color: accentColor, fontSize: 10, marginTop: 4, opacity: 0.8 }}>▶ Click door to explore</div>
          </div>
          {/* Edit button */}
          {isEditMode && (
            <button onClick={e=>{e.stopPropagation();onEdit(data)}}
              style={{
                background:'rgba(255,200,0,0.12)', border:'1px solid #ffd700AA',
                borderRadius:6, color:'#ffd700', fontSize:13, width:28, height:28,
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>✏️</button>
          )}
        </div>
      </Html>

      {/* ── Realistic door at building entrance ───────────────── */}
      {/* Door frame surround */}
      <mesh position={[faceX * 1.01, -height/2 + 1.45, 0]} castShadow>
        <boxGeometry args={[0.12, 2.9, 1.7]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Door panels (two panes) */}
      {[-0.4, 0.4].map((dz, i) => (
        <mesh key={i} position={[faceX * 1.02, -height/2 + 1.35, dz]}>
          <boxGeometry args={[0.09, 2.5, 0.7]} />
          <meshStandardMaterial
            color="#1a1a2e" metalness={0.6} roughness={0.35}
            emissive={glowColor}
            emissiveIntensity={hovered || isSelected ? 0.45 : 0.12}
          />
        </mesh>
      ))}
      {/* Door handle (right panel) */}
      <mesh position={[faceX * 1.03, -height/2 + 1.3, 0.18]}>
        <boxGeometry args={[0.06, 0.06, 0.32]} />
        <meshStandardMaterial color="#c8a84a" metalness={0.95} roughness={0.08} />
      </mesh>
      {/* Door step */}
      <mesh position={[faceX * 1.02, -height/2 + 0.05, 0]}>
        <boxGeometry args={[0.25, 0.1, 1.9]} />
        <meshStandardMaterial color="#666" roughness={0.8} metalness={0.3} />
      </mesh>
      {/* Door overhead light */}
      <pointLight color={accentColor} intensity={hovered||isSelected?3:0.8} distance={5}
        position={[faceX * 1.1, -height/2 + 2.8, 0]} />

      {/* Selected — extra spotlight */}
      {isSelected && <pointLight color={accentColor} intensity={5} distance={10} position={[faceX, -height/2+1.5, 0]} />}
    </group>
  )
}
