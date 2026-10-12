/** Sticky row of team links under the header so long rosters are easy to navigate. */
export default function TeamJumpBar({ teams }: { teams: { id: string; name: string; count: number }[] }) {
  return (
    <nav
      aria-label="Jump to a team"
      className="sticky top-14 z-40 border-b border-foreground/10 bg-background/85 backdrop-blur-md sm:top-16"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] sm:px-10">
        {teams.map((team) => (
          <li key={team.id} className="shrink-0">
            <a
              href={`#${team.id}`}
              className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {team.name}
              <span className="font-mono text-xs text-muted-foreground">{team.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
