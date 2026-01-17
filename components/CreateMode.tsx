import React, { useState } from 'react';
import { AspectRatioSelector } from './AspectRatioSelector';
import { StyleSelector } from './StyleSelector';
import { AspectRatio, ImageStyle } from '../types';
import { generateImage } from '../services/geminiService';
import { Wand2, Loader2, Sparkles, Layers, Zap } from 'lucide-react';
import { ResultOverlay } from './ResultOverlay';

const SUGGESTIONS = [
  "غابة سحرية عند الفجر",
  "شارع مدينة سايبربانك",
  "حديقة يابانية هادئة",
  "فن هندسي تجريدي"
];

interface Props {
  onImageGenerated: (url: string, prompt: string, type: 'create', aspectRatio: AspectRatio) => void;
  isAutoSaveEnabled: boolean;
}

export const CreateMode: React.FC<Props> = ({ onImageGenerated, isAutoSaveEnabled }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.REALISTIC);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const url = await generateImage(prompt, style, aspectRatio, quality);
      setResultImage(url);
      onImageGenerated(url, prompt, 'create', aspectRatio);
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setPrompt(text);
  };

  const handleComingSoon = () => {
    alert("هذه الميزة قادمة قريباً!");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Hero Text */}
      <div className="text-center space-y-2 mt-4">
        <div className="inline-flex items-center gap-2 bg-[#1c1c1f] px-3 py-1 rounded-full text-xs text-zinc-400 border border-white/5 mb-2">
          <Sparkles size={12} className="text-indigo-400" />
          <span>إنشاء بالذكاء الاصطناعي</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent pb-2">
          إنشاء
        </h1>
        <p className="text-zinc-500 text-lg">حول أفكارك إلى صور مذهلة</p>
      </div>

      {/* Input Section */}
      <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-[#131316] rounded-[2rem] p-1 border border-white/10">
              <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="صف ما تريد تخيله..."
                  className="w-full h-48 bg-transparent text-lg p-6 resize-none focus:outline-none placeholder:text-zinc-600 text-white"
                  dir="rtl"
              />
              
              {/* Bottom Controls Bar inside Input */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0f0f12] rounded-[1.7rem] mx-2 mb-2 border border-white/5">
                  
                  {/* Left side: Create Button & Char count */}
                  <div className="flex items-center gap-4">
                      <button
                          onClick={handleGenerate}
                          disabled={isGenerating || !prompt.trim()}
                          className={`
                              flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                              ${isGenerating 
                                  ? 'bg-zinc-700 cursor-not-allowed text-zinc-400' 
                                  : 'bg-zinc-200 hover:bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                              }
                          `}
                      >
                          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                          <span>{isGenerating ? 'جاري الإنشاء...' : 'إنشاء'}</span>
                      </button>
                      <span className="text-zinc-600 text-sm hidden sm:block">
                          {prompt.length} حرف
                      </span>
                  </div>

                  {/* Right side: Toggles */}
                  <div className="flex items-center gap-3">
                      {/* Quality Toggle */}
                      <div className="flex items-center bg-[#1c1c1f] rounded-lg p-1 border border-white/5">
                          <button 
                              onClick={() => setQuality('standard')}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${quality === 'standard' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                              عادي
                          </button>
                          <button 
                              onClick={() => setQuality('high')}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${quality === 'high' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                              عالي
                          </button>
                      </div>

                       {/* Mock Multi-shot Toggle */}
                      <button onClick={handleComingSoon} className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1f] hover:bg-[#252529] rounded-lg border border-white/5 text-zinc-500 transition" title="قريبا">
                          <Layers size={14} />
                          <span className="text-xs">لقطات متعددة</span>
                          <div className="w-8 h-4 bg-zinc-800 rounded-full relative">
                              <div className="w-3 h-3 bg-zinc-600 rounded-full absolute top-0.5 left-0.5"></div>
                          </div>
                      </button>

                       {/* Mock Auto Enhance */}
                       <button onClick={handleComingSoon} className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1f] rounded-lg border border-white/5 text-zinc-500 cursor-pointer hover:text-zinc-300 hover:bg-[#252529] transition">
                          <span className="text-xs">تحسين تلقائي</span>
                          <Zap size={14} />
                      </button>
                  </div>

              </div>
          </div>
      </div>

      {/* Configuration Panels */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
              <AspectRatioSelector selected={aspectRatio} onChange={setAspectRatio} />
          </div>
          <div className="md:col-span-7">
              <StyleSelector selected={style} onChange={setStyle} />
          </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
          {SUGGESTIONS.map((suggestion) => (
              <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1f] hover:bg-[#27272a] border border-white/5 rounded-full text-zinc-400 hover:text-white text-xs transition duration-200"
              >
                  <Sparkles size={12} />
                  <span>{suggestion}</span>
              </button>
          ))}
      </div>

      <ResultOverlay imageUrl={resultImage} onClose={() => setResultImage(null)} />
    </div>
  );
};