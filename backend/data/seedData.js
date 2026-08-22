// Seed Data for SVIT Student Career Hub
// All sample data is explicitly marked as [DEMO DATA] to adhere strictly to institutional transparency guidelines.

export const seedUsers = [
  {
    _id: "u_demo_student_01",
    name: "Rahul Sharma",
    email: "student@svit.ac.in",
    password: "Student@123", // Will be hashed or checked in mock store
    role: "student",
    studentId: "22SVIT0401",
    department: "CSE",
    year: "3rd Year",
    cgpa: 8.7,
    careerGoal: "Software Developer",
    createdAt: new Date("2026-01-15")
  },
  {
    _id: "u_demo_admin_01",
    name: "SVIT Career Admin",
    email: "admin@svit.ac.in",
    password: "Admin@123",
    role: "admin",
    department: "Placement & Training Cell",
    createdAt: new Date("2025-11-01")
  }
];

export const seedStudentProfiles = [
  {
    _id: "sp_demo_01",
    userId: "u_demo_student_01",
    name: "Rahul Sharma",
    email: "student@svit.ac.in",
    studentId: "22SVIT0401",
    department: "CSE",
    year: "3rd Year",
    cgpa: 8.7,
    phone: "+91 98765 43210",
    bio: "Passionate Computer Science student at SVIT eager to build scalable web platforms and AI-driven solutions.",
    careerGoal: "Software Developer",
    completedSkills: ["JavaScript", "React", "Node.js", "SQL", "Git & GitHub", "Problem Solving"],
    inProgressSkills: ["Data Structures", "Python", "Cloud"],
    projects: [
      {
        id: "proj_01",
        title: "Campus Connect Portal",
        description: "A full-stack collaborative hub for SVIT campus clubs and technical chapters.",
        techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        link: "https://github.com/demo/campus-connect",
        completed: true
      },
      {
        id: "proj_02",
        title: "Smart Attendance System",
        description: "IoT and Computer Vision based classroom attendance tracker prototype.",
        techStack: ["Python", "OpenCV", "Flask"],
        link: "https://github.com/demo/smart-attendance",
        completed: false
      }
    ],
    certifications: [
      {
        id: "cert_01",
        title: "Meta Front-End Developer Professional Certificate",
        issuer: "Coursera / Meta",
        date: "2025-12-10",
        credentialUrl: "https://coursera.org/verify/DEMO123"
      }
    ],
    internships: [
      {
        id: "intern_01",
        company: "TechNova Solutions [DEMO]",
        role: "Web Development Intern",
        duration: "2 Months (Summer 2025)",
        status: "Completed"
      }
    ],
    resumeDetails: {
      headline: "Full-Stack Developer | B.Tech CSE Student at SVIT",
      objective: "Motivated 3rd Year B.Tech CSE student seeking a Software Developer role where I can leverage my skills in modern web development, algorithms, and collaborative problem-solving to create impactful products.",
      linkedIn: "https://linkedin.com/in/demo-student-svit",
      github: "https://github.com/demo-svit-coder",
      languages: ["English (Fluent)", "Hindi (Proficient)", "Telugu (Native)"],
      achievements: [
        "Finalist at SVIT Inter-College Hackathon 2025",
        "Top 10% in SVIT CodeSprint Programming Challenge",
        "Active member of SVIT Coding & Innovation Club"
      ]
    },
    // Career readiness factors (0 to 100)
    readinessFactors: {
      skillsScore: 75,
      projectsScore: 80,
      internshipScore: 70,
      resumeScore: 85,
      aptitudeScore: 70,
      communicationScore: 85,
      certificationsScore: 60,
      interviewPrepScore: 65
    }
  }
];

