'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AnnouncementBar() {
    return (
        <div className="sticky top-0 z-[60] w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-2.5 text-white overflow-hidden group shadow-[0_10px_30px_rgba(168,85,247,0.3)]">
            {/* Animated subtle light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] -translate-x-[100%] group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out" />
            
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold relative z-10 text-center px-4">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <Link 
                    href="/batch/enroll" 
                    className="tracking-tight sm:tracking-normal hover:text-amber-200 transition-colors flex items-center gap-2"
                >
                    <span className="hidden sm:inline">Join our 4-Week Accelerated Batch:</span>
                    <span className="bg-white text-purple-600 px-2 py-0.5 rounded text-[10px] sm:text-xs font-black uppercase tracking-tighter shadow-sm self-center">
                        Limited Launch offer at 40% discount
                    </span>
                    <ArrowRight className="inline-block w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
            </div>
        </div>
    );
}
