import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO } from '../../data/portfolio.data';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent {
  data = PORTFOLIO;
  isPaused = false;

  @ViewChild('marqueeContainer') marqueeContainer!: ElementRef<HTMLElement>;

  scrollLeft(): void {
    this.marqueeContainer.nativeElement.scrollBy({ left: -340, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.marqueeContainer.nativeElement.scrollBy({ left: 340, behavior: 'smooth' });
  }
}
