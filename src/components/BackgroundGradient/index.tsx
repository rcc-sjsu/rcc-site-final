import { cn } from "@/lib/utils"

type BackgroundGradientProps = {
  className?: string;
  color: "purple" | "blue";
}

export default function BackgroundGradient({ className, color }: BackgroundGradientProps) {
  const colorClassName = color === "blue" ? "bg-brand-pale-blue opacity-100" : "bg-brand-pale-purple opacity-60";

  return (
    <div aria-hidden="true" className={cn("pointer-events-none z-[-1] flex", className)}>
      <div className={cn("size-full rounded-full blur-[6rem]", colorClassName)} />
    </div>
  );
}
