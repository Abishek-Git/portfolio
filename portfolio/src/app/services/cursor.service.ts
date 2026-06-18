import { Injectable, signal } from '@angular/core';

export type CursorType = 'dot-ring' | 'spotlight' | 'trail' | 'none';

export interface CursorOption {
  type: CursorType;
  label: string;
  icon: string;
}

export const CURSOR_OPTIONS: CursorOption[] = [
  { type: 'dot-ring', label: 'Dot & Ring', icon: '◎' },
  { type: 'spotlight', label: 'Spotlight', icon: '◐' },
  { type: 'trail', label: 'Trail', icon: '✦' },
  { type: 'none', label: 'Default', icon: '↗' },
];

@Injectable({ providedIn: 'root' })
export class CursorService {
  private readonly storageKey = 'portfolio-cursor';
  cursorType = signal<CursorType>(this.getInitial());

  setCursor(type: CursorType): void {
    this.cursorType.set(type);
    localStorage.setItem(this.storageKey, type);
    if (type === 'none') {
      document.body.classList.add('cursor-default');
      document.body.style.cursor = '';
    } else {
      document.body.classList.remove('cursor-default');
      document.body.style.cursor = 'none';
    }
  }

  private getInitial(): CursorType {
    if (typeof window === 'undefined') return 'dot-ring';
    return (localStorage.getItem(this.storageKey) as CursorType) || 'dot-ring';
  }
}
