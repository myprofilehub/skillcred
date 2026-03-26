'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Video, Loader2, ExternalLink } from 'lucide-react';

const AI_ENGINE_URL = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001/ai-engine" : "http://localhost:3001/ai-engine";

export default function CreativeGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');

  useEffect(() => {
    fetch(`${AI_ENGINE_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setItems(data.items);
      })
      .catch(err => console.error("Gallery Sync Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Creative Gallery</h2>
        <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg border border-cyan-500/10">
          {['all', 'video', 'image'].map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === t 
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-cyan-500 w-8 h-8" />
          <p className="text-slate-400 text-sm animate-pulse">Syncing with AI Engine...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={item.id} 
                className="bg-slate-950 rounded-xl overflow-hidden border border-cyan-500/10 group hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
              >
                <div className="aspect-video relative bg-black overflow-hidden">
                  {item.type === 'video' ? (
                    <video 
                      src={item.videoUrl} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      preload="metadata"
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      muted
                      loop
                    />
                  ) : (
                    <img 
                      src={item.imageUrl} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={item.prompt || "AI Generated"}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <p className="text-xs text-slate-300 line-clamp-2 italic">"{item.prompt}"</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center border-t border-cyan-500/10">
                  <div className="flex items-center gap-2">
                    {item.type === 'video' ? <Video size={14} className="text-cyan-400" /> : <ImageIcon size={14} className="text-cyan-400" />}
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{item.type}</span>
                  </div>
                  <a 
                    href={item.videoUrl || item.imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-200"
                  >
                     <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-900/20 rounded-2xl border border-dashed border-cyan-500/20">
              <p className="text-slate-500">No items found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
