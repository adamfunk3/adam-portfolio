import * as THREE from 'three'

// ── Utah Mountains ─────────────────────────────────────────────────────────────
const UTAH_PEAKS = [
  // Front ridge (z ≈ -62 to -70)
  { x:-6,  z:-63, h:30, w:24, col:'#7A6A5A' },
  { x:14,  z:-66, h:36, w:26, col:'#6E5E4E' },
  { x:-22, z:-68, h:26, w:22, col:'#8A7060' },
  { x:28,  z:-64, h:22, w:20, col:'#7E6A58' },
  { x:0,   z:-71, h:40, w:28, col:'#6A5A48' },
  // Middle ridge (z ≈ -78–85)
  { x:-14, z:-78, h:32, w:26, col:'#60504A' },
  { x:10,  z:-80, h:28, w:24, col:'#686060' },
  { x:-32, z:-77, h:20, w:22, col:'#5E7058' },
  { x:36,  z:-79, h:18, w:18, col:'#6A6050' },
  { x:4,   z:-85, h:38, w:30, col:'#585A60' },
  // Far background (z ≈ -90+)
  { x:-18, z:-93, h:22, w:36, col:'#50586A' },
  { x:16,  z:-91, h:18, w:30, col:'#4C5468' },
]

const SAGE_PATCHES = [
  [-14,-35],[4,-38],[-27,-42],[19,-36],[1,-46],[-10,-48],[28,-40],
  [-18,-52],[12,-54],[-4,-57],[22,-50],[-30,-44],[6,-60],[32,-55],
]