export const seedSkills = [
  // Programming
  { _id: "sk_c", name: "C", category: "Programming", icon: "Code", description: "Fundamental procedural language for memory management and OS concepts.", beginner: ["Data types, loops, conditionals", "Functions & arrays", "Pointers basics"], intermediate: ["Dynamic memory allocation (malloc/free)", "Structures & unions", "File I/O"], advanced: ["Custom data structures (linked lists, trees)", "Bitwise manipulation", "Memory optimization"] },
  { _id: "sk_cpp", name: "C++", category: "Programming", icon: "Cpu", description: "High-performance object-oriented programming language for competitive coding and system dev.", beginner: ["Syntax & control flow", "Functions & references", "Basic OOP (Classes/Objects)"], intermediate: ["Inheritance, Polymorphism & Encapsulation", "STL (Vectors, Maps, Sets)", "Templates"], advanced: ["Custom STL allocators", "Smart Pointers & RAII", "Concurrency & Multithreading"] },
  { _id: "sk_java", name: "Java", category: "Programming", icon: "Coffee", description: "Enterprise-grade robust OOP language widely used in backend, Android, and placements.", beginner: ["Variables, loops, arrays", "Class definitions, methods", "Access modifiers"], intermediate: ["OOP Concepts deep dive", "Collections Framework", "Exception handling & File I/O"], advanced: ["Multithreading & Concurrency", "JVM Internals & Garbage Collection", "Spring Boot Basics"] },
  { _id: "sk_python", name: "Python", category: "Programming", icon: "FileCode", description: "Versatile, high-level language essential for AI/ML, Data Science, and rapid prototyping.", beginner: ["Variables, lists, dicts, tuples", "Functions & modules", "List comprehensions"], intermediate: ["OOP in Python", "File handling & Regex", "Virtual environments & pip"], advanced: ["Generators & Decorators", "NumPy, Pandas, Matplotlib", "AsyncIO & Metaclasses"] },
  { _id: "sk_js", name: "JavaScript", category: "Programming", icon: "Code2", description: "Core scripting language of the web for client-side and server-side development.", beginner: ["Variables (let/const), functions", "DOM manipulation & events", "Arrays & Objects"], intermediate: ["ES6+ syntax (Arrow, Destructuring)", "Promises & Async/Await", "Closures & Scope"], advanced: ["Event loop & Microtasks", "Prototypes & Inheritance", "Module bundlers & Performance"] },

  // Development
  { _id: "sk_html", name: "HTML", category: "Development", icon: "Globe", description: "Semantic markup standard for web applications and accessible interfaces.", beginner: ["Semantic tags (header, nav, main, section)", "Forms & Inputs", "Media elements"], intermediate: ["Canvas & SVG basics", "Accessibility (ARIA attributes)", "SEO meta tags"], advanced: ["Web components & Shadow DOM", "Microdata & OpenGraph", "Performance optimization"] },
  { _id: "sk_css", name: "CSS", category: "Development", icon: "Layout", description: "Styling and responsive design systems for modern digital experiences.", beginner: ["Box model, selectors, colors", "Typography & units", "Basic flexbox"], intermediate: ["CSS Grid & complex Flexbox", "Media queries & responsive design", "CSS Variables & animations"], advanced: ["Modern CSS architecture (BEM, CSS Modules)", "Tailwind CSS mastery", "Hardware-accelerated transitions"] },
  { _id: "sk_react", name: "React", category: "Development", icon: "Component", description: "Component-based declarative UI library for modern single-page applications.", beginner: ["JSX syntax", "Functional components & Props", "useState & useEffect hooks"], intermediate: ["Custom hooks & useReducer", "Context API & State management", "React Router navigation"], advanced: ["Performance optimization (useMemo, useCallback)", "Server-side rendering (Next.js)", "Component design patterns"] },
  { _id: "sk_node", name: "Node.js", category: "Development", icon: "Server", description: "Scalable JavaScript runtime for high-throughput backend APIs and microservices.", beginner: ["Node runtime basics & npm", "Built-in modules (fs, path, http)", "Creating basic HTTP server"], intermediate: ["Express.js framework & routing", "Middleware architecture", "RESTful API design & JWT auth"], advanced: ["Streams & Buffers", "Clustering & Worker threads", "Microservices & Message queues"] },
  { _id: "sk_sql", name: "SQL", category: "Development", icon: "Database", description: "Relational database query language for data integrity and ACID transactions.", beginner: ["SELECT, WHERE, ORDER BY", "INSERT, UPDATE, DELETE", "Basic data types & tables"], intermediate: ["INNER, LEFT, RIGHT JOINs", "GROUP BY & Aggregate functions", "Primary & Foreign keys"], advanced: ["Indexes & Query execution plans", "Subqueries & Common Table Expressions", "Transactions & ACID compliance"] },

  // Advanced
  { _id: "sk_aiml", name: "AI/ML", category: "Advanced", icon: "Brain", description: "Artificial Intelligence, Machine Learning algorithms, and neural networks.", beginner: ["Linear Regression & Classification", "Supervised vs Unsupervised learning", "Scikit-Learn basics"], intermediate: ["Decision Trees, Random Forests, SVM", "Model evaluation & Cross-validation", "Deep Learning basics (PyTorch/TensorFlow)"], advanced: ["Convolutional & Recurrent Neural Nets", "Transformers & LLMs (Hugging Face)", "MLOps & Model Deployment"] },
  { _id: "sk_cloud", name: "Cloud", category: "Advanced", icon: "Cloud", description: "Cloud computing infrastructure, serverless architectures, and managed services.", beginner: ["Cloud fundamentals (IaaS, PaaS, SaaS)", "AWS/Azure/GCP core concepts", "Virtual Machines & Object storage (S3)"], intermediate: ["Serverless functions (Lambda)", "VPC, Subnets & Security groups", "Database services (RDS, DynamoDB)"], advanced: ["Infrastructure as Code (Terraform)", "Multi-cloud architecture & Auto-scaling", "Cost optimization & Cloud security"] },
  { _id: "sk_devops", name: "DevOps", category: "Advanced", icon: "GitBranch", description: "Continuous Integration, Continuous Deployment, containerization, and monitoring.", beginner: ["Git branching strategies", "Linux command line & Bash scripting", "Docker basics & Dockerfile"], intermediate: ["Docker Compose multi-container", "CI/CD pipelines (GitHub Actions)", "Kubernetes basics (Pods, Services)"], advanced: ["Helm charts & K8s cluster management", "Prometheus & Grafana monitoring", "GitOps & ArgoCD"] },
  { _id: "sk_cyber", name: "Cybersecurity", category: "Advanced", icon: "Shield", description: "Defensive and offensive security, web vulnerabilities, and secure coding.", beginner: ["OWASP Top 10 vulnerabilities", "Authentication vs Authorization", "Cryptography basics (Hashing, Encryption)"], intermediate: ["Network security & Wireshark", "Web app pentesting basics", "JWT security & CORS/CSRF defense"], advanced: ["Zero Trust architecture", "Reverse engineering & exploit analysis", "Security incident response & SIEM"] },
  { _id: "sk_iot", name: "IoT", category: "Advanced", icon: "Wifi", description: "Internet of Things, microcontrollers, sensor integration, and embedded communication.", beginner: ["Arduino & ESP32 basics", "Sensor interfacing (Temp, PIR, Ultrasonic)", "GPIO programming"], intermediate: ["MQTT & HTTP protocols for IoT", "Cloud IoT hubs (AWS IoT Core)", "Edge computing fundamentals"], advanced: ["Real-time OS (FreeRTOS)", "Low-power WAN (LoRaWAN)", "Secure IoT device provisioning"] },
  { _id: "sk_ds", name: "Data Science", category: "Advanced", icon: "BarChart3", description: "Exploratory data analysis, statistical modeling, and data-driven insights.", beginner: ["Pandas & NumPy data manipulation", "Matplotlib & Seaborn visualizations", "Descriptive statistics"], intermediate: ["Feature engineering & data cleaning", "Hypothesis testing & Inferential stats", "Time series analysis"], advanced: ["Big Data tools (Apache Spark)", "Automated ML pipelines", "Business intelligence dashboards"] },

  // Soft Skills
  { _id: "sk_comm", name: "Communication", category: "Soft Skills", icon: "MessageSquare", description: "Clear, concise verbal and written technical communication for cross-functional teams.", beginner: ["Active listening techniques", "Structured email etiquette", "Clear technical explanations"], intermediate: ["Delivering technical presentations", "Cross-team collaboration", "Constructive peer feedback"], advanced: ["Executive presentations", "Crisis communication & conflict resolution", "Client-facing project pitches"] },
  { _id: "sk_lead", name: "Leadership", category: "Soft Skills", icon: "Users", description: "Leading engineering teams, project ownership, and mentoring peers.", beginner: ["Taking initiative in team projects", "Time management & accountability", "Supporting team goals"], intermediate: ["Leading agile standups & sprints", "Delegating tasks effectively", "Mentoring junior students"], advanced: ["Vision setting & strategic planning", "Conflict resolution in high-stakes projects", "Team motivation & recognition"] },
  { _id: "sk_ps", name: "Problem Solving", category: "Soft Skills", icon: "Sparkles", description: "Analytical mindset, structured debugging, and algorithmic thinking under constraints.", beginner: ["Breaking down problems into subproblems", "Dry-running code with test cases", "Identifying edge cases"], intermediate: ["Root cause analysis (5 Whys)", "Optimizing time/space complexity", "Pattern recognition across coding problems"], advanced: ["System architecture problem solving", "Designing for scale and fault tolerance", "Innovative workarounds under technical limits"] },
  { _id: "sk_pres", name: "Presentation", category: "Soft Skills", icon: "Video", description: "Creating compelling slide decks, project demos, and public speaking confidence.", beginner: ["Slide structure and minimal text", "Pacing and voice modulation", "Answering audience questions"], intermediate: ["Live software demonstrations", "Handling technical Q&A gracefully", "Storytelling for engineering projects"], advanced: ["Conference keynote presentations", "Investor & stakeholder pitch decks", "Panel discussions and debates"] },
  { _id: "sk_interview", name: "Interview Skills", category: "Soft Skills", icon: "UserCheck", description: "Mastering behavioral (STAR method), technical rounds, and salary negotiation.", beginner: ["Self-introduction elevator pitch", "Understanding common HR questions", "Professional body language"], intermediate: ["STAR method for behavioral questions", "Whiteboard coding communication", "Asking intelligent questions to interviewers"], advanced: ["Handling high-pressure stress interviews", "System design interview dialogue", "Offer evaluation & career negotiation"] }
];

