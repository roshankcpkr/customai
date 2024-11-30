import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return <ol className={cn("space-y-4", className)}>{children}</ol>;
}

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <li className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </li>
  );
}
