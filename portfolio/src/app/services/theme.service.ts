import { Injectable, signal, effect, computed } from '@angular/core';

export type Theme = 'dark' | 'light' | 'cyberpunk' | 'orange';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio-theme';
  private readonly themes: Theme[] = ['dark', 'light', 'cyberpunk', 'orange'];
  
  currentTheme = signal<Theme>(this.getInitialTheme());
  
  // For backward compatibility
  isDark = computed(() => this.currentTheme() === 'dark');
  isCyberpunk = computed(() => this.currentTheme() === 'cyberpunk');
  isOrange = computed(() => this.currentTheme() === 'orange');

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.storageKey, theme);
    });
  }

  toggle(): void {
    const current = this.currentTheme();
    const currentIndex = this.themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.currentTheme.set(this.themes[nextIndex]);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  private getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    if (stored && this.themes.includes(stored)) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
