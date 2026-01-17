import React from 'react';
import { ImageStyle } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  selected: ImageStyle;
  onChange: (style: ImageStyle) => void;
}

export const StyleSelector: React.FC<Props> = ({ selected, onChange }) => {
  const styles = Object.values(ImageStyle);

  return (
    <div className="bg-[#131316] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-zinc-400 text-sm font-medium">النمط</h3>
        <span className="text-zinc-600"><Sparkles size={14}/></span>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-end">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => onChange(style)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
              selected === style
                ? 'bg-white text-black border-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                : 'bg-[#1c1c1f] text-zinc-400 border-transparent hover:bg-[#27272a] hover:text-zinc-200'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};