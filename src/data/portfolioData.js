export const PORTFOLIO_DATA = {
  personal: {
    name: "Samay Patel",
    title: "Software Developer | Full-Stack & Machine Learning",
    subtitle: "M.Sc. Web Engineering Student at TU Chemnitz",
    tagline: "Building practical web applications and intelligent solutions through software engineering, backend development, and machine learning.",
    location: "Chemnitz, Germany",
    email: "samaypatel713@gmail.com",
    phone: "+49 15565819220",
    cvPath: "/assets/Samay_Patel_CV.pdf",
    profileImage: "/assets/samay-profile.jpg",
    githubUrl: "https://github.com/Samay-P07",
    linkedinUrl: "https://www.linkedin.com/in/samaypatel7",
    bio: [
      "I am currently pursuing an M.Sc. in Web Engineering at Technische Universität Chemnitz, Germany. I completed my Bachelor's degree in Information Technology with a CGPA of 8.94.",
      "My interests include software development, backend engineering, full-stack applications, data science, and artificial intelligence. I have hands-on experience in building full-stack web applications, developing REST APIs, working with databases, and integrating machine learning features.",
      "During my internships, I gained practical experience working with Django, Flask, databases, frontend technologies, and application development. I enjoy learning new technologies, solving technical challenges, and turning ideas into working applications that are practical, scalable, and user-friendly."
    ],
    credentials: [
      { label: "LOCATION", value: "Chemnitz, Germany" },
      { label: "DEGREE", value: "M.Sc. Web Engineering" },
      { label: "INSTITUTION", value: "TU Chemnitz, Germany" },
      { label: "BACHELOR'S", value: "B.E. IT (CGPA: 8.94)" }
    ]
  },

  skills: {
    categories: [
      { id: "all", label: "All Skills" },
      { id: "programming", label: "Programming" },
      { id: "frontend-backend", label: "Frontend & Backend" },
      { id: "ml-ai", label: "Machine Learning & AI" },
      { id: "databases", label: "Databases" },
      { id: "devops-tools", label: "DevOps & Tools" }
    ],
    items: [
      // Programming (4)
      { name: "Python", category: "programming", type: "Programming", desc: "Core language for backend architectures, data pipelines & machine learning" },
      { name: "JavaScript (ES6+)", category: "programming", type: "Programming", desc: "Modern ECMAScript for interactive frontends & responsive client workflows" },
      { name: "C++", category: "programming", type: "Programming", desc: "Object-oriented programming, data structures & systems foundational algorithms" },
      { name: "PHP", category: "programming", type: "Programming", desc: "Server-side scripting & web development integration" },

      // Frontend (5) -> Category: 'frontend-backend'
      { name: "React.js", category: "frontend-backend", type: "Frontend", desc: "Component architecture, reactive hooks & modern SPA engineering" },
      { name: "HTML5", category: "frontend-backend", type: "Frontend", desc: "Semantic markup, accessibility landmarks & document structure" },
      { name: "CSS3", category: "frontend-backend", type: "Frontend", desc: "Flexbox, CSS Grid, custom properties & responsive design systems" },
      { name: "Bootstrap", category: "frontend-backend", type: "Frontend", desc: "Rapid utility styling, grid systems & responsive UI layout components" },
      { name: "Tailwind CSS", category: "frontend-backend", type: "Frontend", desc: "Utility-first modern styling for maintainable, fluid component UI" },

      // Backend (4) -> Category: 'frontend-backend'
      { name: "Django", category: "frontend-backend", type: "Backend", desc: "High-level Python web framework with MVT architecture, ORM & security" },
      { name: "Flask", category: "frontend-backend", type: "Backend", desc: "Lightweight WSGI web microframework for REST APIs & microservices" },
      { name: "FastAPI", category: "frontend-backend", type: "Backend", desc: "Asynchronous, high-performance Python framework for modern REST APIs" },
      { name: "REST APIs", category: "frontend-backend", type: "Backend", desc: "Stateless HTTP API architecture, JSON serialization & CRUD endpoints" },

      // Machine Learning & AI (4) -> Category: 'ml-ai'
      { name: "Machine Learning", category: "ml-ai", type: "Machine Learning & AI", desc: "Supervised regression, classification & model evaluation workflows" },
      { name: "Scikit-learn", category: "ml-ai", type: "Machine Learning & AI", desc: "Algorithm pipelines, cross-validation, feature tuning & metrics evaluation" },
      { name: "Generative AI", category: "ml-ai", type: "Machine Learning & AI", desc: "LLM integrations, prompt engineering & AI assistant pipelines" },
      { name: "Pandas", category: "ml-ai", type: "Machine Learning & AI", desc: "Data wrangling, tabular transformations & exploratory dataset analytics" },

      // Databases (5) -> Category: 'databases'
      { name: "PostgreSQL", category: "databases", type: "Databases", desc: "Enterprise relational database with structured schemas & ACID transactions" },
      { name: "MySQL", category: "databases", type: "Databases", desc: "Relational database management for web applications & backend services" },
      { name: "SQLite", category: "databases", type: "Databases", desc: "Serverless embedded database for local development & automated testing" },
      { name: "SQLAlchemy", category: "databases", type: "Databases", desc: "SQL toolkit & Object-Relational Mapper (ORM) for Python applications" },
      { name: "SQL", category: "databases", type: "Databases", desc: "Complex relational querying, aggregation, filtering & schema design" },

      // DevOps & Cloud (5) -> Category: 'devops-tools'
      { name: "Docker", category: "devops-tools", type: "DevOps & Cloud", desc: "Containerization, reproducible runtimes & multi-stage Dockerfiles" },
      { name: "GitHub Actions", category: "devops-tools", type: "DevOps & Cloud", desc: "Continuous Integration & Continuous Delivery (CI/CD) pipelines" },
      { name: "Vercel", category: "devops-tools", type: "DevOps & Cloud", desc: "Cloud serverless deployment, edge hosting & automated git preview builds" },
      { name: "Render", category: "devops-tools", type: "DevOps & Cloud", desc: "Cloud application hosting with managed web services & worker instances" },
      { name: "Neon", category: "devops-tools", type: "DevOps & Cloud", desc: "Serverless cloud PostgreSQL with branching & autoscaling storage" },

      // Testing & Tools (5) -> Category: 'devops-tools'
      { name: "Pytest", category: "devops-tools", type: "Testing & Tools", desc: "Test automation, fixtures, parametrized tests & regression suites" },
      { name: "Playwright", category: "devops-tools", type: "Testing & Tools", desc: "End-to-end browser automation & cross-browser integration testing" },
      { name: "Git", category: "devops-tools", type: "Testing & Tools", desc: "Distributed version control, branching workflows & commit tracking" },
      { name: "GitHub", category: "devops-tools", type: "Testing & Tools", desc: "Source code collaboration, pull requests, issue tracking & releases" },
      { name: "Visual Studio Code", category: "devops-tools", type: "Testing & Tools", desc: "Primary development IDE with extensions, linting & debugging" }
    ]
  },

  experience: [
    {
      id: "coding-cloud",
      company: "Coding Cloud",
      role: "Intern (Backend / Web Development)",
      location: "Ahmedabad, India",
      period: "Jan 2024 – Jun 2024",
      highlights: [
        "Built backend features in Django with MySQL database integration and API management, enabling secure and efficient data handling.",
        "Worked in an agile team to develop and maintain scalable web applications; helped debug, test and optimize code for better performance and security.",
        "Built dynamic user interfaces with HTML5, CSS3, Bootstrap, JavaScript and jQuery, improving the user experience.",
        "Used Git for version control and team collaboration."
      ],
      skills: ["Django", "Python", "MySQL", "REST APIs", "Bootstrap", "JavaScript", "jQuery", "Git"]
    },
    {
      id: "patel-websolution",
      company: "Patel Websolution",
      role: "Web Developer Intern",
      location: "Ahmedabad, India",
      period: "Jun 2023 – Aug 2023",
      highlights: [
        "Built end-to-end web solutions in Django and Flask, including user authentication, database connectivity and session management.",
        "Completed hands-on full-stack development training through real-world projects."
      ],
      skills: ["Django", "Flask", "Python", "User Authentication", "Database Connectivity", "Session Management"]
    }
  ],

  projects: [
    {
      id: "profitpulse",
      title: "ProfitPulse: Supermarket Sales & Revenue Forecasting System",
      shortTitle: "ProfitPulse",
      subtitle: "Supermarket Sales & Revenue Forecasting System",
      description: "An end-to-end supermarket sales forecasting application that uses machine learning algorithms to predict sales and provide useful business insights.",
      image: "/assets/projects/profitpulse.png",
      technologies: ["Python", "Scikit-learn", "Flask", "Docker", "Pytest", "Vercel"],
      metrics: [
        { label: "OPTIMAL MODEL", value: "Gradient Boosting" },
        { label: "R² SCORE", value: "0.9991" },
        { label: "RMSE", value: "$7.78" },
        { label: "REST API LATENCY", value: "< 5 ms" }
      ],
      highlights: [
        "Built an end-to-end sales forecasting system comparing 6 regression algorithms with 5-fold cross-validation; Gradient Boosting performed best with R² of 0.9991 and RMSE of $7.78.",
        "Removed target leakage by excluding accounting-derived fields (COGS, Tax) and adding time features (Hour, DayOfWeek, IsWeekend).",
        "Delivered a Flask web app with a REST API (/api/v1/predict, under 5 ms response), batch CSV upload and a Chart.js dashboard.",
        "Automated with 11 Pytest suites, Docker and GitHub Actions CI/CD, deployed serverless on Vercel."
      ],
      githubUrl: "https://github.com/Samay-P07/Supermarket-Sales-Prediction",
      liveUrl: "https://supermarket-sales-prediction-ten.vercel.app/"
    },
    {
      id: "cinematch",
      title: "CineMatch: AI-Powered Movie & TV Recommendation Platform",
      shortTitle: "CineMatch",
      subtitle: "AI-Powered Movie & TV Recommendation Platform",
      description: "An intelligent movie and TV recommendation platform that helps users discover content based on similarities between genres, cast, directors, descriptions, and release periods.",
      image: "/assets/projects/cinematch.jpg",
      technologies: ["Python", "FastAPI", "Scikit-learn", "SQLAlchemy", "PostgreSQL", "JavaScript", "Docker", "Playwright", "Vercel"],
      metrics: [
        { label: "TITLES INDEXED", value: "8,800+ Netflix Titles" },
        { label: "ALGORITHM", value: "TF-IDF & Cosine Similarity" },
        { label: "QUERY RESPONSE", value: "< 50 ms" },
        { label: "TEST SUITES", value: "53+ Unit / E2E Tests" }
      ],
      highlights: [
        "Built a content-based recommendation engine using TF-IDF and cosine similarity on 8,800+ Netflix titles, tuning feature weights (genres, cast, directors, synopses, era) to reach sub-50 ms query responses.",
        "Designed an asynchronous REST backend with FastAPI and SQLAlchemy 2.0 and a decoupled frontend, supporting SQLite locally and PostgreSQL (Neon) in the cloud with automatic schema self-healing.",
        "Added a persistent watchlist with optimistic UI updates and debounced search cancellation (AbortController).",
        "Tested with 53+ Pytest unit/integration tests and Playwright end-to-end tests, containerized with Docker and deployed on Vercel."
      ],
      githubUrl: "https://github.com/Samay-P07/netflix-content-recommendation-system",
      liveUrl: "https://netflix-content-recommendation-syst.vercel.app/"
    },
    {
      id: "fitcore",
      title: "FITCORE: Gym & Facility Management Platform",
      shortTitle: "FITCORE",
      subtitle: "Gym & Facility Management Platform",
      description: "A full-stack gym management platform designed to simplify membership management and everyday gym operations.",
      image: "/assets/projects/fitcore.png",
      technologies: ["Python", "Django", "SQLite", "Bootstrap", "Gunicorn", "WhiteNoise"],
      metrics: [
        { label: "ARCHITECTURE", value: "Django (MVT)" },
        { label: "TAX GENERATOR", value: "GST-Compliant (18%)" },
        { label: "SECURITY", value: "IDOR Vulnerability Fixed" },
        { label: "INTEGRATION TESTS", value: "8 Tests (100% Pass)" }
      ],
      highlights: [
        "Built a full-stack facility management platform in Django (MVT) to automate the member lifecycle and reduce manual spreadsheet tracking at the gym front desk.",
        "Developed digital membership passes, a GST-compliant (18%) invoice generator with print/PDF output, and a BMI, BMR and TDEE calculator (Mifflin-St Jeor formula) for nutrition targets.",
        "Fixed Insecure Direct Object Reference (IDOR) vulnerabilities and added password re-verification.",
        "Wrote 8 integration tests (100% pass rate) and deployed on Render with Gunicorn and WhiteNoise."
      ],
      githubUrl: "https://github.com/Samay-P07/Gym-Management-System",
      liveUrl: "https://fitcore-gym-6y5u.onrender.com"
    },
    {
      id: "accident-atlas",
      title: "Accident Atlas Analytics: German Road Accident Data Platform",
      shortTitle: "Accident Atlas Analytics",
      subtitle: "German Road Accident Data Platform",
      description: "A data analytics platform designed to process and explore German road accident datasets using data engineering and backend technologies.",
      image: "/assets/projects/accident-atlas.svg",
      technologies: ["Python", "Pandas", "FastAPI", "PostgreSQL", "SQL", "Tailwind CSS"],
      metrics: [
        { label: "DATA SOURCE", value: "Official German Open-Data" },
        { label: "TRANSFORMATION", value: "Python & Pandas ETL" },
        { label: "DATABASE", value: "PostgreSQL Schema" },
        { label: "API SERVICE", value: "FastAPI Analytical Endpoints" }
      ],
      highlights: [
        "Built an ETL pipeline that extracts and processes road accident datasets from official German open-data sources, using Python and Pandas for cleaning and transformation.",
        "Designed the PostgreSQL schema for accident and regional data and wrote analytical SQL queries for different traffic safety scenarios.",
        "Developed FastAPI endpoints that serve statistical and regional accident information."
      ],
      githubUrl: "https://github.com/Samay-P07/accident-atlas-analytics",
      liveUrl: null
    }
  ],

  education: [
    {
      degree: "Master of Science (M.Sc.)",
      major: "Web Engineering",
      institution: "Technische Universität Chemnitz",
      location: "Chemnitz, Germany",
      period: "2025 – Present",
      coursework: [
        "Advanced Management of Data",
        "Software Service Engineering",
        "Artificial Intelligence",
        "Neurocomputing"
      ]
    },
    {
      degree: "Bachelor of Engineering (B.E.)",
      major: "Information Technology",
      institution: "Alpha College of Engineering and Technology",
      location: "Gandhinagar, India",
      period: "2020 – 2024",
      grade: "CGPA: 8.94",
      coursework: []
    }
  ],

  languages: [
    { name: "English", level: "Fluent" },
    { name: "German", level: "Conversational" },
    { name: "Hindi", level: "Native" }
  ]
};
