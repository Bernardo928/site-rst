// Selo da Casa Marafo redesenhado em SVG (copo baixo com gelo, como no letreiro).
export default function Logo({ className = '', ring = true }: { className?: string; ring?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Casa Marafo">
      <defs>
        <path id="lg-top" d="M22 60a38 38 0 0 1 76 0" />
        <path id="lg-bot" d="M18 60a42 42 0 0 0 84 0" />
      </defs>
      {ring && <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="2" />}
      <text fontFamily="var(--font-serif)" fontSize="17" fontWeight="600" letterSpacing="4" fill="currentColor">
        <textPath href="#lg-top" startOffset="50%" textAnchor="middle">CASA</textPath>
      </text>
      <text fontFamily="var(--font-serif)" fontSize="17" fontWeight="600" letterSpacing="3" fill="currentColor">
        <textPath href="#lg-bot" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">MARAFO</textPath>
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M43 44h34l-3 30a4 4 0 0 1-4 3.6H50a4 4 0 0 1-4-3.6z" />
        <path d="M44.5 52h31" opacity=".55" />
        <path d="M50 56l8-2 2 8-8 2zM61 53l8 1-1 8-8-1zM55 64l8-1 1 7-8 1z" />
      </g>
    </svg>
  )
}
