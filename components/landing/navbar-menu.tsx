"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Code2,
    BrainCircuit,
    Database,
    Shield,
    Cloud,
    Cpu,
    Layout,
    Building2,
    Search,
    Swords,
    Lightbulb,
    FileText,
    User,
    Handshake,
    GraduationCap,
} from "lucide-react"

const programsData = [
    {
        title: "Product Engineering",
        href: "/programs/product-engineering",
        duration: "8–10 Weeks",
        color: "purple",
        icon: BrainCircuit,
        streams: [
            { title: "Full Stack Development", href: "/streams/full-stack-development", icon: Code2 },
            { title: "AI & ML Engineering", href: "/streams/ai-ml", icon: BrainCircuit },
            { title: "Mobile Development", href: "/streams/mobile-development", icon: Layout },
        ]
    },
    {
        title: "Data & Platform Engineering",
        href: "/programs/data-and-platform-engineering",
        duration: "5–6 Weeks",
        color: "blue",
        icon: Database,
        streams: [
            { title: "DevOps & Cloud", href: "/streams/devops-cloud", icon: Cloud },
            { title: "Data Engineering", href: "/streams/data-engineering", icon: Database },
            { title: "Data Science & Analytics", href: "/streams/data-science", icon: Search },
        ]
    },
    {
        title: "Embedded & Security Engineering",
        href: "/programs/embedded-and-security-engineering",
        duration: "4–5 Weeks",
        color: "green",
        icon: Cpu,
        streams: [
            { title: "Cybersecurity", href: "/streams/cybersecurity", icon: Shield },
            { title: "IoT & Embedded", href: "/streams/iot-embedded", icon: Cpu },
        ]
    },
]

const insightItems = [
    { title: "Hiring Trends Report - 2026", href: "/hr-insights", icon: FileText, color: "text-indigo-400", description: "Hiring insights from 100+ tech companies." },
    { title: "Founder's Story", href: "/founders-story", icon: User, color: "text-amber-400", description: "Why SkillCred exists — in the founder's own words." },
]

const partnerItems = [
    { title: "Institutions", href: "/institutions", icon: Building2, color: "text-violet-400", description: "Run live project cohorts and PAT defenses on your campus." },
]

const colorMap: Record<string, string> = {
    purple: "text-purple-400",
    blue: "text-blue-400",
    green: "text-green-400",
}

const bgColorMap: Record<string, string> = {
    purple: "bg-purple-500/10",
    blue: "bg-blue-500/10",
    green: "bg-green-500/10",
}

const borderColorMap: Record<string, string> = {
    purple: "border-purple-500/20",
    blue: "border-blue-500/20",
    green: "border-green-500/20",
}


export function LandingMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList suppressHydrationWarning className="gap-2">

                {/* 1. PROGRAMS — MEGA MENU */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <GraduationCap className="h-4 w-4 text-indigo-400 mr-1.5" />
                        Programs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[700px] grid-cols-3 gap-0 p-0">
                            {programsData.map((program) => (
                                <div 
                                    key={program.title}
                                    className={cn(
                                        "p-4 border-r last:border-r-0 border-border",
                                    )}
                                >
                                    {/* Program Header */}
                                    <Link 
                                        href={program.href}
                                        className="group block mb-3"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <program.icon className={cn("h-4 w-4", colorMap[program.color])} />
                                            <span className="text-sm font-bold text-foreground group-hover:underline">
                                                {program.title}
                                            </span>
                                        </div>
                                        <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", bgColorMap[program.color], colorMap[program.color])}>
                                            {program.duration}
                                        </span>
                                    </Link>

                                    {/* Divider */}
                                    <div className={cn("h-px mb-3", borderColorMap[program.color])} style={{ backgroundColor: `var(--border)` }} />

                                    {/* Streams */}
                                    <ul className="space-y-1">
                                        {program.streams.map((stream) => (
                                            <li key={stream.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={stream.href}
                                                        className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                                    >
                                                        <stream.icon className={cn("h-3.5 w-3.5", colorMap[program.color])} />
                                                        {stream.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 2. CODE ARENA */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/code-arena" className={cn(navigationMenuTriggerStyle(), "gap-1.5")}>
                            <Swords className="h-4 w-4 text-orange-400" />
                            Code Arena
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 3. INSIGHTS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Lightbulb className="h-4 w-4 text-amber-400 mr-1.5" />
                        Insights
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-2 p-2">
                            {insightItems.map((item) => (
                                <li key={item.title}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        >
                                            <div className="flex items-center gap-2 text-sm font-semibold leading-none text-foreground">
                                                <item.icon className={cn("h-4 w-4", item.color)} />
                                                {item.title}
                                            </div>
                                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5 ml-6">
                                                {item.description}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 4. PARTNER WITH US */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Handshake className="h-4 w-4 text-violet-400 mr-1.5" />
                        Partner with Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-2 p-2">
                            {partnerItems.map((item) => (
                                <li key={item.title}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        >
                                            <div className="flex items-center gap-2 text-sm font-semibold leading-none text-foreground">
                                                <item.icon className={cn("h-4 w-4", item.color)} />
                                                {item.title}
                                            </div>
                                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5 ml-6">
                                                {item.description}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
}
