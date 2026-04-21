import { motion } from 'framer-motion'
import { person } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function Intro({ onEnter }) {
  // The 3D scene is already rendering behind this overlay in helicopter mode.
  // This overlay just applies a blur + shows the headshot + Explore button.
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.5 }}
      style={{
        position:'fixed', inset:0, zIndex:300, display:'flex', alignItems:'center',
        justifyContent:'center', flexDirection:'column',
        // Light blur so city is clearly visible behind
        backdropFilter:'blur(3px)', WebkitBackdropFilter:'blur(3px)',
        background:'rgba(5,11,24,0.42)',
        fontFamily:'Inter,-apple-system,sans-serif',
      }}
    >
      {/* Pulse ring */}
      <motion.div
        animate={{ scale:[1,1.06,1], opacity:[0.4,0.8,0.4] }}
        transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
        style={{
          width:220, height:220, borderRadius:'50%',
          background:'radial-gradient(circle, #0078D444 0%, transparent 70%)',
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%) translateY(-80px)',
          pointerEvents:'none',
        }}
      />

      {/* Headshot circle */}
      <motion.div
        initial={{ scale:0.7, opacity:0 }}
        animate={{ scale:1, opacity:1 }}
        transition={{ type:'spring', damping:18, stiffness:200, delay:0.15 }}
        style={{ position:'relative', marginBottom:22 }}
      >
        <img src={person.headshot} alt={person.name}
          style={{
            width:180, height:180, borderRadius:'50%',
            objectFit:'cover', objectPosition:'center top',
            boxShadow:'0 0 0 4px #0078D4, 0 0 40px #0078D488, 0 0 80px #0078D422',
            display:'block',
          }}
        />
        {/* Animated ring */}
        <motion.div
          animate={{ scale:[1,1.25], opacity:[0.5,0] }}
          transition={{ duration:2, repeat:Infinity, ease:'easeOut', delay:1 }}
          style={{ position:'absolute', inset:-8, borderRadius:'50%',
            border:'2px solid #50E6FF', pointerEvents:'none' }}
        />
      </motion.div>

      {/* Name + title */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
        style={{ textAlign:'center' }}>
        <div style={{ fontSize:40, fontWeight:800, color:'white', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:8 }}>
          {person.name}
        </div>
        <div style={{ fontSize:17, color:'#50E6FF', fontWeight:400, marginBottom:6 }}>{person.title}</div>
        <div style={{ fontSize:14, color:'#6a8aa8', marginBottom:28 }}>{person.company} · {person.location}</div>
      </motion.div>

      {/* Tags */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
        style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, maxWidth:400, marginBottom:32, padding:'0 16px' }}>
        {person.tags.map(tag => (
          <span key={tag} style={{
            padding:'5px 14px', borderRadius:20, fontSize:12, fontWeight:500,
            background:'rgba(0,120,212,0.15)', border:'1px solid rgba(0,120,212,0.3)', color:'#50E6FF',
          }}>{tag}</span>
        ))}
      </motion.div>

      {/* Welcome message */}
      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.52}}
        style={{
          maxWidth:420, textAlign:'center', fontSize:13.5, lineHeight:1.7,
          color:'#8aa0b8', padding:'0 20px', marginBottom:16,
        }}>
        Hey! Welcome to my interactive resume walkthrough that I built solely with artificial intelligence. Feel free to take a look and explore my professional and personal background and connect with me on my socials.
      </motion.p>

      {/* Social icons */}
      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.57}}
        style={{ marginBottom:24 }}>
        <SocialLinks size="md" />
      </motion.div>

      {/* EXPLORE button */}
      <motion.button
        initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
        whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
        onClick={onEnter}
        style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'15px 36px', borderRadius:30,
          background:'linear-gradient(135deg, #0078D4, #0086EF)',
          border:'none', color:'white', fontSize:16, fontWeight:700,
          cursor:'pointer', fontFamily:'inherit',
          boxShadow:'0 4px 28px rgba(0,120,212,0.5)',
          letterSpacing:'0.04em',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="none"/>
        </svg>
        EXPLORE MY JOURNEY
      </motion.button>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
        style={{ fontSize:12, color:'#4a6a88', marginTop:16 }}>
        Drag to preview · Click Explore to enter the city
      </motion.p>
    </motion.div>
  )
}
