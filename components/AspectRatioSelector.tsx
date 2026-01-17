import React from 'react';
import { AspectRatio } from '../types';
import { Smartphone, Monitor, Square, RectangleVertical } from 'lucide-react';

interface Props {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

export const AspectRatioSelector: React.FC<Props> = ({ selected, onChange }) => {
  const ratios = [
    { value: AspectRatio.FOUR_FIVE, label: '4:5', icon: <div className="w-3 h-4 border-2 border-current rounded-sm" /> },
    { value: AspectRatio.LANDSCAPE, label: '16:9', icon: <div className="w-5 h-3 border-2 border-current rounded-sm" /> },
    { value: AspectRatio.PORTRAIT, label: '9:16', icon: <div className="w-3 h-5 border-2 border-current rounded-sm" /> },
    { value: AspectRatio.SQUARE, label: '1:1', icon: <div className="w-4 h-4 border-2 border-current rounded-sm" /> },
  ];

  return (
    <div className="bg-[#131316] rounded-2xl p-4 border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-zinc-400 text-sm font-medium">نسبة العرض</h3>
        <span className="text-zinc-600"><LayoutIcon size={14}/></span>
      </div>
      
      <div className="flex gap-2 justify-between">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => onChange(ratio.value)}
            className={`flex flex-col items-center justify-center gap-2 w-full h-20 rounded-xl border transition-all duration-200 ${
              selected === ratio.value
                ? 'bg-zinc-200 text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'bg-[#1c1c1f] text-zinc-500 border-transparent hover:bg-[#27272a] hover:text-zinc-300'
            }`}
          >
            {ratio.icon}
            <span className="text-xs font-bold font-sans dir-ltr">{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const LayoutIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
);