export const seedCareerPaths = [
  {
    _id: "cp_swe",
    slug: "software-developer",
    title: "Software Developer",
    category: "Software Engineering",
    description: "Design, build, and maintain software applications, web systems, and scalable backend architectures.",
    estimatedDuration: "8 - 12 Months",
    avgStartingPackageRange: "Demo: ₹5 LPA - ₹18 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Programming Fundamentals", description: "Master C++, Java, or Python syntax, loops, and OOP concepts.", recommendedResources: ["C++ Primer", "Java Standard Library"] },
      { id: "m2", title: "Data Structures & Algorithms", description: "Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, DP.", recommendedResources: ["LeetCode 75", "Striver A2Z Sheet"] },
      { id: "m3", title: "Version Control (Git & GitHub)", description: "Git commits, branching, merging, PRs, and team collaboration workflows.", recommendedResources: ["Git Pro Book", "GitHub Actions"] },
      { id: "m4", title: "Web Development Stack", description: "Frontend (HTML, CSS, React) and Backend (Node.js, Express, REST APIs).", recommendedResources: ["FullStackOpen", "MDN Web Docs"] },
      { id: "m5", title: "Full-Stack Project Portfolio", description: "Build and deploy 2-3 production-grade full-stack projects.", recommendedResources: ["Production Deployment Guide"] },
      { id: "m6", title: "Internship Experience", description: "Gain practical industry exposure through software internships.", recommendedResources: ["SVIT Internship Portal"] },
      { id: "m7", title: "ATS Resume & GitHub Polish", description: "Craft a high-scoring ATS resume and highlight production code.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m8", title: "Aptitude & Coding Practice", description: "Quantitative aptitude, logical reasoning, and timed coding rounds.", recommendedResources: ["IndiaBix", "GeeksforGeeks"] },
      { id: "m9", title: "Technical & System Design Interviews", description: "Core CS subjects (DBMS, OS, CN) + LLD/HLD basics.", recommendedResources: ["Grokking System Design"] },
      { id: "m10", title: "Campus & Off-Campus Placements", description: "Participate in drives, mock interviews, and technical screening.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_aiml",
    slug: "aiml-engineer",
    title: "AI/ML Engineer",
    category: "Data & AI",
    description: "Build intelligent algorithms, neural networks, machine learning pipelines, and generative AI systems.",
    estimatedDuration: "10 - 14 Months",
    avgStartingPackageRange: "Demo: ₹6 LPA - ₹22 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Python & Mathematics for ML", description: "Linear algebra, multivariate calculus, probability & statistics.", recommendedResources: ["Khan Academy Math", "Python for Data Analysis"] },
      { id: "m2", title: "Data Analysis & Visualization", description: "Master NumPy, Pandas, Matplotlib, and exploratory data analysis.", recommendedResources: ["Kaggle Micro-courses"] },
      { id: "m3", title: "Classical Machine Learning", description: "Regression, Classification, Clustering, Random Forests, Scikit-Learn.", recommendedResources: ["Hands-On ML with Scikit-Learn"] },
      { id: "m4", title: "Deep Learning Fundamentals", description: "Neural networks, Backpropagation, CNNs, RNNs using PyTorch.", recommendedResources: ["Fast.ai Deep Learning"] },
      { id: "m5", title: "NLP & Transformers / GenAI", description: "Attention mechanisms, Hugging Face, LLM fine-tuning, RAG pipelines.", recommendedResources: ["Hugging Face NLP Course"] },
      { id: "m6", title: "MLOps & Model Deployment", description: "Deploy models via FastAPI, Docker, and cloud inference endpoints.", recommendedResources: ["Full Stack Deep Learning"] },
      { id: "m7", title: "Kaggle & Open Source Contributions", description: "Compete in ML challenges and publish verified notebooks.", recommendedResources: ["Kaggle Competitions"] },
      { id: "m8", title: "AI/ML ATS Resume & Portfolio", description: "Document performance metrics (AUC, F1-Score) and live demos.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m9", title: "Technical Interview & Case Studies", description: "ML theory grilling, code challenges, and research paper reviews.", recommendedResources: ["Chip Huyen ML Interviews"] },
      { id: "m10", title: "Campus & Specialized AI Drives", description: "Target AI research labs, tech giants, and product startups.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_cloud_devops",
    slug: "cloud-engineer",
    title: "Cloud & DevOps Engineer",
    category: "Infrastructure",
    description: "Architect resilient cloud infrastructures, automate CI/CD pipelines, and manage Kubernetes clusters.",
    estimatedDuration: "8 - 12 Months",
    avgStartingPackageRange: "Demo: ₹5.5 LPA - ₹19 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Linux & Bash Scripting", description: "Command line, permissions, process management, and shell automation.", recommendedResources: ["Linux Journey"] },
      { id: "m2", title: "Computer Networking Essentials", description: "TCP/IP, DNS, HTTP/HTTPS, VPCs, Subnets, Routing.", recommendedResources: ["Networking for DevOps"] },
      { id: "m3", title: "Cloud Provider Mastery (AWS/Azure)", description: "Compute, storage, IAM, serverless, and load balancing.", recommendedResources: ["AWS Certified Solutions Architect Course"] },
      { id: "m4", title: "Containerization with Docker", description: "Dockerfiles, multi-stage builds, networking, volumes, compose.", recommendedResources: ["Docker Deep Dive"] },
      { id: "m5", title: "Orchestration with Kubernetes", description: "Deployments, Services, ConfigMaps, Ingress controllers, Helm.", recommendedResources: ["Kubernetes Up & Running"] },
      { id: "m6", title: "Infrastructure as Code (Terraform)", description: "Declarative cloud provisioning and state management.", recommendedResources: ["Terraform in Action"] },
      { id: "m7", title: "CI/CD Automation (GitHub Actions)", description: "Automated test suites, artifact building, and deployment pipelines.", recommendedResources: ["CI/CD Best Practices"] },
      { id: "m8", title: "Observability & Monitoring", description: "Prometheus, Grafana dashboards, and centralized log analysis.", recommendedResources: ["Observability Engineering"] },
      { id: "m9", title: "Cloud Resume & Architecture Portfolio", description: "Host architecture diagrams and cost-efficient cloud projects.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m10", title: "Cloud Technical Interviews", description: "Troubleshooting live outages and designing fault-tolerant clouds.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_cyber",
    slug: "cybersecurity",
    title: "Cybersecurity Analyst",
    category: "Security",
    description: "Protect systems, networks, and applications against security threats and perform vulnerability assessments.",
    estimatedDuration: "9 - 12 Months",
    avgStartingPackageRange: "Demo: ₹5 LPA - ₹16 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Networking & OS Fundamentals", description: "Packet analysis with Wireshark, OS internals (Windows/Linux).", recommendedResources: ["TryHackMe Pre-Security"] },
      { id: "m2", title: "Cryptography & Security Basics", description: "Symmetric/Asymmetric encryption, PKI, hashing, digital signatures.", recommendedResources: ["Crypto 101"] },
      { id: "m3", title: "Web Application Security", description: "OWASP Top 10: SQLi, XSS, CSRF, IDOR, and Burp Suite basics.", recommendedResources: ["PortSwigger Web Security Academy"] },
      { id: "m4", title: "Network Pentesting & Tools", description: "Nmap, Metasploit, Nessus vulnerability scanner.", recommendedResources: ["HackTheBox Academy"] },
      { id: "m5", title: "SOC & Defensive Security", description: "SIEM tools (Splunk), incident response, threat hunting.", recommendedResources: ["Splunk Fundamentals"] },
      { id: "m6", title: "Certifications (CompTIA Security+ / CEH)", description: "Prepare and earn recognized foundational cyber certifications.", recommendedResources: ["Security+ Prep"] },
      { id: "m7", title: "CTF Challenges & Writeups", description: "Participate in SVIT and global CTF competitions.", recommendedResources: ["CTFtime"] },
      { id: "m8", title: "Security Portfolio & Resume", description: "Document responsible disclosure reports and CTF badges.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m9", title: "Security Interview Prep", description: "Scenario-based incident handling and defense design.", recommendedResources: ["Cyber Interview Handbook"] },
      { id: "m10", title: "Security Auditing & Placements", description: "Target consulting, banking, and specialized cyber firms.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_data_science",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    description: "Extract actionable business insights from big data using statistics, predictive modeling, and BI dashboards.",
    estimatedDuration: "8 - 12 Months",
    avgStartingPackageRange: "Demo: ₹5.5 LPA - ₹18 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Python & Advanced SQL", description: "Complex queries, window functions, CTEs, and data extraction.", recommendedResources: ["SQL for Data Analysis"] },
      { id: "m2", title: "Statistical Methods & Probability", description: "Hypothesis testing, A/B test design, regression analysis.", recommendedResources: ["Practical Statistics for Data Scientists"] },
      { id: "m3", title: "Data Wrangling & Cleaning", description: "Handling missing values, outlier detection, data pipelines.", recommendedResources: ["Pandas Cookbook"] },
      { id: "m4", title: "Data Visualization (Tableau/PowerBI)", description: "Creating executive dashboards and compelling data narratives.", recommendedResources: ["Storytelling with Data"] },
      { id: "m5", title: "Predictive Modeling & Scikit-Learn", description: "Classification, regression, time series forecasting.", recommendedResources: ["Applied Predictive Modeling"] },
      { id: "m6", title: "Big Data & Spark", description: "Distributed data processing with PySpark on large datasets.", recommendedResources: ["Spark: The Definitive Guide"] },
      { id: "m7", title: "End-to-End Data Science Projects", description: "Customer churn prediction, sentiment analysis, sales forecasting.", recommendedResources: ["GitHub Data Portfolios"] },
      { id: "m8", title: "Data Science Resume & Portfolio", description: "Showcase business impact metrics and clean GitHub repos.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m9", title: "Business Case Interviews", description: "Solve real-world product analytics questions and estimation rounds.", recommendedResources: ["Ace the Data Science Interview"] },
      { id: "m10", title: "Analytics & Product Placements", description: "Target fintech, e-commerce, and analytics consultancies.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_embedded_iot",
    slug: "embedded-engineer",
    title: "Embedded & IoT Engineer",
    category: "Hardware & Systems",
    description: "Develop firmware, real-time operating systems (RTOS), and hardware-software connected smart devices.",
    estimatedDuration: "8 - 12 Months",
    avgStartingPackageRange: "Demo: ₹5 LPA - ₹15 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Embedded C & C++ Programming", description: "Pointers, memory-mapped I/O, bitwise registers.", recommendedResources: ["Making Embedded Systems"] },
      { id: "m2", title: "Microcontroller Architectures", description: "ARM Cortex-M, STM32, ESP32, AVR architectures.", recommendedResources: ["STM32 Bare-Metal Guide"] },
      { id: "m3", title: "Hardware Communication Protocols", description: "UART, SPI, I2C, CAN bus, and USB interfaces.", recommendedResources: ["Serial Protocols Handbook"] },
      { id: "m4", title: "Real-Time Operating Systems (FreeRTOS)", description: "Tasks, queues, semaphores, mutexes, and scheduling.", recommendedResources: ["Mastering FreeRTOS"] },
      { id: "m5", title: "Circuit Design & PCB Basics", description: "Schematic design and PCB layout in KiCad/Eagle.", recommendedResources: ["KiCad Tutorial Series"] },
      { id: "m6", title: "Wireless Protocols (BLE, Wi-Fi, Zigbee)", description: "Low power RF and IoT network topologies.", recommendedResources: ["IoT Wireless Standards"] },
      { id: "m7", title: "Hardware Prototype Projects", description: "Build telemetry systems or smart home controllers.", recommendedResources: ["SVIT Maker Lab Guide"] },
      { id: "m8", title: "Embedded Systems ATS Resume", description: "Highlight hardware debugging and firmware optimization.", recommendedResources: ["SVIT Resume Builder"] },
      { id: "m9", title: "Technical Core Interviews", description: "Circuit debugging, timing diagrams, memory leaks.", recommendedResources: ["Core Engineering Prep"] },
      { id: "m10", title: "Semiconductor & Automotive Drives", description: "Target VLSI, automotive electronics, and IoT firms.", recommendedResources: ["SVIT Placement Hub"] }
    ]
  },
  {
    _id: "cp_higher_studies",
    slug: "higher-studies",
    title: "Higher Studies (MS / M.Tech / PhD)",
    category: "Academic & Research",
    description: "Prepare for competitive exams (GATE, GRE, TOEFL, IELTS) and secure admissions in premier Indian and global institutions.",
    estimatedDuration: "12 - 18 Months",
    avgStartingPackageRange: "Advanced Specialization & Research Opportunities",
    milestones: [
      { id: "m1", title: "Goal Clarity: India (GATE) vs Abroad (GRE/IELTS)", description: "Evaluate academic interests, target programs, and financial pathways.", recommendedResources: ["Higher Studies Planner"] },
      { id: "m2", title: "Core Subject In-Depth Study", description: "Algorithms, OS, Theory of Computation, Computer Networks, Linear Algebra.", recommendedResources: ["GATE CSE Standard Textbooks"] },
      { id: "m3", title: "Standardized Exam Preparation", description: "GATE / GRE / TOEFL / IELTS structured study plan.", recommendedResources: ["Official ETS & GATE Portals"] },
      { id: "m4", title: "Academic Research & Publications", description: "Write research papers or work with SVIT faculty on projects.", recommendedResources: ["IEEE / ACM Student Chapters"] },
      { id: "m5", title: "Drafting Statement of Purpose (SOP)", description: "Write personalized SOPs detailing research vision and motivations.", recommendedResources: ["SOP Review Guidelines"] },
      { id: "m6", title: "Securing Letters of Recommendation (LOR)", description: "Request strong academic and project recommendations.", recommendedResources: ["SVIT Faculty Desk"] },
      { id: "m7", title: "University Shortlisting & Application Deadlines", description: "Categorize universities into Ambitious, Target, and Safe.", recommendedResources: ["QS World University Rankings"] },
      { id: "m8", title: "Scholarship & Financial Aid Applications", description: "Apply for DAAD, Fulbright, university assistantships (TA/RA).", recommendedResources: ["Scholarship Directory"] },
      { id: "m9", title: "Visa Interview & Documentation", description: "F-1 / Student Visa documentation, financial proofs, mock interviews.", recommendedResources: ["Embassy Guidelines"] },
      { id: "m10", title: "Enrollment & Orientation", description: "Finalize admissions and join university cohorts.", recommendedResources: ["Alumni Network"] }
    ]
  },
  {
    _id: "cp_mba",
    slug: "mba",
    title: "Management & MBA (CAT / GMAT)",
    category: "Management",
    description: "Transition into tech management, consulting, and business leadership through top B-Schools (IIMs / Global MBA).",
    estimatedDuration: "9 - 15 Months",
    avgStartingPackageRange: "Demo: ₹14 LPA - ₹32 LPA [DEMO DATA]",
    milestones: [
      { id: "m1", title: "Understanding MBA Pathways", description: "Explore Specializations (Tech Management, Product, Finance, Consulting).", recommendedResources: ["MBA Roadmap"] },
      { id: "m2", title: "Quantitative Aptitude Mastery", description: "Arithmetic, Algebra, Geometry, Modern Math for CAT/GMAT.", recommendedResources: ["Arun Sharma CAT Prep"] },
      { id: "m3", title: "Data Interpretation & Logical Reasoning (DILR)", description: "Matrix puzzles, games, network charts, and binary logic.", recommendedResources: ["DILR Practice Vault"] },
      { id: "m4", title: "Verbal Ability & Reading Comprehension (VARC)", description: "Daily reading of philosophy, economics, science, and grammar.", recommendedResources: ["Aeon Essays", "The Economist"] },
      { id: "m5", title: "Mock Test Series & Percentile Analysis", description: "Take 30+ full-length CAT/GMAT mocks under timed conditions.", recommendedResources: ["National Test Series"] },
      { id: "m6", title: "Profile Building & Extracurriculars", description: "Leadership roles in SVIT student bodies, social projects, and internships.", recommendedResources: ["SVIT Student Council"] },
      { id: "m7", title: "Written Ability Test (WAT) & Essays", description: "Structured argumentation on current economic and geopolitical issues.", recommendedResources: ["WAT Editorial Review"] },
      { id: "m8", title: "Group Discussion & Extempore Practice", description: "Mastering GD dynamics, entry strategies, and consensus building.", recommendedResources: ["Mock GD Sessions"] },
      { id: "m9", title: "Personal Interview (PI) Mastery", description: "Defending academic choices, career shift, and situational leadership.", recommendedResources: ["B-School PI Handbook"] },
      { id: "m10", title: "Final B-School Conversion", description: "Select best-fit institution and prepare for pre-MBA bootcamps.", recommendedResources: ["IIM Admission Portals"] }
    ]
  }
];

