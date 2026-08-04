import Image from "next/image";
import Link from "next/link";
import { Terminal } from "lucide-react";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function Logo({ className, width = 140, height = 40 }: LogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-1.5 ${className}`}>
            <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                {/* Top Orange Triangle */}
                <polygon points="0,12 12,0 24,12" className="fill-orange-500" />
                {/* Bottom Indigo Triangle */}
                <polygon points="0,12 24,12 12,24" className="fill-indigo-600" />
                {/* White Keyhole Cutout */}
                <circle cx="12" cy="10" r="2.5" className="fill-white dark:fill-slate-950" />
                <rect x="10.75" y="11" width="2.5" height="7" rx="1.25" className="fill-white dark:fill-slate-950" />
            </svg>
            <div className="flex items-center gap-0.5 ml-0.5">
                <span className="text-2xl font-black tracking-tighter text-black dark:text-white">Skill</span>
                <span className="text-2xl font-black tracking-tighter text-indigo-600">Cred</span>
            </div>
        </Link>
    );
}
