// RCC's footer mascot: a retro computer with a pixel face. Waves its right arm while its parent `group/bot` is hovered.

const OUTLINE = '#102a43';
const BODY = '#9b6cf2';
const BODY_SHADE = '#7b4be0';
const SCREEN = '#102a43';
const MAGENTA = '#f0479a';

// pixel smile, as [x, y] of 8px squares on the screen
const SMILE = [
  [108, 114],
  [116, 122],
  [124, 122],
  [132, 122],
  [140, 114],
];

export function RccBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 252" className={className} role="img" aria-label="RCC's computer mascot">
      {/* antenna */}
      <line x1="130" y1="34" x2="130" y2="14" stroke={OUTLINE} strokeWidth="6" strokeLinecap="round" />
      <rect x="121" y="2" width="18" height="18" fill={MAGENTA} stroke={OUTLINE} strokeWidth="4" />

      {/* legs + shoes */}
      <rect x="96" y="170" width="20" height="60" fill={BODY_SHADE} stroke={OUTLINE} strokeWidth="5" />
      <rect x="144" y="170" width="20" height="60" fill={BODY_SHADE} stroke={OUTLINE} strokeWidth="5" />
      <rect x="80" y="224" width="44" height="22" rx="11" fill={MAGENTA} stroke={OUTLINE} strokeWidth="5" />
      <rect x="138" y="224" width="44" height="22" rx="11" fill={MAGENTA} stroke={OUTLINE} strokeWidth="5" />

      {/* left arm, hand on hip */}
      <path d="M46 104 C 14 108, 10 142, 34 152" fill="none" stroke={OUTLINE} strokeWidth="16" strokeLinecap="round" />
      <path d="M46 104 C 14 108, 10 142, 34 152" fill="none" stroke={BODY} strokeWidth="7" strokeLinecap="round" />
      <circle cx="36" cy="152" r="11" fill={BODY} stroke={OUTLINE} strokeWidth="5" />

      {/* right arm: rotates up from the shoulder to wave */}
      <g
        className="transition-transform duration-500 ease-cta group-hover/bot:-rotate-[125deg] motion-reduce:transition-none"
        style={{ transformOrigin: '214px 104px' }}
      >
        <path
          d="M214 104 C 246 108, 250 142, 226 152"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M214 104 C 246 108, 250 142, 226 152"
          fill="none"
          stroke={BODY}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="224" cy="152" r="11" fill={BODY} stroke={OUTLINE} strokeWidth="5" />
      </g>

      {/* monitor */}
      <rect x="40" y="32" width="180" height="146" rx="28" fill={BODY} stroke={OUTLINE} strokeWidth="6" />
      <path d="M46 150 h168 v6 a20 20 0 0 1 -20 18 h-128 a20 20 0 0 1 -20 -18 z" fill={BODY_SHADE} />
      <rect x="196" y="158" width="10" height="8" fill={MAGENTA} />

      {/* screen + pixel face */}
      <rect x="62" y="52" width="136" height="98" rx="16" fill={SCREEN} stroke={OUTLINE} strokeWidth="4" />
      <rect x="74" y="62" width="28" height="7" rx="3.5" fill="#ffffff" opacity="0.25" />
      <rect x="98" y="80" width="14" height="22" fill="#ffffff" />
      <rect x="148" y="80" width="14" height="22" fill="#ffffff" />
      <rect x="82" y="108" width="12" height="6" fill={MAGENTA} />
      <rect x="166" y="108" width="12" height="6" fill={MAGENTA} />
      {SMILE.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill={MAGENTA} />
      ))}
    </svg>
  );
}