export const seedCompanies = [
  {
    _id: "comp_01",
    name: "Tata Consultancy Services (TCS) [DEMO]",
    industry: "Information Technology & Consulting",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80",
    description: "Global leader in IT services, consulting, and business solutions.",
    isDemo: true,
    jobRoles: ["Ninja Developer", "Digital Innovator", "Prime Specialist"],
    packageRange: "Demo: ₹3.6 - ₹9.0 LPA [DEMO DATA]",
    eligibility: "B.Tech (All Branches), 60% or 6.0 CGPA throughout 10th, 12th & Graduation, Max 1 active backlog allowed.",
    hiringProcess: [
      "TCS NQT Online Aptitude & Coding Test",
      "Technical Interview (Core CS, Projects, OOP)",
      "Managerial Round (Scenario-based problem solving)",
      "HR Interview (Culture fit, flexibility)"
    ],
    requiredSkills: ["C", "Java", "Python", "SQL", "Quantitative Aptitude", "OOP"],
    preparationTips: [
      "Focus heavily on TCS NQT previous year quantitative and reasoning questions.",
      "Be prepared to explain your final-year SVIT project architecture in detail.",
      "Practice basic hands-on coding (strings, arrays, pattern printing)."
    ],
    officialWebsite: "https://www.tcs.com/careers"
  },
  {
    _id: "comp_02",
    name: "Infosys [DEMO]",
    industry: "IT Services & Digital Transformation",
    logoUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=120&auto=format&fit=crop&q=80",
    description: "Multinational information technology company providing next-generation digital services.",
    isDemo: true,
    jobRoles: ["System Engineer (SE)", "Specialist Programmer (SP)", "Digital Specialist Engineer (DSE)"],
    packageRange: "Demo: ₹3.6 - ₹9.5 LPA [DEMO DATA]",
    eligibility: "B.Tech CSE/ECE/EEE/Mech/Civil, 65% aggregate, No active backlogs.",
    hiringProcess: [
      "Online Assessment (Reasoning, Technical Data Sufficiency, Coding)",
      "Technical Assessment (HackWithInfy / InfyTQ / Online Drive)",
      "Technical + HR Combined Virtual Interview"
    ],
    requiredSkills: ["Java", "Python", "Data Structures", "DBMS", "Aptitude"],
    preparationTips: [
      "Strong command on Data Structures (Greedy, Dynamic Programming, Graphs).",
      "InfyTQ certification provides direct interview fast-track.",
      "Practice clean code habits with time and space complexity explanations."
    ],
    officialWebsite: "https://www.infosys.com/careers.html"
  },
  {
    _id: "comp_03",
    name: "Amazon [DEMO]",
    industry: "E-Commerce, Cloud & AI",
    logoUrl: "https://images.unsplash.com/photo-1523474253246-72fb9c27030d?w=120&auto=format&fit=crop&q=80",
    description: "Global technology enterprise focused on cloud computing, e-commerce, and AI innovation.",
    isDemo: true,
    jobRoles: ["Software Development Engineer (SDE-1)", "Cloud Support Associate", "Data Associate"],
    packageRange: "Demo: ₹16.0 - ₹32.0 LPA [DEMO DATA]",
    eligibility: "B.Tech in CSE / ECE / IT or related disciplines, 7.0+ CGPA preferred, No active backlogs.",
    hiringProcess: [
      "Online Assessment 1 (Code Signal / HackerRank - 2 Hard DSA problems + Work Style Survey)",
      "Technical Round 1 (Data Structures, Algorithms, Complexity Analysis)",
      "Technical Round 2 (Object-Oriented Design & Problem Solving)",
      "Bar Raiser Round (Amazon Leadership Principles + System Architecture)"
    ],
    requiredSkills: ["Data Structures & Algorithms", "C++ / Java", "System Design Basics", "Amazon 16 Leadership Principles"],
    preparationTips: [
      "Thoroughly master LeetCode Medium/Hard problems on Trees, Graphs, and DP.",
      "Frame every behavioral answer using the STAR method mapped to Amazon Leadership Principles.",
      "Write fully working, bug-free code on whiteboard/collaborative editor without IDE autocomplete."
    ],
    officialWebsite: "https://www.amazon.jobs"
  },
  {
    _id: "comp_04",
    name: "Microsoft [DEMO]",
    industry: "Cloud, Software & AI Enterprise",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    description: "Pioneer in computing, enterprise cloud (Azure), AI, and developer tools.",
    isDemo: true,
    jobRoles: ["Software Engineer (SWE)", "Support Engineer", "Program Manager"],
    packageRange: "Demo: ₹18.0 - ₹35.0 LPA [DEMO DATA]",
    eligibility: "B.Tech (All engineering branches), CGPA 7.5+, Clean academic record.",
    hiringProcess: [
      "Online Coding Challenge (3 Algorithmic Problems in 90 mins)",
      "Technical Round 1 (DSA + Code Optimization)",
      "Technical Round 2 (System Architecture & Concurrency)",
      "Managerial / Director Round (Growth Mindset & Culture Fit)"
    ],
    requiredSkills: ["DSA Mastery", "C++ / C# / Java", "System Design", "Operating Systems & Concurrency"],
    preparationTips: [
      "Deep understanding of OS concepts: virtual memory, threads, synchronization locks.",
      "Showcase your growth mindset and how you learn from technical failures.",
      "Emphasize modular and unit-testable code during problem solving."
    ],
    officialWebsite: "https://careers.microsoft.com"
  },
  {
    _id: "comp_05",
    name: "Qualcomm [DEMO]",
    industry: "Semiconductors & Wireless Telecom",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80",
    description: "World leader in wireless tech, 5G chipsets, and embedded telecommunications systems.",
    isDemo: true,
    jobRoles: ["Associate Engineer - Embedded", "Modem Software Engineer", "Hardware Engineer"],
    packageRange: "Demo: ₹12.0 - ₹20.0 LPA [DEMO DATA]",
    eligibility: "B.Tech ECE, EEE, CSE with 7.0+ CGPA, solid fundamentals in digital logic & C.",
    hiringProcess: [
      "Online Written Test (C Programming, Digital Electronics, OS, Aptitude)",
      "Technical Interview 1 (Pointers, Memory Allocation, Bitwise, Microcontrollers)",
      "Technical Interview 2 (Protocols, RTOS, Device Drivers, Digital Circuits)",
      "HR & Fitment Interview"
    ],
    requiredSkills: ["Embedded C", "Microcontrollers", "RTOS", "Computer Architecture", "Digital Electronics"],
    preparationTips: [
      "Master pointer arithmetic, bit masking, and volatile/static keywords in C.",
      "Review microcontroller peripheral interfaces: UART, SPI, I2C, and interrupts.",
      "Be ready to trace code execution line-by-line with memory layouts."
    ],
    officialWebsite: "https://www.qualcomm.com/company/careers"
  }
];

