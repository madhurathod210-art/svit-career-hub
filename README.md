# 🎓 SVIT Student Career Hub

A production-ready full-stack digital platform for students of **Swami Vivekananda Institute of Technology (SVIT)** combining a College Portal, Placement Hub, Interactive Career Planner, Student Dashboard, ATS Resume Builder, and Curated Learning Resource Platform.

---

## 🌟 Key Features

### 1. 🏛️ Institutional Landing Page
- Hero banner with SVIT branding: *"Build Your Future with SVIT"*.
- Dynamic, animated statistics for placement preparation, career paths, learning modules, and internships with explicit `[DEMO DATA]` compliance labels.
- Interactive 7-stage Career Journey roadmap pipeline.

### 2. 🔐 Authentication & Role-Based Access Control
- JWT-based authentication with bcrypt password hashing.
- Student registration capturing Full Name, Email, Student Roll ID, Department (CSE, ECE, EEE, Mechanical, Civil, Other), Year (1st - 4th), and CGPA.
- Instant post-registration redirect to personalized Student Dashboard.
- Protected routes for Student and Admin portals with role verification.
- **1-Click Demo Evaluation Accounts** for instant testing.

### 3. 📊 Student Career Dashboard
- Personalized greeting: *"Welcome, [Student Name] 👋"*.
- Metric cards for Career Readiness, Skills Mastered, Projects, Certifications, Internships, and Placement prep.
- **Career Readiness Score Engine** with a transparent multi-factor algorithm:
  - Skills: **20%**
  - Projects: **20%**
  - Internship: **15%**
  - Resume: **10%**
  - Aptitude: **10%**
  - Communication: **10%**
  - Certifications: **5%**
  - Interview Prep: **10%**
  - Dynamic Strong Areas, Improvement Alerts, and Recommended Next Actions.
- **My Career Journey** 7-step interactive progress pipeline (`Profile` → `Skills` → `Projects` → `Internship` → `Resume` → `Placement` → `Career`) with completion percentages.

### 4. 🧭 Interactive Career Planner & Roadmaps
- Career goal selector with 13+ specialized engineering and postgraduate paths:
  - *Software Developer, AI/ML Engineer, Data Scientist, Cybersecurity Analyst, Cloud & DevOps, Embedded & IoT, Core Engineering, Govt/GATE, MBA/CAT, Higher Studies, Tech Entrepreneurship*.
- Interactive roadmap with real-time 3-state milestone trackers:
  `Not Started` ➔ `In Progress` ➔ `Completed`.
- Real-time cloud synchronization with student profile.

### 5. 💼 Placement Hub
- Company directory cards (TCS, Infosys, Amazon, Microsoft, Qualcomm, etc.) featuring industry, job roles, eligibility, hiring process stages, and preparation tips.
- Quantitative aptitude and speed math formula sheets.
- Core CS technical interview question banks (DSA, DBMS, OS, Computer Networks).
- STAR Behavioral framework and **Interactive Mock Interview Simulator**.

### 6. 🌐 Internship Finder
- Multi-filtered search across technology stacks, locations (Hyderabad, Bangalore, Remote), work modes (Remote, Hybrid, On-site), duration, and stipends.
- Interactive application drawer and 1-click apply simulation with instant confirmation toast.

### 7. ⚡ Skills Explorer Matrix
- 4 comprehensive categories: **Programming**, **Development**, **Advanced Tech**, and **Soft Skills**.
- 3-tier milestone structure (Beginner, Intermediate, Advanced) with actionable topic syllabus.
- Direct progress tracking that updates the student's Career Readiness Score in real-time.

### 8. 🎓 Higher Education Planner
- **India Track**: Detailed guides for GATE (M.Tech at IITs/NITs with ₹12,400/mo stipend), CAT/XAT (IIMs & Top B-Schools), and NIMCET (MCA).
- **Abroad Track**: Comprehensive country guides (USA, Germany, Canada, UK, Australia) covering GRE, TOEFL, IELTS, tuition-free German universities, STEM OPT extensions, and admissions checklists.

### 9. 📄 ATS-Optimized Resume Builder
- Dynamic form editor synchronized with the student's profile.
- Real-time side-by-side single-column ATS document preview.
- 1-click **Download / Print PDF** function producing clean, ATS-compliant resumes.

### 10. 📚 Learning Resource Library
- Curated resources across 11 disciplines (C, Java, Python, Web Dev, DSA, DBMS, OS, Networks, Aptitude, Interview Prep).
- Search, category filter, difficulty tiers (Beginner, Intermediate, Advanced), personal bookmarks, and completion checklists.

### 11. 📅 Events & Technical Drives
- Campus hackathons (SVIT CodeQuest 2026), cloud workshops, placement masterclasses, and higher studies webinars.
- 1-click registration simulation with instant digital ticket passes.

### 12. 🛡️ Administrator Control Center
- Management table for students with search and Active/Disable toggles.
- CRUD management for Companies, Internships, Campus Events, and Study Resources.
- Official SVIT notice board editor for real-time bulletin updates.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router DOM, Canvas Confetti.
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs, CORS, dotenv.
- **Database**: MongoDB with Mongoose + Automatic zero-config in-memory mock store fallback.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+) and npm installed.

### 1. Setup Backend
```bash
cd svit-career-hub/backend
npm install
npm run dev
```
Backend API will start at: `http://localhost:5000`

### 2. Setup Frontend
```bash
cd svit-career-hub/frontend
npm install
npm run dev
```
Frontend Web App will start at: `http://localhost:3000` (or `http://localhost:5173`)

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Student Demo** | `student@svit.ac.in` | `Student@123` | Full student dashboard, career planner, resume builder, placement hub |
| **Admin Demo** | `admin@svit.ac.in` | `Admin@123` | Full admin management panel, student status controls, content publishing |

*Note: You can also use the 1-click demo login buttons directly on the Sign In page or Navbar profile menu.*

---

## 📁 Project Structure

```text
svit-career-hub/
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ReadinessGauge, GlobalSearch, Toast, DemoBadge
│   │   ├── pages/            # Landing, Register, Login, Dashboard, CareerPlanner, Placements,
│   │   │                     # Internships, Skills, HigherEd, ResumeBuilder, Resources, Events, Admin
│   │   ├── context/          # AuthContext, NotificationContext
│   │   ├── services/         # Axios API client with JWT interceptor
│   │   ├── App.jsx           # Master route registry
│   │   ├── index.css         # Tailwind & glassmorphism styling
│   │   └── main.jsx          # React DOM entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── config/               # db.js (MongoDB + graceful mock fallback)
│   ├── controllers/          # Auth, Student, Company, Internship, Skill, Career, Resource, Admin
│   ├── routes/               # Modular Express REST API routes
│   ├── models/               # Mongoose schemas for all 13 core entities
│   ├── middleware/           # authMiddleware (JWT), adminMiddleware (RBAC), errorMiddleware
│   ├── data/                 # seedData.js & mockStore.js with [DEMO DATA] labels
│   ├── server.js             # Express app bootstrap
│   └── package.json
│
├── README.md
└── .env.example
```

---

## 📜 Compliance & Institutional Integrity Note
Swami Vivekananda Institute of Technology (SVIT) placement statistics, approved recruitment circulars, and verified records are administered directly by the SVIT Training & Placement Cell. All sample company profiles and internships are explicitly labeled with `[DEMO DATA]` tags.
