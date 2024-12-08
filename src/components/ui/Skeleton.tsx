import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded';
}

export function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        {
          'rounded-md': variant === 'default',
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rounded',
        },
        className
      )}
      {...props}
    />
  );
}