export const seedInternships = [
  {
    _id: "int_01",
    title: "Full-Stack Web Development Intern [DEMO]",
    company: "Apex Tech Labs [DEMO]",
    location: "Hyderabad / Hybrid",
    workType: "Hybrid",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    duration: "3 Months (Starts June 2026)",
    stipend: "₹15,000 / month [DEMO DATA]",
    deadline: "2026-04-30",
    description: "Collaborate with senior software engineers to build customer-facing dashboards and microservice endpoints.",
    isDemo: true,
    requirements: [
      "Enrolled in 2nd or 3rd year B.Tech (CSE/ECE/IT)",
      "Strong fundamentals in HTML, CSS, JavaScript, React",
      "Experience with REST APIs and Git",
      "Good problem solving and teamwork mindset"
    ]
  },
  {
    _id: "int_02",
    title: "Machine Learning Research Intern [DEMO]",
    company: "NeuroData Systems [DEMO]",
    location: "Bangalore / Remote",
    workType: "Remote",
    techStack: ["Python", "PyTorch", "NumPy", "Pandas", "Scikit-Learn"],
    duration: "6 Months",
    stipend: "₹25,000 / month [DEMO DATA]",
    deadline: "2026-05-15",
    description: "Work on computer vision model optimization, dataset pipeline engineering, and benchmark evaluations.",
    isDemo: true,
    requirements: [
      "Familiarity with PyTorch or TensorFlow",
      "Understanding of CNN architectures and data augmentation",
      "Strong Python coding skills and math fundamentals"
    ]
  },
  {
    _id: "int_03",
    title: "Cloud Infrastructure & DevOps Intern [DEMO]",
    company: "CloudScale Matrix [DEMO]",
    location: "Hyderabad",
    workType: "On-site",
    techStack: ["AWS", "Docker", "Linux", "GitHub Actions", "Bash"],
    duration: "2 Months (Summer 2026)",
    stipend: "₹18,000 / month [DEMO DATA]",
    deadline: "2026-05-10",
    description: "Assist in automating container builds, setting up monitoring alerts, and managing staging environments on AWS.",
    isDemo: true,
    requirements: [
      "Basic knowledge of Linux commands and Docker",
      "Understanding of cloud computing (AWS/Azure)",
      "Curious and proactive troubleshooting attitude"
    ]
  },
  {
    _id: "int_04",
    title: "Embedded Systems & Firmware Intern [DEMO]",
    company: "Veloctron Robotics [DEMO]",
    location: "Secunderabad / On-site",
    workType: "On-site",
    techStack: ["Embedded C", "ESP32", "FreeRTOS", "MQTT", "KiCad"],
    duration: "4 Months",
    stipend: "₹12,000 / month [DEMO DATA]",
    deadline: "2026-04-20",
    description: "Develop firmware for smart sensor nodes, optimize battery management routines, and test hardware prototypes.",
    isDemo: true,
    requirements: [
      "B.Tech in ECE / EEE / CSE",
      "Hands-on experience with Arduino or ESP32 microcontrollers",
      "Knowledge of I2C and SPI communication protocols"
    ]
  },
  {
    _id: "int_05",
    title: "Cybersecurity Analyst Intern [DEMO]",
    company: "ShieldDefense Cyber Solutions [DEMO]",
    location: "Remote",
    workType: "Remote",
    techStack: ["Wireshark", "Burp Suite", "Nmap", "OWASP", "Linux"],
    duration: "3 Months",
    stipend: "₹16,000 / month [DEMO DATA]",
    deadline: "2026-05-01",
    description: "Participate in vulnerability scanning, log analysis, and assisting security consultants on web application security audits.",
    isDemo: true,
    requirements: [
      "Knowledge of OWASP Top 10 vulnerabilities",
      "Familiarity with networking concepts (IP, Port, DNS, HTTP)",
      "High ethical standards and analytical mindset"
    ]
  }
];

