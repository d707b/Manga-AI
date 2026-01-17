import React from 'react';
import { Sun, Moon, Globe, Sparkles, Trash2, HelpCircle, Shield } from 'lucide-react';
import { AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  onSettingsChange: (newSettings: React.SetStateAction<AppSettings>) => void;
  onClearHistory: () => void;
}

export const SettingsMode: React.FC<Props> = ({ settings, onSettingsChange, onClearHistory }) => {
  
  const updateSetting = (key: keyof AppSettings, value: any) => {
    onSettingsChange(prev => ({ ...prev, [key]: value }));
  };

  const handleSupport = (type: string) => {
    alert(`صفحة ${type} ستكون متاحة قريباً`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8 animate-in fade-in duration-500 flex-1">
      <h1 className="text-3xl font-bold text-center mb-8">
        {settings.language === 'en' ? 'Settings' : 'الإعدادات'}
      </h1>

      {/* Appearance */}
      <section>
        <h3 className="text-zinc-500 text-sm mb-2 text-right">
             {settings.language === 'en' ? 'Appearance' : 'المظهر'}
        </h3>
        <div className="bg-[#1c1c1f] p-1.5 rounded-xl flex border border-white/5">
             <button
               onClick={() => updateSetting('theme', 'light')}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${settings.theme === 'light' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <Sun size={18} />
                <span>{settings.language === 'en' ? 'Light' : 'فاتح'}</span>
             </button>
             <button
               onClick={() => updateSetting('theme', 'dark')}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${settings.theme === 'dark' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <Moon size={18} />
                <span>{settings.language === 'en' ? 'Dark' : 'داكن'}</span>
             </button>
        </div>
      </section>

      {/* Language */}
      <section>
        <h3 className="text-zinc-500 text-sm mb-2 text-right">
            {settings.language === 'en' ? 'Language' : 'اللغة'}
        </h3>
        <div className="bg-[#1c1c1f] p-1.5 rounded-xl flex border border-white/5">
             <button
               onClick={() => updateSetting('language', 'en')}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${settings.language === 'en' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <span>English</span>
                <Globe size={18} />
             </button>
             <button
               onClick={() => updateSetting('language', 'ar')}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${settings.language === 'ar' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
                <span>العربية</span>
                <Globe size={18} />
             </button>
        </div>
      </section>

      {/* Preferences */}
      <section>
        <h3 className="text-zinc-500 text-xs font-bold mb-3 text-right uppercase tracking-wider px-1">PREFERENCES</h3>
        <div className="bg-[#1c1c1f] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-5 flex items-center justify-between group cursor-pointer" onClick={() => updateSetting('autoSave', !settings.autoSave)}>
                {/* Right Side: Icon & Text */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 border border-white/5">
                       <Sparkles size={18} />
                    </div>
                    <div className="text-right">
                         <div className={`font-medium mb-0.5 ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>
                             {settings.language === 'en' ? 'Auto-save to Gallery' : 'حفظ تلقائي في المعرض'}
                         </div>
                         <div className="text-xs text-zinc-500">Automatically save generated images</div>
                    </div>
                </div>

                {/* Left Side: Toggle */}
                <div 
                    className={`w-12 h-7 rounded-full relative transition-colors duration-200 ease-in-out ${settings.autoSave ? 'bg-indigo-500' : 'bg-zinc-600'}`}
                >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-md transition-all duration-200 ${settings.autoSave ? 'left-6' : 'left-1'}`}></div>
                </div>
            </div>
        </div>
      </section>

      {/* Data */}
      <section>
        <h3 className="text-zinc-500 text-xs font-bold mb-3 text-right uppercase tracking-wider px-1">DATA</h3>
        <div className="bg-[#1c1c1f] rounded-2xl border border-white/5 overflow-hidden">
            <button 
                onClick={onClearHistory}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition text-right group"
            >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/10">
                        <Trash2 size={18} />
                    </div>
                    <div className="text-right">
                        <span className="font-medium text-red-400 group-hover:text-red-300 transition">
                            {settings.language === 'en' ? 'Clear History' : 'مسح السجل'}
                        </span>
                        <p className="text-xs text-zinc-500 mt-0.5">Remove all generated images</p>
                    </div>
                 </div>
            </button>
        </div>
      </section>

      {/* Support */}
      <section>
        <h3 className="text-zinc-500 text-xs font-bold mb-3 text-right uppercase tracking-wider px-1">SUPPORT</h3>
        <div className="bg-[#1c1c1f] rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            <button onClick={() => handleSupport('المساعدة')} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 border border-white/5">
                        <HelpCircle size={18} />
                     </div>
                     <span className={`font-medium ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>
                         {settings.language === 'en' ? 'Help' : 'المساعدة'}
                     </span>
                 </div>
            </button>
            <button onClick={() => handleSupport('سياسة الخصوصية')} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 border border-white/5">
                        <Shield size={18} />
                     </div>
                     <span className={`font-medium ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>
                         {settings.language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                     </span>
                 </div>
            </button>
        </div>
      </section>

      <div className="text-center text-zinc-600 text-xs font-mono mt-4">
        mini v1.0.0
      </div>

    </div>
  );
};