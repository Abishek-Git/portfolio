import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-design-portfolio',
  templateUrl: './design-portfolio.component.html',
  styleUrl: './design-portfolio.component.scss',
})
export class DesignPortfolioComponent {
  data = PORTFOLIO;

  skillGroups = [
    {
      icon: '🎨',
      title: 'Frontend Technologies',
      subtitle: 'UI/UX · Accessibility · Frameworks',
      tone: 'blue',
      skills: ['Angular 21', 'TypeScript', 'PrimeNG', 'HTML5 & CSS3', 'WCAG Accessibility', 'PDF.js'],
    },
    {
      icon: '⚙️',
      title: 'Backend & Systems',
      subtitle: 'APIs · Microservices · Security',
      tone: 'green',
      skills: ['Java', 'Spring Boot', 'Microservices', 'RESTful APIs', 'Hazelcast Cache', 'JWT Auth'],
    },
    {
      icon: '🗄️',
      title: 'Database & Messaging',
      subtitle: 'Storage · Brokers · Queues',
      tone: 'orange',
      skills: ['PostgreSQL', 'Cassandra NoSQL', 'ActiveMQ', 'Kafka', 'Event-Driven'],
    },
    {
      icon: '☁️',
      title: 'DevOps & Cloud',
      subtitle: 'CI/CD · Version Control · Tooling',
      tone: 'purple',
      skills: ['Maven', 'Gradle', 'Git & GitHub', 'Jenkins', 'Docker', 'Kubernetes'],
    },
    {
      icon: '🤖',
      title: 'AI & Test Automation',
      subtitle: 'LLM Workflows · E2E Testing · Quality Engineering',
      tone: 'mixed',
      skills: ['GitHub Copilot Workflows', 'Playwright Automation', 'TestNG Architecture', 'Jira AI Automation', '50% Dev Productivity'],
    },
  ];

  achievements = [
    {
      icon: '🏆',
      label: 'HACKATHON WINNER',
      title: 'Rocket Software Build25 Hackathon Winner',
      description: 'Won Rocket Software\'s Build25 Hackathon for developing Rocket Support Explorer, an AI-powered support engineering solution for centralized issue analysis and automated troubleshooting.',
      tag: 'Support Explorer · AI Engineering',
      tone: 'blue',
    },
    {
      icon: '🛡️',
      label: 'MODERNIZATION',
      title: 'Angular 13 → 21 Enterprise Migration',
      description: 'Upgraded an enterprise application from Angular 13 to Angular 21, migrating legacy modules and core components to PrimeNG for improved maintainability and long-term support.',
      tag: 'Angular 21 · PrimeNG · TypeScript',
      tone: 'green',
    },
    {
      icon: '🧪',
      label: '95% REDUCTION',
      title: 'Playwright Automation Impact',
      description: 'Developed Playwright regression automation that reduced manual regression testing effort by 95% while supporting rapid root cause analysis of critical production issues.',
      tag: 'Playwright · E2E Testing · QA',
      tone: 'purple',
    },
    {
      icon: '💰',
      label: '$10M CONTRACT',
      title: '$10M Enterprise Contract Secured',
      description: 'Re-engineered PDF document rendering following a security-driven PDF.js upgrade, restoring key enterprise capabilities for a strategic customer engagement.',
      tag: 'PDF.js · Security Upgrade · Revenue Impact',
      tone: 'orange',
    },
    {
      icon: '👥',
      label: 'LEADERSHIP',
      title: '4+ Junior Engineers Mentored',
      description: 'Guided and mentored 4+ junior engineers through code reviews and technical guidance, building strong team capability in distributed backend systems.',
      tag: 'Team Leadership · Code Reviews · Mentorship',
      tone: 'cyan',
    },
    {
      icon: '♿',
      label: '90% SCORE',
      title: '90% Accessibility Score Achieved',
      description: 'Championed comprehensive WCAG accessibility standards across enterprise components, raising compliance scores to 90% and making the application more usable for all users.',
      tag: 'WCAG 2.1 · Accessibility · Compliance',
      tone: 'gold',
    },
  ];

  scrollTo(id: string): void {
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 96;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }

  hideSocialIcon(event: Event): void {
    (event.target as HTMLImageElement).hidden = true;
  }

  showSocialIcon(event: Event): void {
    (event.target as HTMLImageElement).closest('a')?.classList.add('has-icon');
  }

}
