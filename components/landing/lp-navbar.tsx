import Link from "next/link";
import Image from "next/image";

export function LpNavbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Image 
                            src="/icon.svg"
                            alt="SkillCred Icon"
                            width={24}
                            height={24}
                            className="text-primary"
                        />
                    </div>
                    <span className="font-bold text-xl font-heading tracking-tight">
                        SkillCred
                    </span>
                </Link>
            </div>
        </header>
    );
}
