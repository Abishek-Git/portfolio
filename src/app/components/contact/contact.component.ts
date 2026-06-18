import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PORTFOLIO } from '../../data/portfolio.data';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  data = PORTFOLIO;
  formName = '';
  formEmail = '';
  formMessage = '';
  submitted = signal(false);

  onSubmit(): void {
    const subject = encodeURIComponent(`Portfolio Contact from ${this.formName}`);
    const body = encodeURIComponent(
      `Name: ${this.formName}\nEmail: ${this.formEmail}\n\n${this.formMessage}`
    );
    window.open(`mailto:${this.data.email}?subject=${subject}&body=${body}`);
    this.submitted.set(true);
    setTimeout(() => this.submitted.set(false), 3000);
  }
}
