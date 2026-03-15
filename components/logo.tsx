import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function Logo({ className, width = 140, height = 40 }: LogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            <Image
                src="/logo-v3-transparent.png"
                alt="SkillCred Logo"
                width={width}
                height={height}
                className="object-contain" 
                priority 
            />
        </Link>
    );
}

// Also export a text-free version if needed, but for now we replace text with this.