export const seedEvents = [
  {
    _id: "ev_01",
    title: "SVIT CodeQuest 2026 - Annual 24h Hackathon [DEMO]",
    category: "Hackathons",
    organizer: "SVIT Department of CSE & Innovation Cell",
    date: "2026-04-12",
    time: "09:00 AM - Next Day 09:00 AM",
    location: "SVIT Central Seminar Hall & Tech Labs",
    description: "Build groundbreaking software and hardware solutions addressing healthcare, sustainability, and smart campus challenges. Exciting demo prizes and certificates!",
    isDemo: true,
    registrationLink: "#demo-register-hackathon",
    tags: ["Coding", "Hackathon", "Innovation", "Cash Prizes"]
  },
  {
    _id: "ev_02",
    title: "Placement Masterclass: Cracking Technical & HR Rounds [DEMO]",
    category: "Placement Drives",
    organizer: "SVIT Training & Placement Cell",
    date: "2026-04-18",
    time: "02:00 PM - 05:00 PM",
    location: "SVIT Auditorium / Live Streaming",
    description: "Interactive session by industry veterans covering live mock interviews, ATS resume hacks, and company-specific coding patterns.",
    isDemo: true,
    registrationLink: "#demo-register-masterclass",
    tags: ["Placements", "Interviews", "Career Guidance"]
  },
  {
    _id: "ev_03",
    title: "Hands-on Workshop: Building Scalable Cloud Apps with AWS [DEMO]",
    category: "Workshops",
    organizer: "SVIT Cloud & DevOps Student Chapter",
    date: "2026-04-25",
    time: "10:00 AM - 04:00 PM",
    location: "Computer Lab 3, SVIT Campus",
    description: "Learn to containerize microservices, deploy on AWS Elastic Container Service (ECS), and configure CI/CD with GitHub Actions.",
    isDemo: true,
    registrationLink: "#demo-register-cloud-workshop",
    tags: ["AWS", "Docker", "DevOps", "Hands-on"]
  },
  {
    _id: "ev_04",
    title: "Higher Education Abroad: GRE, TOEFL & Ivy League Pathways [DEMO]",
    category: "Seminars",
    organizer: "SVIT International Studies Desk",
    date: "2026-05-02",
    time: "11:00 AM - 01:00 PM",
    location: "Virtual Webinar (Google Meet)",
    description: "Comprehensive guidance on university selection in the US, Germany, UK, drafting stellar SOPs, and securing research assistantships.",
    isDemo: true,
    registrationLink: "#demo-register-higher-studies",
    tags: ["Higher Studies", "MS in US", "Scholarships", "GRE"]
  }
];

