import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Bell,
    Search,
    School
} from "lucide-react";
import { Input } from "@/components/ui/input";

export async function DashboardHeader() {
    const session = await auth();
    const name = session?.user?.name || "Mentor";

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, {name}</h1>
                <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your classrooms today.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search students, courses..."
                        className="pl-8 bg-background"
                    />
                </div>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
                </Button>
                <Avatar>
                    <AvatarImage src={session?.user?.image || ""} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
