import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "pindo-sms-platform",
    title: "Pindo — SMS Platform",
    tagline: "Scalable frontend architecture for a public SMS and messaging platform, with reusable UI patterns, testing, and deployment workflows.",
    role: "Frontend Lead",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Vanilla Extract",
      "Storybook",
      "Redux",
      "Jest",
      "React Testing Library",
      "GitHub Actions",
      "Docker"
    ],
    year: "2023",
    links: {
      live: "https://www.pindo.io",
      github: "https://github.com/pindoio"
    },
    highlights: [
      "Owned frontend architecture across multiple production applications",
      "Built and maintained a shared design system for consistent UI delivery",
      "Improved performance and developer experience through tooling and standards"
    ],
    caseStudy: {
      problem:
        "The platform needed a scalable and maintainable frontend to support growing product features and multiple applications.",
      constraints: [
        "Multiple frontend applications sharing common UI patterns",
        "Need for high performance and reliability in production",
        "Developer velocity across a growing team"
      ],
      approach: [
        "Defined a clear frontend architecture and shared component patterns",
        "Introduced a design system using Storybook and Vanilla Extract",
        "Added testing and CI workflows to stabilize releases"
      ],
      results: [
        "Consistent UI across products with reduced duplication",
        "Improved performance and maintainability",
        "Faster onboarding and feature delivery"
      ],
      learnings: [
        "Design systems are critical for scaling frontend teams",
        "Clear architectural boundaries reduce long-term maintenance cost"
      ]
    }
  },

  {
    slug: "tuzaride-web-app",
    title: "TUZAride — Web App",
    tagline: "Real-time web platform for an on-demand driver-hailing service.",
    role: "Full-Stack Engineer",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Socket.IO"
    ],
    year: "2023",
    links: {
      live: "https://tuzaride.com"
    },
    highlights: [
      "Built real-time interactions using WebSockets",
      "Delivered a responsive UX optimized for mobile users",
      "Implemented end-to-end features across frontend and backend"
    ],
    caseStudy: {
      problem:
        "Users needed a reliable and responsive web interface to request rides and track drivers in real time.",
      constraints: [
        "Real-time data synchronization",
        "Variable network conditions",
        "Mobile-first usage patterns"
      ],
      approach: [
        "Used Socket.IO for live updates between drivers and riders",
        "Designed responsive layouts optimized for low-end devices",
        "Built REST APIs to support core ride workflows"
      ],
      results: [
        "Smooth real-time ride tracking experience",
        "Improved reliability under unstable network conditions",
        "Clear separation between frontend and backend responsibilities"
      ],
      learnings: [
        "Real-time UX requires careful state synchronization",
        "Mobile-first design decisions significantly impact usability"
      ]
    }
  },

  {
    slug: "quick-credit-backend",
    title: "Quick Credit — Backend API",
    tagline: "Backend services for a digital lending platform.",
    role: "Backend Engineer",
    stack: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Mocha",
      "Chai",
      "Docker"
    ],
    year: "2019",
    links: {
      github: "https://github.com/Hervera/QuickCredit-Backend"
    },
    highlights: [
      "Designed REST APIs for loan and user management",
      "Implemented validation and testing for financial workflows",
      "Containerized services for local and production environments"
    ],
    caseStudy: {
      problem:
        "The platform required secure and reliable backend services to manage loans and user data.",
      constraints: [
        "Data integrity for financial transactions",
        "Simple but testable architecture",
        "Limited infrastructure resources"
      ],
      approach: [
        "Designed RESTful endpoints with clear domain separation",
        "Added automated tests using Mocha and Chai",
        "Used Docker to standardize development environments"
      ],
      results: [
        "Stable backend services with predictable behavior",
        "Improved confidence through automated testing",
        "Easier deployment and onboarding"
      ],
      learnings: [
        "Testing is essential in financial systems",
        "Clear API contracts simplify frontend integration"
      ]
    }
  },

  {
    slug: "tuzaride-mobile-app",
    title: "TUZAride — Mobile App",
    tagline: "Cross-platform mobile app for ride booking and live tracking.",
    role: "Mobile Engineer",
    stack: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    year: "2023",
    links: {
      live: "https://apps.apple.com/rw/app/tuzaride/id6449968083"
    },
    highlights: [
      "Built a single codebase for iOS and Android",
      "Integrated live driver tracking with maps",
      "Implemented in-app messaging and trip management"
    ],
    caseStudy: {
      problem:
        "Riders needed a reliable mobile experience for booking and tracking rides in real time.",
      constraints: [
        "Cross-platform requirements",
        "Live location updates",
        "Battery and performance limitations"
      ],
      approach: [
        "Used Flutter for shared UI and logic",
        "Integrated Google Maps for live tracking",
        "Leveraged Firebase for messaging and notifications"
      ],
      results: [
        "Consistent experience across iOS and Android",
        "Reliable real-time tracking",
        "Reduced development overhead with a single codebase"
      ],
      learnings: [
        "Cross-platform tools can significantly speed up delivery",
        "Performance considerations are critical for map-heavy apps"
      ]
    }
  },

  {
    slug: "quick-credit-frontend",
    title: "Quick Credit — Frontend",
    tagline: "Frontend application for a digital lending platform.",
    role: "Frontend Engineer",
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Jest",
      "React Testing Library"
    ],
    year: "2019",
    links: {
      github: "https://github.com/Hervera/QuickCredit-Frontend"
    },
    highlights: [
      "Built form-heavy workflows with validation",
      "Managed complex application state",
      "Added automated tests for critical user flows"
    ],
    caseStudy: {
      problem:
        "Users needed a clear and reliable interface to apply for and manage loans.",
      constraints: [
        "Form-heavy user flows",
        "Validation and error handling",
        "Limited design resources"
      ],
      approach: [
        "Used Redux to manage predictable state",
        "Implemented reusable form components",
        "Added tests for key financial flows"
      ],
      results: [
        "Reduced user errors during loan applications",
        "More maintainable state management",
        "Higher confidence during refactors"
      ],
      learnings: [
        "State management clarity is critical in financial UIs",
        "Testing forms prevents costly regressions"
      ]
    }
  },

  {
    slug: "abahuza-real-estate",
    title: "ABAHUZA — Real Estate Platform",
    tagline: "Full-stack platform for browsing real estate listings.",
    role: "Full-Stack Engineer",
    stack: ["PHP", "Laravel", "MySQL", "Vue.js", "Bootstrap"],
    year: "2022",
    links: {
      live: "https://abahuza.com"
    },
    highlights: [
      "Designed and built end-to-end web application",
      "Implemented listing management and search features",
      "Delivered a responsive UI for multiple devices"
    ],
    caseStudy: {
      problem:
        "Users needed a simple way to discover and manage property listings online.",
      constraints: [
        "Limited hosting resources",
        "Monolithic architecture",
        "Broad range of user devices"
      ],
      approach: [
        "Built a Laravel backend with server-rendered views",
        "Added Vue.js for interactive components",
        "Optimized layouts for responsiveness"
      ],
      results: [
        "Functional platform with real users",
        "Clear separation between backend and frontend logic",
        "Maintainable full-stack solution"
      ],
      learnings: [
        "Progressive enhancement improves UX without over-engineering",
        "Simple architectures can scale when designed carefully"
      ]
    }
  },

  {
    slug: "hope-of-family-cms",
    title: "Hope Of Family — CMS",
    tagline: "Content management system for a non-profit organization.",
    role: "Full-Stack Engineer",
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    year: "2024",
    links: {
      live: "https://hopeoffamily.org"
    },
    highlights: [
      "Built CMS features for content and resource management",
      "Focused on simplicity and accessibility",
      "Supported long-term maintenance and updates"
    ],
    caseStudy: {
      problem:
        "The organization needed an easy-to-use platform to manage content and communicate with the community.",
      constraints: [
        "Non-technical users",
        "Limited maintenance budget",
        "Long-term sustainability"
      ],
      approach: [
        "Designed simple admin interfaces",
        "Used Laravel conventions to reduce complexity",
        "Kept dependencies minimal"
      ],
      results: [
        "Non-technical users able to manage content independently",
        "Stable platform over multiple years",
        "Low maintenance overhead"
      ],
      learnings: [
        "Simplicity is often more valuable than feature richness",
        "Developer empathy matters when building CMS tools"
      ]
    }
  },

  {
    slug: "ecommerce-frontend",
    title: "E-commerce — Frontend",
    tagline: "Angular storefront for browsing and purchasing products.",
    role: "Frontend Engineer",
    stack: ["Angular", "TypeScript", "Tailwind CSS", "RxJS"],
    year: "2025",
    links: {
      github: "https://github.com/Hervera/E-commerce-frontend"
    },
    highlights: [
      "Built reusable UI components",
      "Implemented reactive state with RxJS",
      "Focused on responsive and accessible UX"
    ],
    caseStudy: {
      problem:
        "Users needed a fast and intuitive interface for browsing products and completing purchases.",
      constraints: [
        "Complex UI state",
        "Performance under heavy interactions",
        "Responsive design requirements"
      ],
      approach: [
        "Used Angular component architecture",
        "Leveraged RxJS for predictable data flows",
        "Optimized layouts for multiple screen sizes"
      ],
      results: [
        "Smooth shopping experience",
        "Maintainable component structure",
        "Clear separation of concerns"
      ],
      learnings: [
        "Reactive patterns simplify complex UI flows",
        "Component reuse improves development speed"
      ]
    }
  },

  {
    slug: "ecommerce-backend",
    title: "E-commerce — Backend",
    tagline: "Backend services for a scalable e-commerce system.",
    role: "Backend Engineer",
    stack: [
      "Java Spring Boot",
      "MySQL",
      "Redis",
      "Docker",
      "Kubernetes"
    ],
    year: "2025",
    links: {
      github: "https://github.com/Hervera/E-commerce-backend"
    },
    highlights: [
      "Designed backend services for product and catalog management",
      "Implemented caching to improve performance",
      "Containerized services for scalable deployment"
    ],
    caseStudy: {
      problem:
        "The platform required scalable backend services to handle catalog data and high request volume.",
      constraints: [
        "Performance requirements",
        "Infrastructure complexity",
        "Scalability considerations"
      ],
      approach: [
        "Built REST APIs with Spring Boot",
        "Introduced Redis caching for frequent reads",
        "Used Docker and Kubernetes for deployment"
      ],
      results: [
        "Improved response times with caching",
        "Scalable deployment architecture",
        "Clear service boundaries"
      ],
      learnings: [
        "Caching is critical for read-heavy systems",
        "Infrastructure decisions shape long-term scalability"
      ]
    }
  }
];
