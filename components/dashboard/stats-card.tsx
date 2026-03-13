import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    trend?: string;
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
    return (
        <Card className="border-white/10 glass-card bg-white/5 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
                {trend && (
                    <div className="text-xs text-emerald-500 mt-2 font-medium">
                        {trend}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
