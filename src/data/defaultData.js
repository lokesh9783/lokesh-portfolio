export const defaultPortfolioData = {
  profile: {
    name: "Lokesh Kumawat",
    headline: "Virtual Assistant & Data Specialist | Web Developer",
    subtitle: "Empowering businesses with precise data intelligence, streamlined operations, and modern web solutions.",
    bio: "I am a dedicated professional with proven experience in Virtual Assistance, Data Research, Lead Generation, CRM Management, and Web Development. With enterprise experience at Wipro Jaipur, Get Catalyzed, and Get It Ready, I help companies optimize workflows, maintain data integrity, and build fast, reliable digital solutions.",
    email: "lksweb9783@gmail.com",
    location: "Jaipur, Rajasthan, India",
    availability: "Available for Full-time Roles & Freelance Projects",
    isAvailableForHire: true,
    resumeUrl: "https://all-certficates-lks.netlify.app/Lokesh%20kumawat%20resume.pdf",
    experienceLetterUrl: "https://all-certficates-lks.netlify.app/Experience-letter-LOKESH.pdf",
    githubUrl: "https://github.com/lokesh9783589128",
    linkedinUrl: "https://www.linkedin.com/in/lokesh-kumawat-04558628a/",
  },

  experiences: [
    {
      id: "exp-1",
      role: "Virtual Assistant",
      company: "Get Catalyzed",
      period: "May 2026 – Present",
      location: "Remote / Jaipur",
      current: true,
      description: "Driving day-to-day operational support, executive schedule coordination, CRM pipeline maintenance, business web research, and client deliverables.",
      skills: ["Virtual Assistance", "CRM Management", "Web Research", "Google Sheets", "Task Management"]
    },
    {
      id: "exp-2",
      role: "Backend Support",
      company: "Get It Ready",
      period: "January 2026 – April 2026",
      location: "Remote / Jaipur",
      current: false,
      description: "Handled data verification, records cleansing, operational task resolution, process compliance, and collaborative stakeholder communication.",
      skills: ["Backend Support", "Data Verification", "Data Cleansing", "Microsoft Excel", "Process Flow"]
    },
    {
      id: "exp-3",
      role: "Associate",
      company: "Wipro",
      period: "September 2024 – November 2025",
      location: "Jaipur, Rajasthan",
      current: false,
      description: "Managed high-volume client data workflows, quality checks, structured reporting, cross-team data consistency, and enterprise standards compliance.",
      skills: ["Enterprise Operations", "Data Processing", "Excel / Sheets", "Quality Assurance", "Customer Service"]
    },
    {
      id: "exp-4",
      role: "Intern",
      company: "Creadig (The Digital Creation)",
      period: "October 2023 – February 2024",
      location: "Jaipur, Rajasthan",
      current: false,
      description: "Analyzed user requirements, executed software development life cycle (SDLC) routines, wrote testable code, and delivered web solutions adhering to industry benchmarks.",
      skills: ["HTML", "CSS", "JavaScript", "SDLC", "Software Functionality"]
    }
  ],

  educations: [
    {
      id: "edu-1",
      degree: "Bachelor of Science (B.Sc.)",
      institution: "S.S. Jain Subodh P.G. College",
      location: "Jaipur, Rajasthan",
      period: "Completed",
      highlights: "Strong analytical and mathematical foundation with active coursework in computer applications and science."
    },
    {
      id: "edu-2",
      degree: "Secondary School Education",
      institution: "Madhu Public Sr. Sec. School",
      location: "Jaipur, Rajasthan",
      period: "Completed",
      highlights: "Fundamental academics with early engagement in IT, computer systems, and design."
    }
  ],

  skills: [
    // Virtual Assistance & Data
    { id: "sk-1", name: "Lead Generation", category: "Data & VA", level: "Expert" },
    { id: "sk-2", name: "Web Research", category: "Data & VA", level: "Expert" },
    { id: "sk-3", name: "Data Scraping", category: "Data & VA", level: "Advanced" },
    { id: "sk-4", name: "Data Verification", category: "Data & VA", level: "Expert" },
    { id: "sk-5", name: "Data Cleansing", category: "Data & VA", level: "Expert" },
    { id: "sk-6", name: "CRM Management", category: "Data & VA", level: "Advanced" },

    // Office & Tools
    { id: "sk-7", name: "Microsoft Excel", category: "Tools & Productivity", level: "Advanced" },
    { id: "sk-8", name: "Google Sheets", category: "Tools & Productivity", level: "Advanced" },
    { id: "sk-9", name: "Microsoft Office Suite", category: "Tools & Productivity", level: "Advanced" },

    // Development
    { id: "sk-10", name: "HTML5", category: "Web Development", level: "Expert" },
    { id: "sk-11", name: "CSS3", category: "Web Development", level: "Expert" },
    { id: "sk-12", name: "JavaScript", category: "Web Development", level: "Intermediate" },
    { id: "sk-13", name: "React JS", category: "Web Development", level: "Intermediate" },
    { id: "sk-14", name: "Python", category: "Web Development", level: "Intermediate" },
    { id: "sk-15", name: "SQL / PostgreSQL", category: "Web Development", level: "Intermediate" },

    // Creative
    { id: "sk-16", name: "Adobe Photoshop", category: "Creative & Design", level: "Intermediate" },
    { id: "sk-17", name: "Canva", category: "Creative & Design", level: "Advanced" }
  ],

  services: [
    {
      id: "srv-1",
      title: "B2B Lead Generation & Prospecting",
      badge: "High Demand",
      description: "Build clean, verified contact databases tailored to your Ideal Customer Profile (ICP). Includes decision-maker emails, phone numbers, and LinkedIn profiles.",
      deliverables: ["Verified Prospect Lists", "Domain & Email Validation", "Niche B2B Research", "Custom Spreadsheets"]
    },
    {
      id: "srv-2",
      title: "Executive Virtual Assistance",
      badge: "Core Service",
      description: "Comprehensive operational support including email management, scheduling, administrative tasks, file structuring, and customer communication.",
      deliverables: ["Daily Task Execution", "Calendar & Inbox Organization", "Document Formatting", "Data Coordination"]
    },
    {
      id: "srv-3",
      title: "Data Scraping, Cleansing & CRM Management",
      badge: "Specialized",
      description: "Extract structured datasets from web directories, eliminate duplicates, standardize formats, and maintain your CRM (HubSpot, Salesforce, Zoho, etc.).",
      deliverables: ["Structured Data Extraction", "Deduplication & Hygiene", "CRM Field Mapping & Import", "Quality Audits"]
    },
    {
      id: "srv-4",
      title: "Responsive Frontend Web Development",
      badge: "Development",
      description: "Build high-performing, clean, modern, and mobile-friendly websites using React, modern CSS, and semantic HTML.",
      deliverables: ["Responsive Websites & Landing Pages", "Speed & UI Optimization", "Interactive UI Elements", "Clean Codebase"]
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Royal Wedding Planner",
      category: "Luxury Destination Weddings",
      tagline: "Royal Destination Weddings & Regal Celebrations",
      description: "A luxury Rajasthan destination wedding planning web application. Features palace venue exploration across Jaipur, Udaipur, Jodhpur, and Jaisalmer, an interactive wedding budget estimator, curated turnkey packages, a filterable gallery lightbox, and automated WhatsApp proposal generation.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      features: [
        "Interactive Wedding Cost Estimator with itemized budget breakdown",
        "Destination venue explorer with persistent shortlist bookmarking",
        "Comprehensive proposal request form with tracking code & WhatsApp sync"
      ],
      tags: ["React 19", "Vite", "JavaScript", "Lucide React", "CSS3", "LocalStorage"],
      repoName: "royal-wedding-planner",
      localPort: 5174,
      liveDemoUrl: "https://royal-wedding-plannerr.netlify.app/",
      githubUrl: "https://github.com/lokesh9783/Royal-wedding-planner",
      featured: true
    },
    {
      id: "proj-2",
      title: "Jaipur Mithai House",
      category: "Traditional Rajasthani Confectionery",
      tagline: "Authentic Traditional Rajasthani Mithai & Namkeen",
      description: "A professional traditional Indian sweet shop e-commerce storefront celebrating 50 years of Johari Bazaar heritage. Features fresh Malai Ghewar, Mawa Kachori, and Motichoor Ladoos with live weight variant pricing (500g / 1kg), quantity steppers, shopping cart drawer, and direct WhatsApp order dispatch.",
      image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
      features: [
        "Live weight variant selector (500g/1kg) with dynamic price calculation",
        "Slide-out shopping cart drawer with local delivery and store pickup modes",
        "One-click WhatsApp order transmitter with auto-formatted itemized summary"
      ],
      tags: ["React 19", "Vite", "JavaScript", "Lucide React", "LocalStorage", "E-Commerce"],
      repoName: "jaipur-mithai-house",
      localPort: 5175,
      liveDemoUrl: "https://jaipur-mithai-house.netlify.app/",
      githubUrl: "https://github.com/lokesh9783/jaipur-mithai-house",
      featured: true
    },
    {
      id: "proj-3",
      title: "The Pink City Kitchen",
      category: "Fine Dining & Restaurant",
      tagline: "Royal Rajputana Flavours & North Indian Fine Dining",
      description: "A premium culinary destination website for a fine dining restaurant in C-Scheme, Jaipur. Features authentic Dal Baati Churma, 18-hour slow-cooked Dal Makhani, handi biryanis, a filterable dietary menu, an interactive table reservation engine, and an open-air courtyard photo gallery.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      features: [
        "Interactive Table Reservation Engine with seating & occasion selectors",
        "Dietary menu filter (Vegetarian Only, Non-Veg, Chef Signatures)",
        "Automated reservation code logging & instant WhatsApp booking confirmation"
      ],
      tags: ["React 19", "Vite", "JavaScript", "Lucide React", "CSS3", "LocalStorage"],
      repoName: "pink-city-kitchen",
      localPort: 5176,
      liveDemoUrl: "https://pink-city-kitchen.netlify.app/",
      githubUrl: "https://github.com/lokesh9783/pink-city-kitchen",
      featured: true
    },
    {
      id: "proj-4",
      title: "Shree Rajbhog",
      category: "Luxury Gifting & Confections",
      tagline: "Couture Indian Confections & Luxury Gifting Atelier",
      description: "An ultra-luxury gifting boutique specializing in handcrafted wooden dry fruit trunks, 24K gold leaf mithai boxes, and bespoke wedding favor hampers. Features an automated bulk quotation calculator with volume discounts (10% to 20%), personalized foil crest stamping, and a luxury shopping bag.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      features: [
        "Bulk Order Quotation Estimator with automated volume discount tiers",
        "Bespoke wedding invitation and favor customization engine",
        "Slide-out luxury gift bag with custom calligraphy message card support"
      ],
      tags: ["React 19", "Vite", "JavaScript", "Lucide React", "CSS3", "LocalStorage"],
      repoName: "shree-rajbhog",
      localPort: 5177,
      liveDemoUrl: "https://shree-rajbhogg.netlify.app/",
      githubUrl: "https://github.com/lokesh9783/shree-rajbhog",
      featured: true
    }
  ],

  certificates: [
    {
      id: "cert-1",
      title: "Latest Official Resume",
      issuer: "Lokesh Kumawat",
      date: "Latest Version",
      type: "Resume PDF",
      fileUrl: "https://all-certficates-lks.netlify.app/Lokesh%20kumawat%20resume.pdf",
      description: "Verified summary of professional roles (Get Catalyzed, Get It Ready, Wipro), competencies, and educational history."
    },
    {
      id: "cert-2",
      title: "Official Work Experience Letter",
      issuer: "Creadig (The Digital Creation)",
      date: "February 2024",
      type: "Experience Letter PDF",
      fileUrl: "https://all-certficates-lks.netlify.app/Experience-letter-LOKESH.pdf",
      description: "Formal verification of 5 months work as intern analyzing software requirements, SDLC execution, and coding deliverables."
    }
  ],

  interests: [
    { id: "int-1", name: "Data Research", icon: "search" },
    { id: "int-2", name: "Creative Writing", icon: "pen-tool" },
    { id: "int-3", name: "Music", icon: "music" },
    { id: "int-4", name: "Editing & Visuals", icon: "film" },
    { id: "int-5", name: "Reading", icon: "book-open" }
  ]
};
