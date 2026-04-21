import { person } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-identity">
        <img className="nav-avatar" src={person.headshot} alt={person.name} />
        <div>
          <div className="nav-name">{person.name}</div>
          <div className="nav-title">{person.title} · {person.company}</div>
        </div>
      </div>

      <div className="nav-links" style={{ display:'flex', alignItems:'center', gap:10 }}>
        <SocialLinks size="sm" />
        <a
          className="nav-link"
          href={`mailto:${person.email}`}
          title="Email"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
          Contact
        </a>
      </div>
    </nav>
  )
}