function UtahMountains() {
  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.03,-42]}>
        <planeGeometry args={[130,60]} />
        <meshStandardMaterial color="#9B8B72" roughness={1}
          polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
      </mesh>
      {SAGE_PATCHES.map(([x,z],i) => (
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[x,0.06,z]}>
          <circleGeometry args={[2.5+i*0.3, 7]} />
          <meshStandardMaterial color={i%2?'#58682A':'#4A5C26'} roughness={1} />
        </mesh>
      ))}
      {/* ── Salt Lake City scene ────────────────────────── */}
      <group position={[0, 0, -42]}>
        {/* ── Great Salt Lake ─────────────────────────────── */}
        <mesh rotation={[-Math.PI/2,0,0]} position={[30, 0.06, -18]}>
          <planeGeometry args={[50, 28]} />
          <meshStandardMaterial color="#5A8A9A" roughness={0.12} metalness={0.55}
            emissive="#2A4A5A" emissiveIntensity={0.1} />
        </mesh>

        {/* ── Salt Lake Temple (wider) ────────────────────── */}
        <group position={[0, 0, -6]}>
          {/* Main temple body — wider */}
          <mesh position={[0, 5, 0]}>
            <boxGeometry args={[8, 10, 3.5]} />
            <meshStandardMaterial color="#E8E2D6" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Upper stepped section */}
          <mesh position={[0, 10.5, 0]}>
            <boxGeometry args={[6, 2, 2.8]} />
            <meshStandardMaterial color="#E0DAD0" roughness={0.4} metalness={0.25} />
          </mesh>
          {/* Central tower */}
          <mesh position={[0, 14.5, 0]}>
            <boxGeometry args={[1.8, 7, 1.8]} />
            <meshStandardMaterial color="#DDD8CC" roughness={0.35} metalness={0.3} />
          </mesh>
          {/* Central spire */}
          <mesh position={[0, 20, 0]}>
            <coneGeometry args={[0.4, 6, 6]} />
            <meshStandardMaterial color="#D0CBC0" roughness={0.25} metalness={0.5} />
          </mesh>
          {/* Angel Moroni */}
          <mesh position={[0, 23.3, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1}
              emissive="#D4AF37" emissiveIntensity={0.35} />
          </mesh>
          {/* Six side towers (3 each side) */}
          {[-3.2, -1.6, 1.6, 3.2].map((dx, i) => (
            <group key={i} position={[dx, 0, 0]}>
              <mesh position={[0, 8, 0]}>
                <boxGeometry args={[1.2, 6.5, 1.2]} />
                <meshStandardMaterial color="#DDD8CC" roughness={0.4} metalness={0.25} />
              </mesh>
              <mesh position={[0, 13, 0]}>
                <coneGeometry args={[0.3, 3.5, 6]} />
                <meshStandardMaterial color="#D0CBC0" roughness={0.3} metalness={0.4} />
              </mesh>
            </group>
          ))}
          {/* Corner spires */}
          {[[-3.6, -1.4], [-3.6, 1.4], [3.6, -1.4], [3.6, 1.4]].map(([dx, dz], i) => (
            <mesh key={i} position={[dx, 12, dz]}>
              <coneGeometry args={[0.22, 3, 6]} />
              <meshStandardMaterial color="#D0CBC0" roughness={0.3} metalness={0.4} />
            </mesh>
          ))}
          {/* Warm temple glow */}
          <pointLight color="#fff8e0" intensity={2.5} distance={16} position={[0, 24, 0]} />
        </group>

        {/* ── SLC Downtown Skyline ────────────────────────── */}
        {[
          [-14, -8, 10, 2.2, 2.2, '#2A3248'], [-10, -9, 14, 2.5, 2.5, '#242E40'],
          [-6,  -7, 8,  2.0, 2.0, '#2E3848'], [-2,  -9, 12, 2.2, 2.0, '#28324A'],
          [6,   -8, 9,  2.0, 2.2, '#2A3248'],  [10,  -9, 16, 2.8, 2.5, '#1E2838'],
          [14,  -7, 7,  2.0, 1.8, '#2E3848'], [18,  -9, 11, 2.2, 2.0, '#242E40'],
        ].map(([x, z, h, wx, wz, c], i) => (
          <mesh key={`slc${i}`} position={[x, h/2, z]}>
            <boxGeometry args={[wx, h, wz]} />
            <meshStandardMaterial color={c} roughness={0.5} metalness={0.4}
              emissive="#0A1428" emissiveIntensity={0.2} />
          </mesh>
        ))}
        {/* Key Tower (tallest SLC building) */}
        <mesh position={[10, 10, -9]}>
          <boxGeometry args={[2, 20, 2]} />
          <meshStandardMaterial color="#1E2838" roughness={0.4} metalness={0.6}
            emissive="#0A1228" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[10, 21, -9]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#2A3040" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {UTAH_PEAKS.map((p,i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {p.h > 22 && (
            <mesh position={[0, p.h*0.22, 0]}>
              <coneGeometry args={[p.w/2*0.9, p.h*0.45, 7]} />
              <meshStandardMaterial color="#4C5E38" roughness={0.97} flatShading />
            </mesh>
          )}
          <mesh position={[0, p.h/2, 0]}>
            <coneGeometry args={[p.w/2, p.h, 7]} />
            <meshStandardMaterial color={p.col} roughness={0.92} flatShading />
          </mesh>
          {p.h > 26 && (
            <mesh position={[0, p.h*0.80, 0]}>
              <coneGeometry args={[p.w*0.24, p.h*0.42, 7]} />
              <meshStandardMaterial color="#D0D8E8" roughness={0.88} flatShading />
            </mesh>
          )}
          {p.h > 34 && (
            <mesh position={[0, p.h*0.91, 0]}>
              <coneGeometry args={[p.w*0.10, p.h*0.17, 7]} />
              <meshStandardMaterial color="#EBF0F8" roughness={0.75} flatShading />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

// ── San Francisco ─────────────────────────────────────────────────────────────
// Positioned at [32, 0, 52] — visible to the right when user turns south
// SF buildings, cables, emissive windows, Transamerica Pyramid, Bay Bridge hint
const SF_BUILDINGS = [
  // [localX, localZ, height, widthX, widthZ, colorIdx]
  // Golden Gate Park / Mission area (closer to user, left side)
  [-16, 6, 14, 2.5, 2.5, 0],
  [-12, 8, 20, 2.8, 2.8, 1],
  [-8,  6, 16, 2.2, 2.2, 0],
  [-4,  8, 24, 3.0, 3.0, 2],
  // Financial District (center, tallest)
  [-1,  5, 10, 1.8, 1.8, 1],
  [2,   6, 30, 3.5, 3.5, 0], // tall FiDi tower
  [5,   5, 22, 2.6, 2.6, 2],
  [8,   7, 18, 2.8, 2.2, 1],
  [10,  6, 26, 2.4, 2.4, 0],
  [12,  8, 14, 2.2, 2.2, 2],
  // Embarcadero / waterfront (right side)
  [14,  4, 12, 2.0, 2.0, 1],
  [16,  6, 8,  1.8, 2.4, 0],
  [-14, 4, 8,  2.4, 1.8, 2],
]
const SF_COLORS = ['#2A3550', '#1E2A40', '#243048']

function SanFrancisco() {
  return (
    <group position={[32, 0, 52]}>
      {/* ── Bay water ─────────────────────────────────────── */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0, 0.08, -15]}>
        <planeGeometry args={[80, 36]} />
        <meshStandardMaterial
          color="#1A4A72" roughness={0.08} metalness={0.65}
          emissive="#0A2A50" emissiveIntensity={0.15}
        />
      </mesh>

      {/* ── Alcatraz island hint ───────────────────────────── */}
      <mesh position={[-18, 0.5, -12]}>
        <boxGeometry args={[4, 1, 2.5]} />
        <meshStandardMaterial color="#8A9070" roughness={0.9} />
      </mesh>
      <mesh position={[-18, 2.2, -12]}>
        <boxGeometry args={[1.2, 2.5, 1]} />
        <meshStandardMaterial color="#B0A888" roughness={0.8} />
      </mesh>

      {/* ── Golden Gate Bridge — right of city, spanning bay water ── */}
      <group position={[24, 0, -8]}>
        {/* South tower (closer to city) */}
        <group position={[0, 0, 8]}>
          {/* Twin vertical columns */}
          {[-0.45, 0.45].map((dx, i) => (
            <mesh key={i} position={[dx, 13, 0]}>
              <boxGeometry args={[0.5, 26, 0.7]} />
              <meshStandardMaterial color="#C1440E" roughness={0.35} metalness={0.55} />
            </mesh>
          ))}
          {/* Crossbars */}
          {[22, 16, 10].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[2.2, 0.5, 0.6]} />
              <meshStandardMaterial color="#C1440E" roughness={0.4} />
            </mesh>
          ))}
        </group>
        {/* North tower (far side of bay) */}
        <group position={[0, 0, -12]}>
          {[-0.45, 0.45].map((dx, i) => (
            <mesh key={i} position={[dx, 13, 0]}>
              <boxGeometry args={[0.5, 26, 0.7]} />
              <meshStandardMaterial color="#C1440E" roughness={0.35} metalness={0.55} />
            </mesh>
          ))}
          {[22, 16, 10].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[2.2, 0.5, 0.6]} />
              <meshStandardMaterial color="#C1440E" roughness={0.4} />
            </mesh>
          ))}
        </group>
        {/* Road deck — spans between towers */}
        <mesh position={[0, 5.2, -2]}>
          <boxGeometry args={[2.2, 0.45, 24]} />
          <meshStandardMaterial color="#B03A0C" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Deck side rails */}
        {[-1.15, 1.15].map((dx, i) => (
          <mesh key={i} position={[dx, 5.7, -2]}>
            <boxGeometry args={[0.06, 0.6, 24]} />
            <meshStandardMaterial color="#C1440E" roughness={0.5} metalness={0.6} />
          </mesh>
        ))}
        {/* Main cables — parabolic curve from tower to tower */}
        {[-0.7, 0.7].map((dx, ci) => (
          <group key={ci}>
            {Array.from({length: 13}, (_, i) => {
              const t = (i / 12) * 20 - 10
              const z = t - 2
              const parab = ((t) / 10) * ((t) / 10)
              const cableY = 5.5 + (22 - 5.5) * (1 - parab * 0.65)
              return (
                <group key={i}>
                  {/* Cable segment */}
                  <mesh position={[dx, cableY, z]}>
                    <boxGeometry args={[0.12, 0.12, 1.8]} />
                    <meshStandardMaterial color="#9B4A1C" metalness={0.85} roughness={0.2} />
                  </mesh>
                  {/* Vertical suspender from cable to deck */}
                  {cableY > 6.5 && (
                    <mesh position={[dx, (cableY + 5.5) / 2, z]}>
                      <boxGeometry args={[0.04, cableY - 5.5, 0.04]} />
                      <meshStandardMaterial color="#8B3A0C" metalness={0.8} roughness={0.3} />
                    </mesh>
                  )}
                </group>
              )
            })}
          </group>
        ))}
        {/* Navigation lights on tower tops */}
        <pointLight color="#ff4400" intensity={1.5} distance={6} position={[0, 26.5, 8]} />
        <pointLight color="#ff4400" intensity={1.5} distance={6} position={[0, 26.5, -12]} />
      </group>

      {/* ── Bay Bridge (simplified, east of GGB) ─────────── */}
      <group position={[24, 0, -3]}>
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[18, 0.4, 1.6]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, 9, 0]}>
          <boxGeometry args={[0.4, 9, 0.4]} />
          <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
        </mesh>
        {[-6,-3,0,3,6].map((x,i) => (
          <mesh key={i} position={[x, 4.5+Math.sin(((x+9)/18)*Math.PI)*3+1, 0]}>
            <boxGeometry args={[0.06,3+Math.sin(((x+9)/18)*Math.PI)*2.5,0.06]} />
            <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ── Transamerica Pyramid ─────────────────────────── */}
      {/* The most iconic SF building — narrow pyramid shape */}
      <group position={[3, 0, 5]}>
        {/* Pyramid body */}
        <mesh position={[0, 17, 0]}>
          <cylinderGeometry args={[0.08, 2.8, 34, 4]} />
          <meshStandardMaterial color="#E8E4DC" roughness={0.3} metalness={0.5}
            emissive="#E8E4DC" emissiveIntensity={0.04} />
        </mesh>
        {/* Distinctive wings / notches near top */}
        {[-1, 1].map((side, i) => (
          <mesh key={i} position={[side * 1.5, 22, 0]}>
            <boxGeometry args={[0.6, 4, 0.4]} />
            <meshStandardMaterial color="#D8D4CC" roughness={0.4} metalness={0.4} />
          </mesh>
        ))}
        {/* Spire */}
        <mesh position={[0, 35.5, 0]}>
          <cylinderGeometry args={[0.04, 0.2, 3, 4]} />
          <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Rooftop light */}
        <pointLight color="#fff8f0" intensity={1} distance={8} position={[0, 37, 0]} />
      </group>

      {/* ── SF City skyline ──────────────────────────────── */}
      {SF_BUILDINGS.map(([lx, lz, h, wx, wz, ci], i) => (
        <mesh key={i} position={[lx, h/2, lz]}>
          <boxGeometry args={[wx, h, wz]} />
          <meshStandardMaterial
            color={SF_COLORS[ci]}
            roughness={0.45} metalness={0.5}
            emissive={ci === 2 ? '#102030' : '#0A1428'}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* ── SF Hills rolling behind city ─────────────────── */}
      {[
        [14, 18, 14], [24, 20, 12], [-6, 24, 10],
        [4, 26, 16],  [-16, 22, 10], [18, 26, 8],
      ].map(([x,z,h],i) => (
        <mesh key={i} position={[x, h/2, z]}>
          <coneGeometry args={[9+i,h,6]} />
          <meshStandardMaterial color={i%2?'#3A5A3A':'#4A6A4A'} roughness={0.9} flatShading />
        </mesh>
      ))}

      {/* ── Cable car ────────────────────────────────────── */}
      <group position={[-5, 0, 1]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[4.5, 2.2, 2.2]} />
          <meshStandardMaterial color="#C8B030" roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <boxGeometry args={[4.0, 0.6, 2.0]} />
          <meshStandardMaterial color="#A89020" roughness={0.7} />
        </mesh>
        {/* Windows */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 1.3, 1.12]}>
            <boxGeometry args={[0.7, 0.9, 0.05]} />
            <meshStandardMaterial color="#88CCEE" metalness={0.2} roughness={0.1}
              emissive="#446688" emissiveIntensity={0.4} />
          </mesh>
        ))}
        {/* Trolley wheels */}
        {[-1.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.25, 0.25, 2.2, 8]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* ── Atmospheric fog / haze ──────────────────────── */}
      <mesh position={[0, 5, -9]} rotation={[0, 0, 0]}>
        <planeGeometry args={[80, 10]} />
        <meshBasicMaterial color="#C8D8E8" transparent opacity={0.10}
          side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* ── SF ground ────────────────────────────────────── */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0, 0.04, 8]}>
        <planeGeometry args={[80, 34]} />
        <meshStandardMaterial color="#384828" roughness={1} />
      </mesh>
    </group>
  )
}

