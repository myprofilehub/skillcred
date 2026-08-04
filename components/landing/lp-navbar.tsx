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
                        width={200}
                        height={56}
                        className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </Link>
            </div>
        </header>
    );
}
