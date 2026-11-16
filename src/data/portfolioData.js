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
      "I am a Software Developer and currently pursuing my Master's degree in Web Engineering at TU Chemnitz, Germany. I have hands-on experience in building full-stack web applications, developing REST APIs, working with databases, and integrating machine learning features. I enjoy solving real-world problems through technology and building applications that are practical, scalable, and user-friendly.",
      "I completed my Bachelor's degree in Information Technology with a CGPA of 8.94. During my internships, I gained practical experience working with Django, Flask, databases, frontend technologies, and application development. I enjoy learning new technologies, solving technical challenges, and turning ideas into working applications."
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
      { id: "languages-frameworks", label: "Languages & Frameworks" },
      { id: "databases", label: "Databases" },
      { id: "devops-tools", label: "DevOps & Tools" },
      { id: "cloud", label: "Cloud Platforms" }
    ],
    items: [
      // Languages & Frameworks (strictly from CV)
      { name: "Python", category: "languages-frameworks" },
      { name: "JavaScript (ES6+)", category: "languages-frameworks" },
      { name: "C++", category: "languages-frameworks" },
      { name: "PHP", category: "languages-frameworks" },
      { name: "HTML5", category: "languages-frameworks" },
      { name: "CSS3", category: "languages-frameworks" },
      { name: "Django", category: "languages-frameworks" },
      { name: "Flask", category: "languages-frameworks" },
      { name: "FastAPI", category: "languages-frameworks" },
      { name: "React.js", category: "languages-frameworks" },
      { name: "Bootstrap", category: "languages-frameworks" },
      { name: "Tailwind CSS", category: "languages-frameworks" },
      { name: "SQLAlchemy", category: "languages-frameworks" },
      { name: "Pandas", category: "languages-frameworks" },
      { name: "Scikit-learn", category: "languages-frameworks" },
      { name: "Machine Learning", category: "languages-frameworks" },
      { name: "Generative AI", category: "languages-frameworks" },

      // Databases
      { name: "PostgreSQL", category: "databases" },
      { name: "MySQL", category: "databases" },
      { name: "SQLite", category: "databases" },
      { name: "SQL", category: "databases" },

      // DevOps & Tools
      { name: "Docker", category: "devops-tools" },
      { name: "GitHub Actions (CI/CD)", category: "devops-tools" },
      { name: "Git & GitHub", category: "devops-tools" },
      { name: "Pytest", category: "devops-tools" },
      { name: "Playwright", category: "devops-tools" },
      { name: "REST APIs", category: "devops-tools" },
      { name: "Gunicorn", category: "devops-tools" },
      { name: "Visual Studio Code", category: "devops-tools" },

      // Cloud Platforms
      { name: "Vercel", category: "cloud" },
      { name: "Render", category: "cloud" },
      { name: "Neon (serverless PostgreSQL)", category: "cloud" }
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
      liveUrl: null
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
      liveUrl: null
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
