// Cana-de-açúcar em traço fino — o mesmo motivo ilustrado do cardápio da casa.
export default function Cane({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 600" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      {/* colmos */}
      <path d="M92 600V250M112 600V300M72 600V340" />
      {[600, 520, 440, 360, 280].map((y) => (
        <g key={y}>
          <path d={`M86 ${y - 4}h12M86 ${y - 8}h12`} opacity=".7" />
        </g>
      ))}
      {[560, 480, 400, 320].map((y) => (
        <path key={y} d={`M106 ${y}h12M106 ${y - 4}h12`} opacity=".7" />
      ))}
      {[580, 500, 420].map((y) => (
        <path key={y} d={`M66 ${y}h12M66 ${y - 4}h12`} opacity=".7" />
      ))}
      {/* folhas */}
      <path d="M92 250C88 180 60 110 10 60" />
      <path d="M92 250C96 170 130 100 190 70" />
      <path d="M92 255C80 200 40 170 0 160" />
      <path d="M112 300C120 230 150 190 196 170" />
      <path d="M112 300C108 220 120 120 150 10" />
      <path d="M72 340C60 280 30 250 4 240" />
      <path d="M92 250C92 180 96 90 84 0" />
      <path d="M112 305C130 260 170 250 200 255" />
    </svg>
  )
}
