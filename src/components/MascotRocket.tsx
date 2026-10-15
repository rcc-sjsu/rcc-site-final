import { RccBot } from '@/components/footer/RccBot';
import { cn } from '@/lib/utils';

/**
 * The lightbulb mascot surfing a little rocket through space (after the 2026 sticker). Bobs gently and the exhaust
 * flickers; both stop under reduced motion. Hovering a parent `group/bot` makes the mascot wave.
 */
export default function MascotRocket({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative aspect-[10/11] motion-safe:animate-[rocket-float_4s_ease-in-out_infinite]', className)}
    >
      {/* rocket, tilted to fly up and to the right */}
      <svg
        viewBox="0 0 200 300"
        aria-hidden
        className="absolute bottom-0 left-[30%] w-[52%] origin-center rotate-[38deg]"
        overflow="visible"
      >
        {/* exhaust */}
        <g className="origin-[100px_232px] motion-safe:animate-[rocket-flame_0.35s_ease-in-out_infinite_alternate]">
          <path d="M78 228 Q 100 312, 122 228 Q 112 250, 100 238 Q 88 250, 78 228 Z" fill="#f59a3a" />
          <path d="M88 230 Q 100 278, 112 230 Q 106 242, 100 236 Q 94 242, 88 230 Z" fill="#ffd27a" />
        </g>
        {/* fins */}
        <path d="M60 140 C 28 162, 16 214, 22 252 L 60 212 Z" fill="#2f3e54" />
        <path d="M140 140 C 172 162, 184 214, 178 252 L 140 212 Z" fill="#2f3e54" />
        {/* nozzle */}
        <rect x="74" y="210" width="52" height="20" rx="4" fill="#8a9aac" />
        {/* body */}
        <path d="M100 8 C 142 40, 152 110, 148 214 L 52 214 C 48 110, 58 40, 100 8 Z" fill="#4d6584" />
        <path d="M100 8 C 76 30, 62 80, 60 140 L 74 140 C 76 84, 86 40, 100 8 Z" fill="#6c86a6" />
        {/* nose cone */}
        <path d="M100 8 C 122 25, 136 48, 142 74 L 58 74 C 64 48, 78 25, 100 8 Z" fill="#9fb2c6" />
        {/* rivets */}
        {[96, 112, 128].map((y) => (
          <circle key={y} cx="134" cy={y} r="3" fill="#e9eef3" />
        ))}
        {/* porthole */}
        <circle cx="100" cy="132" r="26" fill="#e9eef3" stroke="#b58d68" strokeWidth="8" />
        <path d="M86 124 A 16 16 0 0 1 104 114" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        {/* base band */}
        <rect x="52" y="196" width="96" height="18" fill="#3c506b" />
      </svg>

      {/* the rider */}
      <RccBot
        mood="lost"
        label="RCC's mascot riding a rocket, looking lost"
        className="absolute top-[13%] left-[24%] w-[42%] -rotate-6"
      />
    </div>
  );
}