// ── Seattle ───────────────────────────────────────────────────────────────────
// Positioned at [-32, 0, 52] — visible to the left when user turns south
// Features: Space Needle, Mount Rainier, Columbia Center, dense evergreen forest
const SEA_BUILDINGS = [
  // Seattle CBD / Capitol Hill
  [-14, 6, 16, 2.2, 2.2, 0],
  [-10, 5, 24, 2.8, 2.8, 1], // Columbia Center proxy (tallest)
  [-6,  6, 20, 2.5, 2.5, 2],
  [-2,  5, 18, 2.2, 2.2, 0],
  [2,   6, 14, 2.0, 2.0, 1],
  [6,   7, 22, 2.6, 2.6, 2],
  [10,  5, 12, 2.4, 1.8, 0],
  [12,  6, 16, 2.0, 2.0, 1],
  [14,  7, 10, 1.8, 2.2, 2],
  [-12, 4, 8,  2.2, 1.6, 1],
]
const SEA_COLORS = ['#1C2838', '#243040', '#202C3A']

const EVERGREENS = [
  [-18,-3],[-22,-6],[-16,-9],[8,-4],[14,-7],[18,-5],[-4,2],[12,3],
  [-14,6],[16,9],[-18,4],[4,-12],[-10,-15],[2,-10],[-24,0],[-20,7],
  [20,-2],[22,5],[10,7],[-6,10],[24,-8],[-26,4],[26,2],[-8,-18],
]

