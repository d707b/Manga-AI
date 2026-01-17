import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Download } from 'lucide-react';
import { Tab, SavedImage } from '../types';
import { ResultOverlay } from './ResultOverlay';

interface Props {
  images: SavedImage[];
  onTabChange: (tab: Tab) => void;
  onDeleteImage: (id: string) => void;
}

export const GalleryMode: React.FC<Props> = ({ images, onTabChange, onDeleteImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 animate-in fade-in duration-500 flex-1">
       {/* Header */}
      <div className="text-center mt-8 mb-4">
        <h1 className="text-3xl font-bold mb-2">المعرض</h1>
        <p className="text-zinc-500 text-sm">صورك المحفوظة ({images.length})</p>
      </div>

      {/* Content */}
      {images.length === 0 ? (
        /* Empty State Card */
        <div className="flex-1 flex items-start justify-center">
          <div className="bg-[#131316] border border-white/5 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center max-w-lg w-full h-[400px] shadow-2xl">
              
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-zinc-700/50 flex items-center justify-center mb-6 bg-zinc-900/30 text-zinc-600">
                  <ImageIcon size={40} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">لا توجد صور بعد</h3>
              <p className="text-zinc-500 mb-8 text-sm">ابدأ بالإنشاء لرؤية صورك هنا</p>

              <button 
                  onClick={() => onTabChange('create')}
                  className="flex items-center gap-2 px-8 py-3 bg-zinc-200 hover:bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              >
                  <span>ابدأ الإنشاء</span>
                  <Plus size={18} />
              </button>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
           {images.map((img) => (
             <div key={img.id} className="group relative aspect-square bg-[#131316] rounded-xl overflow-hidden border border-white/5">
                <img 
                  src={img.url} 
                  alt={img.prompt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                   <p className="text-white text-xs line-clamp-2 mb-3">{img.prompt}</p>
                   <div className="flex items-center justify-between gap-2">
                      <button 
                        onClick={() => setSelectedImage(img.url)}
                        className="flex-1 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition"
                      >
                        عرض
                      </button>
                      <button 
                        onClick={() => onDeleteImage(img.id)}
                        className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={14} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}

      <ResultOverlay imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};