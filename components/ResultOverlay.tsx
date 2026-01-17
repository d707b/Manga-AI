import React from 'react';
import { X, Download, Share2 } from 'lucide-react';

interface Props {
  imageUrl: string | null;
  onClose: () => void;
}

export const ResultOverlay: React.FC<Props> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#131316] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#18181b]">
          <h3 className="text-white font-medium">النتيجة</h3>
          <div className="flex gap-2">
             <a href={imageUrl} download="generated-image.png" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition">
                <Download size={18} />
             </a>
             <button onClick={onClose} className="p-2 bg-zinc-800 hover:bg-red-900/50 hover:text-red-400 rounded-full text-white transition">
                <X size={18} />
             </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          <img 
            src={imageUrl} 
            alt="Generated Result" 
            className="max-w-full max-h-[70vh] rounded-lg shadow-2xl object-contain border border-white/5"
          />
        </div>

      </div>
    </div>
  );
};