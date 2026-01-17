import React, { useState } from 'react';
import { Book, MapPin, User, Sparkles, Film, Loader2, Wand2 } from 'lucide-react';
import { AspectRatio, ImageStyle } from '../types';
import { generateImage } from '../services/geminiService';
import { ResultOverlay } from './ResultOverlay';

interface Props {
  onImageGenerated: (url: string, prompt: string, type: 'story', aspectRatio: AspectRatio) => void;
  isAutoSaveEnabled: boolean;
}

export const StoryMode: React.FC<Props> = ({ onImageGenerated, isAutoSaveEnabled }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [setting, setSetting] = useState('');
  const [character, setCharacter] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.CINEMATIC);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.LANDSCAPE);
  const [scenePrompt, setScenePrompt] = useState('');
  const [quality, setQuality] = useState<'standard' | 'high'>('high');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const ratios = [
    { value: AspectRatio.FOUR_FIVE, label: '4:5' },
    { value: AspectRatio.LANDSCAPE, label: '16:9' },
    { value: AspectRatio.PORTRAIT, label: '9:16' },
    { value: AspectRatio.SQUARE, label: '1:1' },
  ];

  const styles = Object.values(ImageStyle);

  const handleGenerate = async () => {
    if (!scenePrompt.trim()) return;

    setIsGenerating(true);
    try {
      // Construct a unified prompt for story consistency
      const fullPrompt = `
        Story Title: ${storyTitle}
        Character Description: ${character}
        Setting/Environment: ${setting}
        Scene Action: ${scenePrompt}
        
        Create a consistent scene matching the character and setting described above.
      `.trim();

      const url = await generateImage(fullPrompt, style, aspectRatio, quality);
      setResultImage(url);
      onImageGenerated(url, `[${storyTitle || 'قصة'}] ${scenePrompt}`, 'story', aspectRatio);
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء المشهد. يرجى التأكد من وصف المشهد.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header Text */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold text-white mb-2">قصة</h1>
        <p className="text-zinc-500">أنشئ سردًا مرئيًا بشخصيات متسقة</p>
      </div>

      {/* Story Title */}
      <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 relative group focus-within:border-white/20 transition-colors">
        <div className="flex items-center gap-3 mb-2">
           <Book size={16} className="text-zinc-400" />
           <span className="text-sm font-medium text-zinc-300">عنوان القصة</span>
        </div>
        <input 
          type="text" 
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="أعط قصتك اسمًا..."
          className="w-full bg-transparent text-2xl font-bold placeholder:text-zinc-700 focus:outline-none text-white"
        />
      </div>

      {/* Context: Setting & Character */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Setting */}
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 flex flex-col h-64 focus-within:border-white/20 transition-colors">
          <div className="flex justify-between items-center mb-3">
             <span className="text-sm font-medium text-zinc-300">الإعداد والبيئة</span>
             <div className="p-1.5 bg-green-900/20 rounded-full text-green-500">
                <MapPin size={14} />
             </div>
          </div>
          <textarea 
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            className="flex-1 bg-transparent resize-none focus:outline-none text-zinc-300 placeholder:text-zinc-600 text-sm leading-relaxed"
            placeholder="صف الموقع، الإضاءة، الوقت من اليوم، الطقس، والجو العام..."
          />
          <p className="text-xs text-zinc-600 mt-2">
            سيبقى هذا الإعداد ثابتًا عبر جميع المشاهد. فقط حركات شخصيتك ستتغير.
          </p>
        </div>

        {/* Character */}
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 flex flex-col h-64 focus-within:border-white/20 transition-colors">
          <div className="flex justify-between items-center mb-3">
             <span className="text-sm font-medium text-zinc-300">وصف الشخصية</span>
             <div className="p-1.5 bg-blue-900/20 rounded-full text-blue-500">
                <User size={14} />
             </div>
          </div>
          <textarea 
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className="flex-1 bg-transparent resize-none focus:outline-none text-zinc-300 placeholder:text-zinc-600 text-sm leading-relaxed"
            placeholder="صف شخصيتك الرئيسية بالتفصيل (المظهر، الملابس، الشعر، الملامح)..."
          />
          <p className="text-xs text-zinc-600 mt-2">
            كن محددًا! كلما قدمت تفاصيل أكثر، ظهرت شخصيتك بشكل أكثر اتساقًا عبر المشاهد.
          </p>
        </div>
      </div>

      {/* Style Section */}
      <div className="bg-[#131316] border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-zinc-300">النمط</span>
            <div className="p-1.5 bg-purple-900/20 rounded-full text-purple-500">
              <Sparkles size={14} />
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            {/* Aspect Ratio */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
               <span className="text-xs text-zinc-500">نسبة العرض</span>
               <div className="flex gap-2">
                  {ratios.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setAspectRatio(r.value)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center text-xs font-bold font-sans transition-all ${
                        aspectRatio === r.value 
                        ? 'bg-zinc-200 text-black border-transparent' 
                        : 'bg-[#1c1c1f] text-zinc-500 border-white/5 hover:border-zinc-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* Styles */}
            <div className="flex flex-col gap-2 w-full md:w-auto items-start md:items-end">
               <span className="text-xs text-zinc-500">النمط</span>
               <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                  {styles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                        style === s 
                        ? 'bg-white text-black border-transparent' 
                        : 'bg-[#1c1c1f] text-zinc-500 border-white/5 hover:bg-[#27272a]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
        </div>
      </div>

      {/* Scenes Section */}
      <div className="mt-4">
        <div className="flex justify-between items-end mb-4 px-2">
          <div className="flex items-center gap-2 text-zinc-200">
             <h3 className="font-bold">المشاهد</h3>
             <Film size={16} className="text-orange-500" />
          </div>
          <span className="text-xs font-mono text-zinc-600">2 / 0</span>
        </div>

        {/* Scene 1 */}
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-1 relative overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
             <div className="w-8 h-8 bg-[#1c1c1f] rounded-lg border border-white/10 flex items-center justify-center text-zinc-400 font-mono text-sm">
                1
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 items-stretch">
             {/* Scene Input */}
             <div className="flex-1 min-h-[120px]">
                <textarea 
                  value={scenePrompt}
                  onChange={(e) => setScenePrompt(e.target.value)}
                  placeholder="صف ما يحدث في هذا المشهد..."
                  className="w-full h-full bg-transparent resize-none focus:outline-none text-zinc-200 placeholder:text-zinc-600 text-lg mt-1"
                />
             </div>

             {/* Actions */}
             <div className="flex md:flex-col justify-between gap-4 border-t md:border-t-0 md:border-r border-white/5 pt-4 md:pt-0 md:pr-4">
                 <div className="flex gap-1 bg-[#1c1c1f] p-1 rounded-lg self-start">
                    <button 
                      onClick={() => setQuality('standard')}
                      className={`px-3 py-1.5 rounded text-xs transition ${quality === 'standard' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      عادي
                    </button>
                    <button 
                       onClick={() => setQuality('high')}
                       className={`px-3 py-1.5 rounded text-xs transition ${quality === 'high' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      عالي
                    </button>
                 </div>

                 <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !scenePrompt.trim()}
                    className={`
                        flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-bold transition-all w-full md:w-auto whitespace-nowrap
                        ${isGenerating 
                            ? 'bg-zinc-800 cursor-not-allowed text-zinc-500' 
                            : 'bg-zinc-200 hover:bg-white text-black'
                        }
                    `}
                >
                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                    <span>{isGenerating ? 'جاري الإنشاء' : 'إنشاء المشهد'}</span>
                </button>
             </div>
          </div>
        </div>
      </div>

      <ResultOverlay imageUrl={resultImage} onClose={() => setResultImage(null)} />
    </div>
  );
};