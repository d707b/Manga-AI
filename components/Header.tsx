import React from 'react';
import { Settings, Image as ImageIcon, LayoutGrid, BookOpen, Crown, Sun, Moon, User } from 'lucide-react';
import { Tab, AppSettings } from '../types';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  settings: AppSettings;
  onToggleTheme: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, onTabChange, settings, onToggleTheme }) => {
  const getTabClass = (tab: Tab) => {
    const isActive = activeTab === tab;
    // Base styles
    const base = "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all";
    
    // Active/Inactive styles based on theme
    if (settings.theme === 'light') {
       return isActive 
        ? `${base} bg-black text-white shadow-lg` 
        : `${base} text-zinc-500 hover:text-black hover:bg-zinc-200`;
    } else {
       return isActive 
        ? `${base} bg-white text-black shadow-lg font-semibold` 
        : `${base} text-zinc-400 hover:text-white hover:bg-white/5`;
    }
  };

  const handlePremiumClick = () => {
    alert("ميزة البريميوم ستكون متاحة قريباً! استمتع بالنسخة المجانية حالياً.");
  };

  const handleUserClick = () => {
    alert("الملف الشخصي للمستخدم");
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 w-full border-b transition-colors duration-300 ${settings.theme === 'light' ? 'bg-white border-zinc-200' : 'bg-[#0b0b0e] border-white/5'}`}>
      {/* Left: User & Settings */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleUserClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${settings.theme === 'light' ? 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-400 border-white/5 hover:text-white'}`}
        >
           <User size={14} />
        </button>
        <button 
          onClick={onToggleTheme}
          className={`transition ${settings.theme === 'light' ? 'text-zinc-600 hover:text-black' : 'text-zinc-400 hover:text-white'}`}
        >
            {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
         <button 
          onClick={handlePremiumClick}
          className="flex items-center gap-2 bg-[#2a1e38] text-[#a78bfa] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#36274a] transition border border-[#a78bfa]/20"
        >
          <span>Premium</span>
          <Crown size={14} />
        </button>
      </div>

      {/* Center: Navigation */}
      <nav className={`flex items-center gap-1 p-1.5 rounded-full border ${settings.theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-[#18181b] border-white/10'}`}>
        <button 
          onClick={() => onTabChange('create')}
          className={getTabClass('create')}
        >
            <ImageIcon size={18} />
            <span>{settings.language === 'en' ? 'Create' : 'إنشاء'}</span>
        </button>
        <button 
          onClick={() => onTabChange('story')}
          className={getTabClass('story')}
        >
            <BookOpen size={18} />
            <span>{settings.language === 'en' ? 'Story' : 'قصة'}</span>
        </button>
        <button 
          onClick={() => onTabChange('gallery')}
          className={getTabClass('gallery')}
        >
            <LayoutGrid size={18} />
            <span>{settings.language === 'en' ? 'Gallery' : 'المعرض'}</span>
        </button>
        <button 
          onClick={() => onTabChange('settings')}
          className={getTabClass('settings')}
        >
            <Settings size={18} />
            <span>{settings.language === 'en' ? 'Settings' : 'الإعدادات'}</span>
        </button>
      </nav>

      {/* Right: Brand/Logo */}
      <div className="flex items-center gap-3">
         <div className={`px-2 py-1 rounded text-xs font-mono tracking-widest border ${settings.theme === 'light' ? 'bg-zinc-100 text-zinc-600 border-zinc-200' : 'bg-zinc-800 text-zinc-500 border-white/5'}`}>
             mini
         </div>
      </div>
    </header>
  );
};