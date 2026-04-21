import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8, color: '#c8dff0', fontSize: 13, padding: '8px 10px',
  fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.5,
}
const labelStyle = {
  fontSize: 11, color: '#ffd700', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block',
}
const rowStyle = { display: 'flex', gap: 12, marginBottom: 14 }

export default function EditModal({ building, onClose, onSave }) {
  const [name,     setName]     = useState('')
  const [years,    setYears]    = useState('')
  const [location, setLocation] = useState('')
  const [blurb,    setBlurb]    = useState('')
  const [roles,    setRoles]    = useState([])

  useEffect(() => {
    if (!building) return
    setName(building.name     || '')
    setYears(building.years   || '')
    setLocation(building.location || '')
    setBlurb(building.blurb   || '')
    setRoles(JSON.parse(JSON.stringify(building.roles || [])))
  }, [building])

  if (!building) return null

  // ── Role field helpers ───────────────────────────────────────────
  const setRole = (ri, patch) => {
    const r = [...roles]; r[ri] = { ...r[ri], ...patch }; setRoles(r)
  }
  const updateBullet    = (ri, bi, val) => {
    const r = [...roles]
    r[ri] = { ...r[ri], bullets: [...r[ri].bullets] }
    r[ri].bullets[bi] = val
    setRoles(r)
  }
  const addBullet       = (ri) => {
    const r = [...roles]
    r[ri] = { ...r[ri], bullets: [...r[ri].bullets, ''] }
    setRoles(r)
  }
  const removeBullet    = (ri, bi) => {
    const r = [...roles]
    r[ri] = { ...r[ri], bullets: r[ri].bullets.filter((_, i) => i !== bi) }
    setRoles(r)
  }
  const updateDeal      = (ri, di, field, val) => {
    const r = [...roles]
    r[ri] = { ...r[ri], deals: [...(r[ri].deals || [])] }
    r[ri].deals[di] = { ...r[ri].deals[di], [field]: val }
    setRoles(r)
  }

  // ── File upload (async, with canvas compression for images) ──────
  const compressImage = (file) => new Promise((resolve) => {
    const MAX = 1200
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let { width: w, height: h } = img
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX }
        else       { w = Math.round(w * MAX / h); h = MAX }
      }
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      canvas.toBlob(blob => {
        const reader = new FileReader()
        reader.onload  = () => resolve(reader.result)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      }, 'image/jpeg', 0.85)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })

  const handleFileUpload = async (ri, e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    let dataUrl
    if (file.type.startsWith('image/')) {
      dataUrl = await compressImage(file)
      if (!dataUrl) return
    } else {
      dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload  = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }
    const r = [...roles]
    r[ri] = { ...r[ri], attachments: [...(r[ri].attachments || []), { name: file.name, type: file.type, dataUrl }] }
    setRoles(r)
  }
  const removeAttachment = (ri, ai) => {
    const r = [...roles]
    r[ri] = { ...r[ri], attachments: (r[ri].attachments || []).filter((_, i) => i !== ai) }
    setRoles(r)
  }

  const handleSave = () => {
    onSave(building.id, { name, years, location, blurb, roles })
    onClose()
  }

  return (
    <AnimatePresence>
      {building && (
        <>
          <motion.div key="ed-bg" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose}
            style={{ position:'fixed', inset:0, zIndex:600, backdropFilter:'blur(8px)',
              WebkitBackdropFilter:'blur(8px)', background:'rgba(0,0,0,0.75)' }} />

          {/* Centering wrapper */}
          <div style={{
            position:'fixed', inset:0, zIndex:610,
            display:'flex', alignItems:'center', justifyContent:'center',
            pointerEvents:'none',
          }}>
          <motion.div key="ed-modal"
            initial={{ opacity:0, scale:0.94, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.95 }} transition={{ type:'spring', damping:28, stiffness:320 }}
            style={{
              pointerEvents:'auto',
              width:'min(720px,96vw)', maxHeight:'90vh',
              background:'#080f1e', border:'2px solid #ffd70066', borderRadius:16,
              display:'flex', flexDirection:'column', overflow:'hidden',
              fontFamily:'Inter,-apple-system,sans-serif', color:'#e8f2ff',
              boxShadow:'0 32px 80px rgba(0,0,0,0.85)',
            }}
          >
            {/* Header */}
            <div style={{ padding:'18px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              background:'rgba(255,215,0,0.05)', flexShrink:0 }}>
              <div>
                <div style={{ fontSize:12, color:'#ffd700', fontWeight:700, letterSpacing:'0.08em',
                  textTransform:'uppercase', marginBottom:3 }}>✏️ Edit Mode</div>
                <div style={{ fontSize:18, fontWeight:700 }}>{building.name}</div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={onClose} style={{ padding:'8px 18px', borderRadius:8,
                  background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)',
                  color:'#aaa', cursor:'pointer', fontSize:13 }}>Cancel</button>
                <button onClick={handleSave} style={{ padding:'8px 20px', borderRadius:8,
                  background:'#ffd700', border:'none', color:'#0a0a0a',
                  cursor:'pointer', fontSize:13, fontWeight:700 }}>Save Changes</button>
              </div>
            </div>

            {/* Body */}
            <div style={{ overflowY:'auto', padding:'20px 24px 28px', flex:1, minHeight:0 }}>

              {/* ── Building-level fields ───────────────────────── */}
              <div style={{ marginBottom:24, padding:16, borderRadius:10,
                background:'rgba(255,215,0,0.04)', border:'1px solid rgba(255,215,0,0.15)' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#ffd700', marginBottom:14,
                  textTransform:'uppercase', letterSpacing:'0.06em' }}>Experience Details</div>

                <div style={rowStyle}>
                  <div style={{ flex:2 }}>
                    <label style={labelStyle}>Title / Company Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                      style={{ ...inputStyle, resize:'none' }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <label style={labelStyle}>Years</label>
                    <input value={years} onChange={e => setYears(e.target.value)}
                      style={{ ...inputStyle, resize:'none' }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <label style={labelStyle}>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)}
                      style={{ ...inputStyle, resize:'none' }} />
                  </div>
                </div>

                {blurb !== undefined && (
                  <div>
                    <label style={labelStyle}>Personal Blurb (shown in italic)</label>
                    <textarea value={blurb} onChange={e => setBlurb(e.target.value)}
                      rows={4} style={inputStyle} />
                  </div>
                )}
              </div>

              {/* ── Per-role sections ──────────────────────────── */}
              {roles.map((role, ri) => (
                <div key={ri} style={{ marginBottom:24, padding:16, borderRadius:10,
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>

                  {/* Role title + period */}
                  <div style={rowStyle}>
                    <div style={{ flex:2 }}>
                      <label style={labelStyle}>Role Title</label>
                      <input value={role.title || ''} onChange={e => setRole(ri, { title: e.target.value })}
                        style={{ ...inputStyle, resize:'none' }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <label style={labelStyle}>Period</label>
                      <input value={role.period || ''} onChange={e => setRole(ri, { period: e.target.value })}
                        style={{ ...inputStyle, resize:'none' }} />
                    </div>
                  </div>

                  {/* Bullets */}
                  <div style={{ marginBottom:12 }}>
                    <label style={labelStyle}>Bullet Points</label>
                    {role.bullets.map((b, bi) => (
                      <div key={bi} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'flex-start' }}>
                        <textarea value={b} onChange={e => updateBullet(ri, bi, e.target.value)}
                          rows={2} style={{ ...inputStyle, flex:1 }} />
                        <button onClick={() => removeBullet(ri, bi)} style={{
                          width:28, height:28, borderRadius:6, background:'rgba(255,60,60,0.12)',
                          border:'1px solid rgba(255,60,60,0.3)', color:'#ff6b6b',
                          cursor:'pointer', fontSize:14, flexShrink:0, marginTop:2,
                        }}>×</button>
                      </div>
                    ))}
                    <button onClick={() => addBullet(ri)} style={{
                      padding:'6px 14px', borderRadius:6, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.14)', color:'#8ab4d4',
                      cursor:'pointer', fontSize:12,
                    }}>+ Add bullet</button>
                  </div>

                  {/* Deals */}
                  {role.deals?.map((deal, di) => (
                    <div key={di} style={{ marginTop:10, padding:'10px 12px', borderRadius:8,
                      background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <label style={labelStyle}>Deal: {deal.name}</label>
                      <textarea value={deal.detail} onChange={e => updateDeal(ri, di, 'detail', e.target.value)}
                        rows={2} style={inputStyle} />
                    </div>
                  ))}

                  {/* Attachments */}
                  <div style={{ marginTop:14 }}>
                    <label style={labelStyle}>Attachments (images &amp; PDFs)</label>
                    {(role.attachments || []).map((att, ai) => (
                      <div key={ai} style={{ display:'flex', gap:10, marginBottom:8, alignItems:'center',
                        padding:'8px 10px', borderRadius:8, background:'rgba(255,255,255,0.03)',
                        border:'1px solid rgba(255,255,255,0.08)' }}>
                        {att.type?.startsWith('image/') ? (
                          <img src={att.dataUrl} alt={att.name} style={{
                            width:48, height:48, objectFit:'cover', borderRadius:6, flexShrink:0,
                          }} />
                        ) : (
                          <div style={{ width:48, height:48, borderRadius:6, background:'rgba(255,255,255,0.06)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:22, flexShrink:0 }}>📄</div>
                        )}
                        <span style={{ color:'#8ab4d4', fontSize:12, flex:1, overflow:'hidden',
                          textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{att.name}</span>
                        <button onClick={() => removeAttachment(ri, ai)} style={{
                          width:28, height:28, borderRadius:6, background:'rgba(255,60,60,0.12)',
                          border:'1px solid rgba(255,60,60,0.3)', color:'#ff6b6b',
                          cursor:'pointer', fontSize:14, flexShrink:0,
                        }}>×</button>
                      </div>
                    ))}
                    <label style={{
                      display:'inline-flex', alignItems:'center', gap:6,
                      padding:'7px 16px', borderRadius:6, background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.14)', color:'#8ab4d4',
                      cursor:'pointer', fontSize:12, marginTop:2,
                    }}>
                      <input type="file" accept="image/*,.pdf" style={{ display:'none' }}
                        onChange={e => handleFileUpload(ri, e)} />
                      📎 Add Image or PDF
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
