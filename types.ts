export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  FOUR_FIVE = '4:5'
}

export enum ImageStyle {
  REALISTIC = 'واقعي',
  ANIME = 'أنمي',
  CINEMATIC = 'سينمائي',
  ILLUSTRATION = 'رسم توضيحي',
  SIMPLE = 'بسيط',
  ABSTRACT = 'تجريدي',
  CLASSIC = 'كلاسيكي',
  NEON = 'نيون',
  CYBERPUNK = 'سايبربانك',
  OIL_PAINTING = 'رسم زيتي'
}

export type Tab = 'create' | 'story' | 'gallery' | 'settings';

export interface GenerationConfig {
  prompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  quality: 'standard' | 'high';
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface SavedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  type: 'create' | 'story';
  aspectRatio?: AspectRatio;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  autoSave: boolean;
}