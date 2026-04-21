import { motion, AnimatePresence } from 'framer-motion'
import SocialLinks from './SocialLinks'

const TYPE_LABEL = { work:'Experience', education:'Education', personal:'Personal' }

export default function InfoModal({ building, onClose, isEditMode, onEdit }) {
  return (
    <AnimatePresence>
      {building && (
        <>
          {/* Blur backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}
            onClick={onClose}
            style={{
              position:'fixed', inset:0, zIndex:500,
              backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
              background:'rgba(2,6,16,0.72)',
            }}
          />

          {/* Centering wrapper — flexbox centering avoids Framer Motion transform conflicts */}
          <div style={{
            position:'fixed', inset:0, zIndex:510,
            display:'flex', alignItems:'center', justifyContent:'center',
            pointerEvents:'none',
          }}>
          <motion.div
            key="modal"
            initial={{ opacity:0, scale:0.92, y:24 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.94, y:16 }}
            transition={{ type:'spring', damping:28, stiffness:320 }}
            style={{
              pointerEvents:'auto',
              width:'min(660px, 92vw)', maxHeight:'80vh',
              background:'rgba(6,12,26,0.96)',
              border:`2px solid ${building.accentColor}44`,
              borderRadius:18, overflow:'hidden',
              display:'flex', flexDirection:'column',
              boxShadow:`0 32px 80px rgba(0,0,0,0.7), 0 0 40px ${building.accentColor}22`,
              fontFamily:'Inter,-apple-system,sans-serif',
            }}
          >
            {/* Header */}
            <div style={{
              padding:'24px 28px 18px', flexShrink:0,
              borderBottom:`1px solid rgba(255,255,255,0.07)`,
              borderTop:`4px solid ${building.accentColor}`,
              background:`linear-gradient(135deg, ${building.color}44 0%, transparent 60%)`,
            }}>
              <div style={{ position:'absolute', top:16, right:16, display:'flex', gap:8 }}>
                {isEditMode && onEdit && (
                  <button onClick={() => { onClose(); onEdit(building) }} style={{
                    width:34, height:34, borderRadius:'50%', background:'rgba(255,215,0,0.12)',
                    border:'1px solid rgba(255,215,0,0.4)', color:'#ffd700',
                    fontSize:15, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                  }} title="Edit this experience">✏️</button>
                )}
                <button onClick={onClose} style={{
                  width:34, height:34, borderRadius:'50%', background:'rgba(255,255,255,0.08)',
                  border:'1px solid rgba(255,255,255,0.14)', color:'#aaa',
                  fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                }}>✕</button>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                {/* Logo */}
                <div style={{
                  width:64, height:64, borderRadius:12, overflow:'hidden',
                  boxShadow:`0 0 20px ${building.accentColor}44`, flexShrink:0,
                }} dangerouslySetInnerHTML={{ __html: building.logoSvg }} />

                <div>
                  <div style={{
                    display:'inline-flex', alignItems:'center', gap:6,
                    padding:'3px 10px', borderRadius:4, marginBottom:7,
                    background:`${building.color}55`, border:`1px solid ${building.accentColor}44`,
                    fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase',
                    color: building.accentColor,
                  }}>
                    {building.emoji} {TYPE_LABEL[building.type]||building.type}
                  </div>
                  <div style={{ fontSize:28, fontWeight:800, color:'#f0f6ff', letterSpacing:'-0.02em', lineHeight:1.1 }}>
                    {building.name}
                  </div>
                  <div style={{ display:'flex', gap:14, marginTop:5, color:'#6a8aaa', fontSize:13 }}>
                    {building.years && <span>📅 {building.years}</span>}
                    {building.location && <span>📍 {building.location}</span>}
                  </div>
                  {building.type === 'personal' && (
                    <SocialLinks size="md" style={{ marginTop:12 }} />
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable body — minHeight:0 required so flex child can shrink below content height */}
            <div style={{ overflowY:'auto', padding:'20px 28px 28px', flex:1, minHeight:0 }}>
              {/* Italicized blurb at top */}
              {building.blurb && (
                <motion.div
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.1 }}
                  style={{
                    fontStyle:'italic', fontSize:13.5, lineHeight:1.7, color:'#8aa0b8',
                    marginBottom:24, paddingBottom:18,
                    borderBottom:'1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {building.blurb}
                </motion.div>
              )}
              {building.roles.map((role, ri) => (
                <motion.div key={ri} style={{ marginBottom: ri < building.roles.length-1 ? 28 : 0 }}
                  initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: ri*0.07+0.15 }}
                >
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:17, fontWeight:700, color:'#e8f2ff', lineHeight:1.3 }}>{role.title}</div>
                    {role.period && <div style={{ fontSize:12, color:'#4a6a88', marginTop:2 }}>{role.period}</div>}
                  </div>
                  <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginBottom:12 }} />

                  {role.bullets?.map((b,bi) => (
                    <div key={bi} style={{ display:'flex', gap:10, marginBottom:10 }}>
                      <span style={{
                        width:6, height:6, borderRadius:'50%', flexShrink:0, marginTop:7,
                        background: building.accentColor,
                      }} />
                      <span style={{ fontSize:14, lineHeight:1.65, color:'#8aaccc' }}>{b}</span>
                    </div>
                  ))}

                  {role.deals?.length > 0 && (
                    <div style={{
                      marginTop:12, padding:'12px 16px', borderRadius:10,
                      background:'rgba(255,255,255,0.04)', border:`1px solid ${building.accentColor}22`,
                    }}>
                      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase',
                        color: building.accentColor, marginBottom:10 }}>Select Deal Experience</div>
                      {role.deals.map((deal,di) => (
                        <div key={di} style={{ display:'flex', gap:10, marginBottom: di<role.deals.length-1?10:0 }}>
                          <span style={{ width:5, height:5, borderRadius:'50%', flexShrink:0, marginTop:6,
                            background: building.accentColor }} />
                          <div>
                            <div style={{ fontSize:13, fontWeight:600, color:'#d8ecff', marginBottom:2 }}>{deal.name}</div>
                            <div style={{ fontSize:12.5, color:'#7a9ab8', lineHeight:1.55 }}>{deal.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Uploaded attachments (images / PDFs) */}
                  {role.attachments?.length > 0 && (
                    <div style={{ marginTop:12 }}>
                      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.07em', textTransform:'uppercase',
                        color: building.accentColor, marginBottom:10 }}>Attachments</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                        {role.attachments.map((att,ai) => (
                          att.type?.startsWith('image/') ? (
                            <a key={ai} href={att.dataUrl} target="_blank" rel="noopener noreferrer"
                              style={{ display:'block', borderRadius:8, overflow:'hidden',
                                border:`1px solid ${building.accentColor}33`,
                                boxShadow:`0 0 12px ${building.accentColor}11` }}>
                              <img src={att.dataUrl} alt={att.name} style={{
                                maxWidth:260, maxHeight:180, objectFit:'cover', display:'block',
                              }} />
                            </a>
                          ) : (
                            <a key={ai} href={att.dataUrl} download={att.name}
                              style={{
                                display:'flex', alignItems:'center', gap:8, padding:'8px 14px',
                                borderRadius:8, background:'rgba(255,255,255,0.04)',
                                border:`1px solid ${building.accentColor}33`,
                                color:'#8aaccc', fontSize:13, textDecoration:'none',
                              }}>
                              <span style={{fontSize:20}}>📄</span> {att.name}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
