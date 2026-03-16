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
    Coffee,
    Shield,
    Cloud,
    Cpu,
    Layout,
    GraduationCap,
    Users,
    Building2,
    Landmark,
    Briefcase,
    Search,
    Calendar,
    Award
} from "lucide-react"

const programItems = [
    { title: "Full stack development", href: "/streams/full-stack-development", icon: Code2, color: "text-purple-400" },
    { title: "AI & ML", href: "/streams/ai-ml", icon: BrainCircuit, color: "text-blue-400" },
    { title: "Cybersecurity", href: "/streams/cybersecurity", icon: Shield, color: "text-green-400" },
    { title: "Data Engineering", href: "/streams/data-engineering", icon: Database, color: "text-yellow-400" },
    { title: "Devops & Cloud", href: "/streams/devops-cloud", icon: Cloud, color: "text-cyan-400" },
    { title: "Mobile Development", href: "/streams/mobile-development", icon: Layout, color: "text-orange-400" },
    { title: "IoT and Embedded", href: "/streams/iot-embedded", icon: Cpu, color: "text-red-400" },
    { title: "Data Science & Analytics", href: "/streams/data-science", icon: Search, color: "text-indigo-400" },
]

const howItWorksItems = [
    { title: "For Students", href: "/how-it-works/students", icon: GraduationCap },
    { title: "For HR", href: "/how-it-works/hr", icon: Briefcase },
    { title: "For Investors", href: "/how-it-works/investors", icon: Building2 },
]

const patItems = [
    { title: "What is PAT?", href: "/pat/about", icon: Shield },
    { title: "Certification Process", href: "/pat/process", icon: Award },
    { title: "Evaluate Skills", href: "/pat/evaluate", icon: BrainCircuit },
]


export function LandingMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>

                {/* 1. PROGRAMS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {programItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                    iconColor={item.color}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 1.5 FREE LIBRARY */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/library" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold")}>
                            Free Library
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 2. HOW IT WORKS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2 p-2 md:w-[300px]">
                            {howItWorksItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 3. PAT */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>PAT</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[250px] gap-2 p-2">
                            {patItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 4. ABOUT US */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold")}>
                            About Us
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 5. CONTACT US */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold")}>
                            Contact Us
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: any, iconColor?: string }
>(({ className, title, children, icon: Icon, iconColor, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={props.href || "#"}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none text-white">
                        {Icon && <Icon className={cn("h-4 w-4", iconColor || "text-muted-foreground")} />}
                        {title}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
