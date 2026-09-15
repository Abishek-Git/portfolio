export interface SocialLink {
  name: string;
  url: string;
  icon: string; // CSS class or SVG path
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'testing' | 'database' | 'devops' | 'methodology';
  level: number; // 0-100
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  image?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  typingTexts: string[];
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  education: Education[];
}

export const PORTFOLIO: PortfolioData = {
  name: 'Abisheak S',
  title: 'Senior Software Engineer',
  email: 'abisheakarun11@gmail.com',
  phone: '+91-9080474311',
  location: 'Chennai, India',
  summary:
    'Full Stack Engineer with 5+ years of experience building enterprise applications using Java, Spring Boot, Microservices, and Angular. Experienced in backend development, distributed systems, frontend modernization, accessibility, AI-assisted engineering workflows, and test automation.',
  typingTexts: [
    'Senior Software Engineer',
    'Java & Spring Boot Engineer',
    'Full Stack Engineer',
    'Microservices Developer',
    'Angular Engineer',
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/abishek26s',
      icon: 'linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/abishek-git',
      icon: 'github',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/abisheak11s/',
      icon: 'leetcode',
    },
  ],
  skills: [
    { name: 'Java', category: 'language', level: 90 },
    { name: 'TypeScript', category: 'language', level: 95 },
    { name: 'SQL', category: 'language', level: 80 },
    { name: 'Python', category: 'language', level: 75 },
    { name: 'Angular', category: 'framework', level: 95 },
    { name: 'Spring Boot', category: 'framework', level: 90 },
    { name: 'Microservices', category: 'framework', level: 85 },
    { name: 'REST APIs', category: 'framework', level: 90 },
    { name: 'Kafka', category: 'framework', level: 75 },
    { name: 'ActiveMQ', category: 'framework', level: 75 },
    { name: 'PrimeNG', category: 'framework', level: 85 },
    { name: 'HTML5/CSS3', category: 'framework', level: 90 },
    { name: 'Playwright', category: 'testing', level: 90 },
    { name: 'JUnit', category: 'testing', level: 85 },
    { name: 'Mockito', category: 'testing', level: 85 },
    { name: 'TestNG', category: 'testing', level: 80 },
    { name: 'PostgreSQL', category: 'database', level: 85 },
    { name: 'Oracle', category: 'database', level: 75 },
    { name: 'Cassandra', category: 'database', level: 70 },
    { name: 'Hibernate', category: 'database', level: 75 },
    { name: 'Docker', category: 'devops', level: 80 },
    { name: 'Kubernetes', category: 'devops', level: 70 },
    { name: 'Jenkins', category: 'devops', level: 75 },
    { name: 'Maven', category: 'devops', level: 85 },
    { name: 'Gradle', category: 'devops', level: 70 },
    { name: 'Git', category: 'devops', level: 90 },
    { name: 'Distributed Systems', category: 'methodology', level: 85 },
    { name: 'Event-Driven Architecture', category: 'methodology', level: 80 },
    { name: 'System Design', category: 'methodology', level: 80 },
    { name: 'WCAG Accessibility', category: 'methodology', level: 85 },
    { name: 'GitHub Copilot', category: 'methodology', level: 90 },
  ],
  experience: [
    {
      company: 'Rocket Software',
      role: 'Software Engineer II',
      period: 'Jan 2024 — Present',
      startDate: '2024-01',
      endDate: 'Present',
      highlights: [
        'Designed and implemented an AI-assisted developer workflow using GitHub Copilot to automate Jira ticket analysis, code generation, testing, documentation, and PR creation, improving developer productivity by 50%.',
        'Implemented server-side JWT invalidation using Hazelcast, reducing the post-logout token exposure window from up to 5 hours to near zero across clustered application nodes.',
        'Re-engineered PDF document rendering and content-selection functionality following a security-driven PDF.js upgrade, restoring key enterprise capabilities for a strategic customer engagement contributing to a $10M contract.',
        'Modernized the enterprise application by upgrading Angular from version 13 to 21, migrating legacy modules to Angular 21 and PrimeNG while improving application maintainability and long-term support.',
        'Implemented WCAG-compliant accessibility standards and built reusable UI components, improving accessibility scores by 90% and accelerating feature development.',
        'Developed Playwright regression automation, reducing manual regression testing effort by 95% while resolving critical production issues through rapid root cause analysis.',
      ],
      technologies: [
        'Angular 21', 'TypeScript', 'Java', 'Spring Boot', 'PrimeNG',
        'Playwright', 'PDF.js', 'Hazelcast', 'WCAG', 'GitHub Copilot',
      ],
    },
    {
      company: 'Mphasis Limited',
      role: 'Software Engineer',
      period: 'Sep 2021 — Jan 2024',
      startDate: '2021-09',
      endDate: '2024-01',
      highlights: [
        'Developed and enhanced backend microservices for FedEx’s enterprise logistics and warehouse management platform using Java, Spring Boot, REST APIs, ActiveMQ, and Cassandra.',
        'Engineered asynchronous event-driven processing using ActiveMQ by publishing business events from microservices and building batch-processing workflows for scheduled and on-demand message delivery.',
        'Optimized REST APIs across Java Spring Boot microservices by improving backend processing and performance for logistics workflows.',
        'Developed automated backend regression test suites using TestNG, improving release confidence while mentoring 4 junior engineers through code reviews and technical guidance.',
      ],
      technologies: [
        'Java', 'Spring Boot', 'REST APIs', 'ActiveMQ', 'Cassandra',
        'Microservices', 'TestNG', 'Maven',
      ],
    },
  ],
  projects: [
    {
      title: 'Invoisr — Multi-Tenant Billing, HR & Payroll',
      description:
        'Multi-tenant SaaS application with tenant-isolated data, JWT authentication, refresh tokens, role-based access control, billing, HR, payroll, tax configuration, PDF generation, and self-service workflows.',
      techStack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'RBAC', 'Docker'],
      image: 'images/invoisr-preview.jpg',
    },
    {
      title: 'Ecommerce CRM',
      description:
        'Full-stack CRM application with role-based access, CRUD operations, and responsive UI.',
      techStack: ['Python', 'Django', 'Angular', 'HTML', 'CSS', 'JavaScript'],
      image: 'images/ecommerce-preview.jpg',
    },
    {
      title: 'Real Estate Management',
      description:
        'Full-stack web application with admin dashboard, role-based access, CRUD, session handling, and caching.',
      techStack: [
        'Angular', 'Java', 'Spring Boot', 'Hibernate', 'Oracle DB',
        'HTML', 'CSS', 'JavaScript', 'Bootstrap',
      ],
      image: 'images/real-estate-preview.jpg',
    },
  ],
  achievements: [
    {
      title: 'Rocket Software Build25 Hackathon Winner',
      description:
        'Won Rocket Software’s Build25 Hackathon for developing Rocket Support Explorer, an AI-powered support engineering solution that centralized issue analysis and automated troubleshooting.',
    },
    {
      title: 'Angular Modernization',
      description:
        'Upgraded an enterprise application from Angular 13 to Angular 21 and migrated legacy modules to Angular 21 and PrimeNG for improved maintainability and long-term support.',
    },
    {
      title: 'Playwright Automation Impact',
      description:
        'Developed Playwright regression automation that reduced manual regression testing effort by 95% while supporting rapid root cause analysis of critical production issues.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Engineering in ECE',
      institution: 'Vel Tech High Tech Engineering College',
      location: 'Chennai',
      period: 'Aug. 2017 — Apr. 2021',
      grade: '',
    },
  ],
};
