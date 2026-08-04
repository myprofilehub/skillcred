import Link from "next/link";
import Image from "next/image";

export function LpNavbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-center">
                <Link href="/" className="flex items-center group">
                    <Image 
                        src="/logo.png"
                        alt="SkillCred Logo"
                        width={180}
                        height={40}
                        className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </Link>
            </div>
        </header>
    );
}
