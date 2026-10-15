// RCC's lightbulb mascot (from the 2026 sticker set): a star-shaped head, a big white face, and a grey screw body.
// Comes in a few colors (`tint`) and expressions (`mood`); waves its right arm while a parent `group/bot` is hovered.

export const MASCOT_TINTS = {
  gold: { top: '#fcdf96', bottom: '#f4bd5c', limb: '#f6c666', edge: '#e5a53f' },
  pink: { top: '#ffd0dc', bottom: '#f394ae', limb: '#f6a8bd', edge: '#dd7894' },
  lilac: { top: '#e0d0ff', bottom: '#a98ef0', limb: '#bba5f3', edge: '#8c70da' },
  coral: { top: '#ffc0aa', bottom: '#f27f6b', limb: '#f59985', edge: '#d6634f' },
} as const;
export type MascotTint = keyof typeof MASCOT_TINTS;
export type MascotMood = 'happy' | 'lost' | 'wink' | 'wow' | 'dizzy';

const EYE = '#1d1d1f';
const CHEEK = '#f6b0bd';
const SCREW = '#8f9aa2';
const SCREW_EDGE = '#6c7880';
const MAGENTA = '#f0479a';

// head: a soft four-point star (pointed top, rounded points at the sides, wide rounded bottom)
const HEAD =
  'M120 4 C 132 4, 150 48, 172 66 C 196 84, 222 92, 222 112 C 222 134, 196 150, 120 152 C 44 150, 18 134, 18 112 C 18 92, 44 84, 68 66 C 90 48, 108 4, 120 4 Z';

// screw bands, top to bottom
const BANDS = [
  { x: 72, y: 146, width: 96 },
  { x: 70, y: 162, width: 100 },
  { x: 72, y: 178, width: 96 },
  { x: 76, y: 194, width: 88 },
];

// pixel question mark for the "lost" mood, as [col, row] cells of a 5x7 grid
const QUESTION_PIXELS = [
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [4, 1],
  [4, 2],
  [3, 3],
  [2, 4],
  [2, 6],
];

// an arm: a thick rounded stroke with a slightly darker rim
function Limb({ d, fill, edge }: { d: string; fill: string; edge: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={edge} strokeWidth="21" strokeLinecap="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth="16" strokeLinecap="round" />
    </>
  );
}

function Eyes({ mood }: { mood: MascotMood }) {
  const stroke = { stroke: EYE, strokeWidth: 5, strokeLinecap: 'round' as const, fill: 'none' };
  switch (mood) {
    case 'lost':
      // glancing up and to the side, brows raised
      return (
        <>
          <ellipse cx="104" cy="112" rx="6.5" ry="12" fill={EYE} />
          <ellipse cx="144" cy="112" rx="6.5" ry="12" fill={EYE} />
          <path d="M88 92 L 108 88" {...stroke} strokeWidth={4} />
          <path d="M132 88 L 152 92" {...stroke} strokeWidth={4} />
          <ellipse cx="122" cy="138" rx="5" ry="4" fill={EYE} />
        </>
      );
    case 'wink':
      return (
        <>
          <ellipse cx="100" cy="114" rx="7.5" ry="14" fill={EYE} />
          <path d="M131 116 Q 140 106, 149 116" {...stroke} />
        </>
      );
    case 'wow':
      return (
        <>
          <circle cx="100" cy="112" r="10" fill={EYE} />
          <circle cx="140" cy="112" r="10" fill={EYE} />
          <circle cx="103" cy="108" r="3" fill="#ffffff" />
          <circle cx="143" cy="108" r="3" fill="#ffffff" />
          <ellipse cx="120" cy="138" rx="6" ry="7" fill={EYE} />
        </>
      );
    case 'dizzy':
      return (
        <>
          <path d="M92 106 L 108 122 M108 106 L 92 122" {...stroke} />
          <path d="M132 106 L 148 122 M148 106 L 132 122" {...stroke} />
        </>
      );
    default:
      return (
        <>
          <ellipse cx="100" cy="114" rx="7.5" ry="14" fill={EYE} />
          <ellipse cx="140" cy="114" rx="7.5" ry="14" fill={EYE} />
        </>
      );
  }
}

export function RccBot({
  className,
  tint = 'gold',
  mood = 'happy',
  label = "RCC's lightbulb mascot",
}: {
  className?: string;
  tint?: MascotTint;
  mood?: MascotMood;
  /** accessible name; pass null for a purely decorative copy */
  label?: string | null;
}) {
  const colors = MASCOT_TINTS[tint];
  // ids are shared by every copy with the same tint, which is fine: the definitions are identical
  const gradientId = `rcc-bulb-head-${tint}`;

  return (
    <svg
      viewBox="0 0 240 236"
      className={className}
      overflow="visible"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.top} />
          <stop offset="1" stopColor={colors.bottom} />
        </linearGradient>
        <clipPath id="rcc-bulb-head-clip">
          <path d={HEAD} />
        </clipPath>
      </defs>

      {/* feet peeking out under the screw */}
      <ellipse cx="100" cy="220" rx="17" ry="10" fill={colors.limb} stroke={colors.edge} strokeWidth="2.5" />
      <ellipse cx="140" cy="220" rx="17" ry="10" fill={colors.limb} stroke={colors.edge} strokeWidth="2.5" />

      {/* screw body */}
      {BANDS.map(({ x, y, width }) => (
        <rect key={y} x={x} y={y} width={width} height="18" rx="9" fill={SCREW} stroke={SCREW_EDGE} strokeWidth="2.5" />
      ))}

      {/* head with the white face cut to its outline */}
      <path d={HEAD} fill={`url(#${gradientId})`} />
      <g clipPath="url(#rcc-bulb-head-clip)">
        <ellipse cx="120" cy="118" rx="64" ry="36" fill="#ffffff" />
      </g>

      {/* face */}
      <Eyes mood={mood} />
      <ellipse cx="75" cy="130" rx="10" ry="5.5" fill={CHEEK} />
      <ellipse cx="165" cy="130" rx="10" ry="5.5" fill={CHEEK} />

      {mood === 'lost' &&
        QUESTION_PIXELS.map(([col, row]) => (
          <rect key={`${col}-${row}`} x={172 + col * 8} y={8 + row * 8} width="8" height="8" fill={MAGENTA} />
        ))}

      {/* stubby arms sticking out from the neck; the right one lifts from the shoulder to wave */}
      <Limb d="M78 164 Q 56 166, 38 156" fill={colors.limb} edge={colors.edge} />
      <g
        className="transition-transform duration-500 ease-cta group-hover/bot:-rotate-[40deg] motion-reduce:transition-none"
        style={{ transformOrigin: '162px 164px' }}
      >
        <Limb d="M162 164 Q 184 166, 202 156" fill={colors.limb} edge={colors.edge} />
      </g>
    </svg>
  );
}
