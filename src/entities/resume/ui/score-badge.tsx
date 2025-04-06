import { cn } from "@/shared/lib";

interface ScoreBadgeProps {
  score: number | null | undefined;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  if (score === null || score === undefined) {
    return <span className="text-muted-foreground">—</span>;
  }

  const getScoreVariant = (score: number) => {
    if (score >= 81) return "excellent";
    if (score >= 61) return "good";
    if (score >= 41) return "average";
    if (score >= 21) return "belowAverage";
    return "poor";
  };

  const variant = getScoreVariant(score);

  const variantClasses = {
    excellent: "bg-gradient-to-r from-emerald-400 to-teal-500 text-stone-50",
    good: "bg-gradient-to-r from-green-400 to-emerald-500 text-stone-50",
    average: "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-50",
    belowAverage: "bg-gradient-to-r from-orange-400 to-amber-500 text-stone-50",
    poor: "bg-gradient-to-r from-red-400 to-rose-500 text-stone-50",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold cursor-pointer",
        variantClasses[variant],
        className,
      )}
    >
      {score}
    </div>
  );
}