function Seattle() {
  return (
    <group position={[-32, 0, 52]}>
      {/* ── Puget Sound water ─────────────────────────────── */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0, 0.08, -14]}>
        <planeGeometry args={[70, 32]} />
        <meshStandardMaterial
          color="#1A4060" roughness={0.08} metalness={0.62}
          emissive="#0A2040" emissiveIntensity={0.12}
        />
      </mesh>

      {/* ── Space Needle (prominent, 1.6x scale) ─────────── */}
      <group position={[-4, 0, 0]}>
        {/* Tripod base legs */}
        {[0, 120, 240].map((deg,i) => {
          const r = deg * Math.PI / 180
          return (
            <mesh key={i} position={[Math.cos(r)*4.2, 5.5, Math.sin(r)*4.2]}
              rotation={[0.35, r + Math.PI/2, 0.3]}>
              <cylinderGeometry args={[0.22, 0.44, 11, 5]} />
              <meshStandardMaterial color="#9EA8AA" metalness={0.85} roughness={0.2} />
            </mesh>
          )
        })}
        {/* Concrete base ring */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[4.5, 5.2, 1.8, 12]} />
          <meshStandardMaterial color="#888" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Main shaft */}
        <mesh position={[0, 17.5, 0]}>
          <cylinderGeometry args={[0.45, 0.9, 32, 8]} />
          <meshStandardMaterial color="#CCCECE" metalness={0.92} roughness={0.10} />
        </mesh>
        {/* Halo ring (wider section below deck) */}
        <mesh position={[0, 31, 0]}>
          <cylinderGeometry args={[7, 5, 1.2, 14]} />
          <meshStandardMaterial color="#BBBCBE" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Observation deck */}
        <mesh position={[0, 33, 0]}>
          <cylinderGeometry args={[6.5, 6, 3.2, 16]} />
          <meshStandardMaterial color="#D0D4D8" metalness={0.82} roughness={0.18}
            emissive="#88AABB" emissiveIntensity={0.08} />
        </mesh>
        {/* Glass restaurant ring */}
        <mesh position={[0, 35.2, 0]}>
          <cylinderGeometry args={[6.2, 6.2, 1, 16]} />
          <meshStandardMaterial color="#88BBDD" metalness={0.3} roughness={0.05}
            emissive="#446688" emissiveIntensity={0.3} transparent opacity={0.7} />
        </mesh>
        {/* Upper spire */}
        <mesh position={[0, 43, 0]}>
          <coneGeometry args={[0.3, 15, 6]} />
          <meshStandardMaterial color="#C8CCCE" metalness={0.95} roughness={0.08} />
        </mesh>
        {/* Aircraft warning light */}
        <pointLight color="#ff2200" intensity={3} distance={10} position={[0, 51, 0]} />
      </group>

      {/* ── Mount Rainier — iconic snow-capped stratovolcano ── */}
      {/* Behind the city, very large, unmistakably Rainier */}
      <group position={[8, 0, 38]}>
        {/* Broad volcanic base */}
        <mesh position={[0, 22, 0]}>
          <coneGeometry args={[38, 44, 8]} />
          <meshStandardMaterial color="#5A5850" roughness={0.88} flatShading />
        </mesh>
        {/* Mid-slope forests */}
        <mesh position={[0, 12, 0]}>
          <coneGeometry args={[36, 24, 8]} />
          <meshStandardMaterial color="#2E4828" roughness={0.95} flatShading />
        </mesh>
        {/* Glacial snow zone — wide coverage, heavy snow */}
        <mesh position={[0, 34, 0]}>
          <coneGeometry args={[24, 22, 8]} />
          <meshStandardMaterial color="#D8E4F0" roughness={0.82} flatShading />
        </mesh>
        {/* Upper ice field */}
        <mesh position={[0, 42, 0]}>
          <coneGeometry args={[14, 14, 8]} />
          <meshStandardMaterial color="#E8EEF8" roughness={0.75} flatShading />
        </mesh>
        {/* Summit / crater area */}
        <mesh position={[0, 48, 0]}>
          <coneGeometry args={[6, 8, 8]} />
          <meshStandardMaterial color="#F2F6FF" roughness={0.65} flatShading />
        </mesh>
        {/* Caldera hint */}
        <mesh position={[0, 52, 0]}>
          <cylinderGeometry args={[2.5, 4, 2, 8]} />
          <meshStandardMaterial color="#E0E8F8" roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* ── Seattle city skyline ──────────────────────────── */}
      {SEA_BUILDINGS.map(([lx, lz, h, wx, wz, ci], i) => (
        <mesh key={i} position={[lx, h/2, lz]}>
          <boxGeometry args={[wx, h, wz]} />
          <meshStandardMaterial
            color={SEA_COLORS[ci]}
            roughness={0.45} metalness={0.5}
            emissive={ci === 1 ? '#0A1828' : '#081420'}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}
      {/* Columbia Center (tallest Seattle building) */}
      <mesh position={[-10, 28, 5]}>
        <boxGeometry args={[2.6, 56, 2.6]} />
        <meshStandardMaterial color="#1A2030" roughness={0.4} metalness={0.6}
          emissive="#0A1228" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-10, 57, 5]}>
        <boxGeometry args={[1.2, 4, 1.2]} />
        <meshStandardMaterial color="#2A3040" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ── Pacific NW evergreen forest ───────────────────── */}
      {EVERGREENS.map(([x,z],i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 2.8, 5]} />
            <meshStandardMaterial color="#3A2A1A" roughness={0.95} />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <coneGeometry args={[1.6, 5.5, 6]} />
            <meshStandardMaterial color="#163818" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 6.5, 0]}>
            <coneGeometry args={[1.1, 4, 6]} />
            <meshStandardMaterial color="#1A4020" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 8.2, 0]}>
            <coneGeometry args={[0.7, 3, 6]} />
            <meshStandardMaterial color="#1E4A24" roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}

      {/* ── Cascade mountain backdrop (behind city, far from user) ─ */}
      {[
        [-28, 42, 22], [-14, 46, 28], [2, 44, 18], [20, 42, 16], [34, 40, 14],
        [-38, 44, 16], [28, 46, 12], [-6, 48, 20],
      ].map(([x,z,h],i) => (
        <group key={i} position={[x,0,z]}>
          <mesh position={[0,h/2,0]}>
            <coneGeometry args={[13,h,6]} />
            <meshStandardMaterial color="#3A4A5A" roughness={0.9} flatShading />
          </mesh>
          {h > 14 && (
            <mesh position={[0,h*0.78,0]}>
              <coneGeometry args={[4,h*0.4,6]} />
              <meshStandardMaterial color="#D4DCE8" roughness={0.82} flatShading />
            </mesh>
          )}
        </group>
      ))}

      {/* ── Green ground ──────────────────────────────────── */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0, 0.04, -6]}>
        <planeGeometry args={[75, 30]} />
        <meshStandardMaterial color="#2A4A2A" roughness={1} />
      </mesh>
    </group>
  )
}

export default function Landscapes() {
  return (
    <>
      <UtahMountains />
      <SanFrancisco />
      <Seattle />
    </>
  )
}
