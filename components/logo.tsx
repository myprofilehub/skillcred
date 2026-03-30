import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
    variant?: 'light' | 'dark';
}

export function Logo({ className, width = 140, height = 40, variant = 'light' }: LogoProps) {
    const skillColor = variant === 'dark' ? 'text-black' : 'text-white';
    
    return (
        <Link href="/" className={`flex items-center gap-0.5 ${className}`}>
            <span className={`text-2xl font-black tracking-tighter ${skillColor}`}>Skill</span>
            <span className="text-2xl font-black tracking-tighter text-cyan-500">Cred</span>
        </Link>
    );
}

// Also export a text-free version if needed, but for now we replace text with this.
