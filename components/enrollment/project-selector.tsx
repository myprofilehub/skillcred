'use client';

import { useState, useEffect } from 'react';
import { getStreams } from '@/app/actions/enrollment';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function ProjectSelector({ onSelect, loading }: { onSelect: (trackSlug: string, projectId: string, projectName: string) => void, loading: boolean }) {
    const [streams, setStreams] = useState<any[]>([]);
    const [fetchingStreams, setFetchingStreams] = useState(true);

    useEffect(() => {
        async function fetchStreams() {
            try {
                const data = await getStreams();
                setStreams(data);
            } catch (e) {
                console.error(e);
            } finally {
                setFetchingStreams(false);
            }
        }
        fetchStreams();
    }, []);

    const handleTrackSelect = (track: any) => {
        // Just trigger selection with empty project to let backend auto-assign first project
        onSelect(track.slug, "", track.title);
    };

    if (fetchingStreams) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-purple-400" /></div>;

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest">1. Choose your Stream</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {streams.map((track) => (
                        <div
                            key={track.id}
                            onClick={() => !loading && handleTrackSelect(track)}
                            className={cn(
                                "cursor-pointer p-4 rounded-lg border transition-all text-center hover:bg-slate-800",
                                loading ? "opacity-50 pointer-events-none" : "",
                                "bg-slate-900 border-slate-700 text-slate-400"
                            )}
                        >
                            <div className="font-semibold">{track.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center pt-4"
                >
                    <Loader2 className="animate-spin text-purple-400" />
                </motion.div>
            )}
        </div>
    );
}
