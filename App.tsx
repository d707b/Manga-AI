import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CreateMode } from './components/CreateMode';
import { StoryMode } from './components/StoryMode';
import { GalleryMode } from './components/GalleryMode';
import { SettingsMode } from './components/SettingsMode';
import { Tab, SavedImage, AppSettings, AspectRatio } from './types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  language: 'ar',
  autoSave: true
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [images, setImages] = useState<SavedImage[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedImages = localStorage.getItem('mini_images');
      const savedSettings = localStorage.getItem('mini_settings');
      
      if (savedImages) setImages(JSON.parse(savedImages));
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('mini_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('mini_settings', JSON.stringify(settings));
  }, [settings]);

  const handleImageGenerated = (url: string, prompt: string, type: 'create' | 'story', aspectRatio?: AspectRatio) => {
    if (settings.autoSave) {
      const newImage: SavedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now(),
        type,
        aspectRatio
      };
      setImages(prev => [newImage, ...prev]);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع الصور من السجل؟")) {
      setImages([]);
    }
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'light' ? 'bg-zinc-100 text-zinc-900' : 'bg-[#0b0b0e] text-white'} flex flex-col font-sans transition-colors duration-300`}>
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        settings={settings}
        onToggleTheme={() => setSettings(s => ({...s, theme: s.theme === 'dark' ? 'light' : 'dark'}))}
      />
      
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'create' && (
          <CreateMode 
            onImageGenerated={handleImageGenerated} 
            isAutoSaveEnabled={settings.autoSave}
          />
        )}
        {activeTab === 'story' && (
          <StoryMode 
            onImageGenerated={handleImageGenerated}
            isAutoSaveEnabled={settings.autoSave}
          />
        )}
        {activeTab === 'gallery' && (
          <GalleryMode 
            images={images} 
            onTabChange={setActiveTab} 
            onDeleteImage={(id) => setImages(prev => prev.filter(img => img.id !== id))}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsMode 
            settings={settings}
            onSettingsChange={setSettings}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>
    </div>
  );
};

export default App;