import {
  Component,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO } from '../../data/portfolio.data';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, ProfileCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  data = PORTFOLIO;
  displayText = signal('');
  private texts = PORTFOLIO.typingTexts;
  private textIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  private type(): void {
    const current = this.texts[this.textIndex];
    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.displayText.set(current.substring(0, this.charIndex));

    let speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2000; // pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      speed = 500;
    }

    this.typingTimer = setTimeout(() => this.type(), speed);
  }

  onContactClick(): void {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
