
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || change !== undefined) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {change !== undefined && (
              <span
                className={cn(
                  "mr-1 rounded-sm px-1 py-0.5 text-xs font-medium",
                  change > 0
                    ? "bg-green-100 text-green-800"
                    : change < 0
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
