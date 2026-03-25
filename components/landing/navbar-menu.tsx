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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger as DropdownTrigger,
} from "@/components/ui/dropdown-menu"
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
    BriefcaseBusiness as Briefcase,
    ChevronDown,
    Search,
    Calendar,
    Award
} from "lucide-react"

const syllabusItems = [
    { title: "Full stack development", href: "/streams/full-stack-development", icon: Code2, color: "text-purple-400" },
    { title: "AI & ML", href: "/streams/ai-ml", icon: BrainCircuit, color: "text-blue-400" },
    { title: "Cybersecurity", href: "/streams/cybersecurity", icon: Shield, color: "text-green-400" },
    { title: "Data Engineering", href: "/streams/data-engineering", icon: Database, color: "text-yellow-400" },
    { title: "Devops & Cloud", href: "/streams/devops-cloud", icon: Cloud, color: "text-cyan-400" },
    { title: "Mobile Development", href: "/streams/mobile-development", icon: Layout, color: "text-orange-400" },
    { title: "IoT and Embedded", href: "/streams/iot-embedded", icon: Cpu, color: "text-red-400" },
    { title: "Data Science & Analytics", href: "/streams/data-science", icon: Search, color: "text-indigo-400" },
]

const programItems = [
    { title: "Standard (8 Weeks)", href: "/programs/standard", icon: Calendar, color: "text-sky-400" },
    { title: "Fast Track (4 Weeks)", href: "/programs/fast-track", icon: Calendar, color: "text-amber-400" },
    { title: "Capstone Track (2 Weeks)", href: "/programs/capstone", icon: Award, color: "text-fuchsia-400" },
]

const patItems = [
    { title: "What is PAT?", href: "/pat/about", icon: Shield, color: "text-indigo-400" },
    { title: "Certification Process", href: "/pat/process", icon: Award, color: "text-emerald-400" },
    { title: "Evaluate Skills", href: "/pat/evaluate", icon: BrainCircuit, color: "text-rose-400" },
]


export function LandingMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList suppressHydrationWarning className="gap-2">

                {/* 1. PROGRAMS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[250px] gap-2 p-2">
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


                {/* 2. SYLLABUS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Syllabus</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {syllabusItems.map((item) => (
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
                                    iconColor={item.color}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 3.5. RESOURCES (dropdown) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-2 p-2">
                            <ListItem
                                title="Masterclass"
                                href="/library"
                                icon={GraduationCap}
                                iconColor="text-amber-400"
                            />
                            <ListItem
                                title="Blog"
                                href="/blog"
                                icon={Coffee}
                                iconColor="text-indigo-400"
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>



                {/* 4. CAREER */}
                <NavigationMenuItem className="relative group/career">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white font-bold outline-none cursor-pointer flex items-center")}>
                        Career <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 group-hover/career:rotate-180 transition-transform duration-200" />
                    </NavigationMenuLink>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/career:opacity-100 group-hover/career:visible transition-all duration-200 ease-in-out z-50">
                        <div className="w-[180px] bg-black/95 border border-white/10 rounded-md backdrop-blur-xl text-white p-1.5 shadow-2xl">
                            <Link href="/apply-mentor" className="flex items-center w-full gap-2.5 font-medium hover:bg-white/10 cursor-pointer p-2.5 rounded-sm transition-colors text-sm">
                                <Users className="h-4 w-4 text-emerald-400" />
                                Apply as Mentor
                            </Link>
                            <Link href="/contact" className="flex items-center w-full gap-2.5 font-medium hover:bg-white/10 cursor-pointer p-2.5 rounded-sm transition-colors text-sm">
                                <Coffee className="h-4 w-4 text-sky-400" />
                                Contact Us
                            </Link>
                        </div>
                    </div>
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