export const seedResources = [
  {
    _id: "res_01",
    title: "C & C++ Complete Placement Cheatsheet & Memory Model",
    category: "C Programming",
    difficulty: "Beginner",
    duration: "4 Hours",
    type: "Document & Code",
    description: "Comprehensive review of pointers, dynamic memory, memory leaks, macro pitfalls, and standard interview coding questions in C.",
    link: "https://www.learn-c.org/",
    isDemo: true
  },
  {
    _id: "res_02",
    title: "Java 21 Mastery: OOP, Collections & Concurrency Deep Dive",
    category: "Java",
    difficulty: "Intermediate",
    duration: "8 Hours",
    type: "Video Series & Notes",
    description: "Master the Java Collections Framework (ArrayList, HashMap, TreeMap, PriorityQueue) and multithreading synchronization patterns.",
    link: "https://dev.java/learn/",
    isDemo: true
  },
  {
    _id: "res_03",
    title: "Python for Data Structures and Machine Learning Kickstart",
    category: "Python",
    difficulty: "Beginner",
    duration: "6 Hours",
    type: "Interactive Tutorial",
    description: "Pythonic idioms, list comprehensions, NumPy arrays, Pandas DataFrames, and clean algorithmic problem solving.",
    link: "https://docs.python.org/3/tutorial/",
    isDemo: true
  },
  {
    _id: "res_04",
    title: "Full-Stack Modern Web Blueprint (React + Node.js + Tailwind)",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "12 Hours",
    type: "Project Tutorial",
    description: "Build an end-to-end production web application with JWT authentication, responsive UI components, and RESTful APIs.",
    link: "https://fullstackopen.com/en/",
    isDemo: true
  },
  {
    _id: "res_05",
    title: "Data Structures & Algorithms 100-Day Placement Roadmap",
    category: "Data Structures",
    difficulty: "Advanced",
    duration: "40 Hours",
    type: "Roadmap & Code",
    description: "Curated collection of 150 top placement problems spanning Trees, Dynamic Programming, Graphs, Sliding Window, and Bit Manipulation.",
    link: "https://leetcode.com/explore/",
    isDemo: true
  },
  {
    _id: "res_06",
    title: "DBMS: SQL Queries, Normalization, Indexing & ACID Transactions",
    category: "DBMS",
    difficulty: "Intermediate",
    duration: "6 Hours",
    type: "Interview Guide",
    description: "Comprehensive notes for technical interview rounds: 1NF-BCNF, B-Trees vs Hash Indexes, Transaction Isolation Levels, and Query Optimization.",
    link: "https://use-the-index-luke.com/",
    isDemo: true
  },
  {
    _id: "res_07",
    title: "Operating Systems Core Concepts: Processes, Threads & Memory",
    category: "Operating Systems",
    difficulty: "Intermediate",
    duration: "7 Hours",
    type: "Study Notes",
    description: "Everything required for technical interviews: Process Scheduling, Deadlocks, Semaphores, Paging, Virtual Memory, and Linux Shell.",
    link: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    isDemo: true
  },
  {
    _id: "res_08",
    title: "Computer Networks: OSI Model, TCP/IP, DNS & HTTP/3",
    category: "Computer Networks",
    difficulty: "Intermediate",
    duration: "5 Hours",
    type: "Interactive Guide",
    description: "Deep dive into 3-way handshakes, subnetting calculations, routing algorithms, SSL/TLS certificates, and REST/WebSocket protocols.",
    link: "https://www.cloudflare.com/learning/",
    isDemo: true
  },
  {
    _id: "res_09",
    title: "Quantitative Aptitude & Logical Reasoning Formula Bank",
    category: "Aptitude",
    difficulty: "Beginner",
    duration: "10 Hours",
    type: "Formula Book & Practice",
    description: "Speed math shortcuts, Time & Work, Speed Distance Time, Permutation & Combination, Syllogisms, and Blood Relations.",
    link: "https://www.indiabix.com/aptitude/questions-and-answers/",
    isDemo: true
  },
  {
    _id: "res_10",
    title: "HR & Behavioral Interview Playbook (50+ STAR Method Answers)",
    category: "Interview Preparation",
    difficulty: "Beginner",
    duration: "3 Hours",
    type: "Playbook",
    description: "Master answers to 'Tell me about yourself', 'Why should we hire you?', 'Tell me about a time you failed', and salary negotiation tips.",
    link: "https://www.themuse.com/advice/star-interview-method",
    isDemo: true
  }
];

