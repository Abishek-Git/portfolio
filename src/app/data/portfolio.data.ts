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
  title: 'Software Engineer',
  email: 'abisheakarun11@gmail.com',
  phone: '9080474311',
  location: 'Mandaveli, Chennai-28',
  summary:
    'Software Engineer with 5 years of experience in building and modernizing enterprise content management applications. Skilled in front-end and full-stack development with expertise in Angular, TypeScript, JavaScript, Playwright, PrimeNG, PDF.js, Java, Spring Boot, SQL, and deployment workflows. Strong focus on AI-enabled development, workflow automation, accessibility, and improving customer-facing product experiences.',
  typingTexts: [
    'Software Engineer',
    'Full-Stack Developer',
    'AI-Enabled Developer',
    'Automation Architect',
    'Angular Expert',
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
    { name: 'JavaScript', category: 'language', level: 95 },
    { name: 'Python', category: 'language', level: 75 },
    { name: 'SQL', category: 'language', level: 80 },
    { name: 'C', category: 'language', level: 60 },
    { name: 'Angular', category: 'framework', level: 95 },
    { name: 'Spring Boot', category: 'framework', level: 85 },
    { name: 'REST APIs', category: 'framework', level: 90 },
    { name: 'PrimeNG', category: 'framework', level: 85 },
    { name: 'HTML/CSS', category: 'framework', level: 90 },
    { name: 'Playwright', category: 'testing', level: 90 },
    { name: 'Selenium', category: 'testing', level: 80 },
    { name: 'JUnit', category: 'testing', level: 85 },
    { name: 'TestNG', category: 'testing', level: 75 },
    { name: 'Oracle', category: 'database', level: 75 },
    { name: 'MySQL', category: 'database', level: 80 },
    { name: 'Cassandra', category: 'database', level: 70 },
    { name: 'Hibernate', category: 'database', level: 75 },
    { name: 'Docker', category: 'devops', level: 75 },
    { name: 'Kubernetes', category: 'devops', level: 70 },
    { name: 'Jenkins', category: 'devops', level: 75 },
    { name: 'Git', category: 'devops', level: 90 },
    { name: 'Helm', category: 'devops', level: 65 },
    { name: 'Agile', category: 'methodology', level: 90 },
  ],
  experience: [
    {
      company: 'Rocket Software',
      role: 'Software Engineer II',
      period: 'Jan 2024 — Present',
      startDate: '2024-01',
      endDate: 'Present',
      highlights: [
        'Developed agentic workflow orchestration automations to improve engineering efficiency and reduce repetitive manual work.',
        'Created GitHub-based AI developer workflows/agents to support more effective code writing, maintenance, and review.',
        'Revamped enterprise content management applications to deliver a more modern and user-friendly experience.',
        'Implemented WCAG-aligned accessibility improvements with strong focus on keyboard navigation and inclusive design.',
        'Enhanced critical content viewing features, including PDF copy/paste, text selection, zoom controls, and annotations.',
        'Upgraded Angular and front-end dependencies, improving maintainability, compatibility, and scalability.',
        'Conducted proof-of-concepts for PrimeNG table modernization and migration from legacy approaches.',
        'Built drag-and-drop form builder capabilities to support flexible and dynamic user experiences.',
        'Expanded Playwright automation coverage to improve quality and strengthen release confidence.',
        'Worked on Kubernetes and Helm-based deployment validation and environment readiness.',
      ],
      technologies: [
        'Angular', 'TypeScript', 'JavaScript', 'PrimeNG', 'Playwright',
        'PDF.js', 'WCAG', 'Kubernetes', 'Helm', 'GitHub', 'AI Workflows',
      ],
    },
    {
      company: 'Mphasis Limited',
      role: 'Software Engineer',
      period: 'Sep 2021 — Jan 2024',
      startDate: '2021-09',
      endDate: '2024-01',
      highlights: [
        'Developed and maintained the logistics application supporting millions of transactions per day for FedEx.',
        'Restructured back-end API infrastructure using Java, Spring Boot, and ActiveMQ, resulting in 20% performance improvement.',
        'Developed a batch job system for efficient JMS message delivery with scheduled automation.',
        'Reduced code complexity using optimized data structures, decreasing response time by 50% in various REST APIs.',
        'Implemented Selenium TestNG regression suites, decreasing manual testing time by 80%.',
        'Worked with CI/CD tools (SonarQube, Jenkins, PCF) for continuous delivery across environments.',
        'Achieved TDD using JUnit and Mockito, reducing defects by 95%.',
      ],
      technologies: [
        'Java 8', 'Spring Boot', 'Hibernate', 'Docker', 'Maven', 'Jenkins',
        'JMS', 'Cassandra', 'Microservices', 'Resilience4j', 'Splunk',
      ],
    },
  ],
  projects: [
    {
      title: 'Ecommerce CRM',
      description:
        'Full-stack CRM application with role-based access, CRUD operations, and responsive UI.',
      techStack: ['Python', 'Django', 'Angular', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Real Estate Management',
      description:
        'Full-stack web application with admin dashboard, role-based access, CRUD, session handling, and caching.',
      techStack: [
        'Angular', 'Java', 'Spring Boot', 'Hibernate', 'Oracle DB',
        'HTML', 'CSS', 'JavaScript', 'Bootstrap',
      ],
    },
  ],
  achievements: [
    {
      title: '2nd Place — Rocket.Build 2025',
      description:
        'Won 2nd place for ROSE (Rocket Support Explorer) at a company-wide innovation hackathon. Recognized for creativity, teamwork, and passion for innovation.',
    },
    {
      title: 'Trust Award — Production Delivery',
      description:
        'Received the Trust award for driving production release priorities and leading a critical customer issue root cause analysis. Recognized for technical expertise and ability to deliver under pressure.',
    },
    {
      title: 'Cross-Team Technical Leadership',
      description:
        'Led the resolution of a breaking change during a major Angular upgrade by sharing documentation, implementing the fix for a third-party library migration, and joining troubleshooting calls — enabling the team to ship on time.',
    },
    {
      title: 'Consistent Engineering Excellence',
      description:
        'Multiple recognitions for delivering key production releases, pioneering test automation frameworks, demonstrating strong UI expertise, and consistently supporting teammates across projects.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Engineering in ECE',
      institution: 'VelTech HighTech Engineering College',
      location: 'Avadi, Chennai',
      period: 'July 2017 — April 2021',
      grade: '7.68 CGPA',
    },
    {
      degree: 'High School',
      institution: 'ARC Kamatchi Matriculation Higher Secondary School',
      location: 'Chennai',
      period: 'April 2017',
      grade: '88.3%',
    },
  ],
};