export const seedNotifications = [
  {
    _id: "notif_01",
    userId: "u_demo_student_01",
    title: "New Internship Opening Available",
    message: "Apex Tech Labs has listed a Full-Stack Web Development Internship [DEMO]. Application deadline is April 30, 2026.",
    type: "internship",
    isRead: false,
    link: "/internships",
    createdAt: new Date("2026-03-01T10:00:00Z")
  },
  {
    _id: "notif_02",
    userId: "u_demo_student_01",
    title: "Placement Preparation Session Scheduled",
    message: "SVIT Training & Placement Cell is hosting 'Placement Masterclass: Cracking Technical & HR Rounds' on April 18, 2026.",
    type: "placement",
    isRead: false,
    link: "/events",
    createdAt: new Date("2026-03-02T14:30:00Z")
  },
  {
    _id: "notif_03",
    userId: "u_demo_student_01",
    title: "Upcoming Event: SVIT CodeQuest 2026",
    message: "Annual 24-hour campus hackathon registration is now open! Form your teams of up to 4 members.",
    type: "event",
    isRead: true,
    link: "/events",
    createdAt: new Date("2026-02-28T09:00:00Z")
  },
  {
    _id: "notif_04",
    userId: "u_demo_student_01",
    title: "New Learning Resource Added",
    message: "A new study guide 'Java 21 Mastery & Concurrency Deep Dive' was added to the Resource Library.",
    type: "resource",
    isRead: true,
    link: "/resources",
    createdAt: new Date("2026-02-25T11:20:00Z")
  }
];

export const seedCollegeInfo = {
  institutionName: "Swami Vivekananda Institute of Technology (SVIT)",
  establishedYear: 2004,
  location: "Mahbub College Campus, Secunderabad, Telangana, India",
  affiliation: "Affiliated to JNTUH / Approved by AICTE, New Delhi",
  placementCellDesk: {
    heading: "Training & Placement Cell Welcome Note",
    message: "Welcome to the SVIT Student Career Hub. Our dedicated Training and Placement Cell works relentlessly to bridge academia and industry, fostering skills, competitive coding excellence, and leadership among our engineering graduates.",
    contactEmail: "placements@svit.ac.in",
    helpline: "Official placement contact and schedule announcements will be published here.",
    disclaimer: "Official information, verified recruitment notices, and accredited records are administered directly by SVIT Training & Placement Cell. All sample listings on this portal are marked as [DEMO DATA] for demonstration purposes."
  },
  departments: [
    { code: "CSE", name: "Computer Science and Engineering", intake: "Official intake details will be updated here" },
    { code: "ECE", name: "Electronics and Communication Engineering", intake: "Official intake details will be updated here" },
    { code: "EEE", name: "Electrical and Electronics Engineering", intake: "Official intake details will be updated here" },
    { code: "MECH", name: "Mechanical Engineering", intake: "Official intake details will be updated here" },
    { code: "CIVIL", name: "Civil Engineering", intake: "Official intake details will be updated here" },
    { code: "MBA", name: "Master of Business Administration", intake: "Official intake details will be updated here" }
  ],
  officialNotice: "Students are advised to verify all recruitment drive eligibility criteria and application deadlines via official SVIT placement circulars."
};
