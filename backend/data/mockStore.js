// In-memory / File-backed Mock Data Store for SVIT Student Career Hub
// Enables seamless offline execution and immediate evaluation without MongoDB installation hurdles.

import {
  seedUsers,
  seedStudentProfiles,
  seedSkills,
  seedCareerPaths,
  seedCompanies,
  seedInternships,
  seedEvents,
  seedResources,
  seedNotifications,
  seedCollegeInfo
} from './seedData.js';

class MockDataStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(seedUsers));
    this.studentProfiles = JSON.parse(JSON.stringify(seedStudentProfiles));
    this.skills = JSON.parse(JSON.stringify(seedSkills));
    this.careerPaths = JSON.parse(JSON.stringify(seedCareerPaths));
    this.companies = JSON.parse(JSON.stringify(seedCompanies));
    this.internships = JSON.parse(JSON.stringify(seedInternships));
    this.events = JSON.parse(JSON.stringify(seedEvents));
    this.resources = JSON.parse(JSON.stringify(seedResources));
    this.notifications = JSON.parse(JSON.stringify(seedNotifications));
    this.collegeInfo = JSON.parse(JSON.stringify(seedCollegeInfo));
    this.careerProgress = {
      "u_demo_student_01": {
        "cp_swe": {
          "m1": "Completed",
          "m2": "Completed",
          "m3": "Completed",
          "m4": "Completed",
          "m5": "In Progress",
          "m6": "Not Started",
          "m7": "Not Started",
          "m8": "Not Started",
          "m9": "Not Started",
          "m10": "Not Started"
        }
      }
    };
    this.bookmarkedResources = {
      "u_demo_student_01": ["res_04", "res_05"]
    };
    this.completedResources = {
      "u_demo_student_01": ["res_01"]
    };
  }

  // Auth & Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);

    // Auto create student profile if role is student
    if (newUser.role !== 'admin') {
      const newProfile = {
        _id: `sp_${Date.now()}`,
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId || `SVIT${Math.floor(1000 + Math.random() * 9000)}`,
        department: newUser.department || 'CSE',
        year: newUser.year || '1st Year',
        cgpa: newUser.cgpa || 7.5,
        phone: newUser.phone || '',
        bio: `Student at Swami Vivekananda Institute of Technology (${newUser.department || 'CSE'}).`,
        careerGoal: 'Software Developer',
        completedSkills: [],
        inProgressSkills: [],
        projects: [],
        certifications: [],
        internships: [],
        resumeDetails: {
          headline: `B.Tech ${newUser.department || 'CSE'} Student at SVIT`,
          objective: `Enthusiastic ${newUser.year || '1st Year'} B.Tech student at Swami Vivekananda Institute of Technology seeking opportunities to learn, apply foundational skills, and contribute to innovative engineering solutions.`,
          linkedIn: '',
          github: '',
          languages: ['English', 'Hindi'],
          achievements: []
        },
        readinessFactors: {
          skillsScore: 30,
          projectsScore: 20,
          internshipScore: 0,
          resumeScore: 40,
          aptitudeScore: 30,
          communicationScore: 50,
          certificationsScore: 10,
          interviewPrepScore: 20
        }
      };
      this.studentProfiles.push(newProfile);

      // Create welcome notification
      this.notifications.unshift({
        _id: `notif_${Date.now()}`,
        userId: newUser._id,
        title: "Welcome to SVIT Student Career Hub!",
        message: "Your student portal account has been created. Explore career roadmaps, discover internships, and build your resume.",
        type: "system",
        isRead: false,
        link: "/dashboard",
        createdAt: new Date()
      });
    }

    return newUser;
  }

  // Student Profile
  getStudentProfileByUserId(userId) {
    let profile = this.studentProfiles.find(p => p.userId === userId);
    if (!profile) {
      const user = this.findUserById(userId);
      if (user) {
        profile = {
          _id: `sp_${Date.now()}`,
          userId: user._id,
          name: user.name,
          email: user.email,
          studentId: user.studentId || 'SVIT0000',
          department: user.department || 'CSE',
          year: user.year || '1st Year',
          cgpa: user.cgpa || 7.0,
          completedSkills: [],
          inProgressSkills: [],
          projects: [],
          certifications: [],
          internships: [],
          readinessFactors: {
            skillsScore: 30, projectsScore: 20, internshipScore: 0, resumeScore: 40,
            aptitudeScore: 30, communicationScore: 50, certificationsScore: 10, interviewPrepScore: 20
          }
        };
        this.studentProfiles.push(profile);
      }
    }
    return profile;
  }

  updateStudentProfile(userId, updateData) {
    const profileIndex = this.studentProfiles.findIndex(p => p.userId === userId);
    if (profileIndex >= 0) {
      this.studentProfiles[profileIndex] = {
        ...this.studentProfiles[profileIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return this.studentProfiles[profileIndex];
    }
    return null;
  }

  // Career Readiness Score Calculation Engine
  calculateCareerReadiness(userId) {
    const profile = this.getStudentProfileByUserId(userId);
    if (!profile) return { totalScore: 0, breakdown: {}, strongAreas: [], areasToImprove: [], recommendedActions: [] };

    const skillsCount = (profile.completedSkills || []).length;
    const projectsCount = (profile.projects || []).length;
    const internshipsCount = (profile.internships || []).length;
    const certsCount = (profile.certifications || []).length;
    const resumeFilled = (profile.resumeDetails && profile.resumeDetails.objective && profile.resumeDetails.headline) ? 1 : 0;

    // Sub-scores calculation (0 to 100)
    const skillsScore = Math.min(100, Math.round((skillsCount / 8) * 100));
    const projectsScore = Math.min(100, Math.round((projectsCount / 3) * 100));
    const internshipScore = internshipsCount > 0 ? 90 : 20;
    const resumeScore = resumeFilled ? 85 : 35;
    const aptitudeScore = profile.readinessFactors?.aptitudeScore || 60;
    const communicationScore = profile.readinessFactors?.communicationScore || 70;
    const certificationsScore = Math.min(100, Math.round((certsCount / 2) * 100));
    const interviewPrepScore = profile.readinessFactors?.interviewPrepScore || 50;

    /*
      Formula:
      Skills           20%
      Projects         20%
      Internship       15%
      Resume           10%
      Aptitude         10%
      Communication    10%
      Certifications    5%
      Interview Prep   10%
      Total           100%
    */
    const totalScore = Math.round(
      (skillsScore * 0.20) +
      (projectsScore * 0.20) +
      (internshipScore * 0.15) +
      (resumeScore * 0.10) +
      (aptitudeScore * 0.10) +
      (communicationScore * 0.10) +
      (certificationsScore * 0.05) +
      (interviewPrepScore * 0.10)
    );

    const breakdown = {
      skills: { score: skillsScore, weight: '20%', label: 'Skills Mastery' },
      projects: { score: projectsScore, weight: '20%', label: 'Hands-on Projects' },
      internship: { score: internshipScore, weight: '15%', label: 'Internship Experience' },
      resume: { score: resumeScore, weight: '10%', label: 'ATS Resume Polish' },
      aptitude: { score: aptitudeScore, weight: '10%', label: 'Quantitative & Logic' },
      communication: { score: communicationScore, weight: '10%', label: 'Communication' },
      certifications: { score: certificationsScore, weight: '5%', label: 'Certifications' },
      interviewPrep: { score: interviewPrepScore, weight: '10%', label: 'Interview Readiness' }
    };

    const strongAreas = [];
    const areasToImprove = [];
    const recommendedActions = [];

    if (skillsScore >= 70) strongAreas.push("Broad technical skill portfolio");
    else {
      areasToImprove.push("Complete at least 5 core programming & development skills");
      recommendedActions.push({ title: "Explore Skills Explorer", link: "/skills", action: "Learn Skills" });
    }

    if (projectsScore >= 65) strongAreas.push("Practical project portfolio demonstrated");
    else {
      areasToImprove.push("Add at least 2 full-stack or domain-specific projects to your profile");
      recommendedActions.push({ title: "Build Full-Stack Project", link: "/resources", action: "View Projects" });
    }

    if (internshipScore >= 70) strongAreas.push("Industry internship exposure");
    else {
      areasToImprove.push("Apply for upcoming summer/remote internships");
      recommendedActions.push({ title: "Search Internships", link: "/internships", action: "Explore Internships" });
    }

    if (resumeScore >= 75) strongAreas.push("Well-structured ATS-ready resume profile");
    else {
      areasToImprove.push("Complete all fields in the ATS Resume Builder");
      recommendedActions.push({ title: "Generate ATS Resume", link: "/resume-builder", action: "Build Resume" });
    }

    if (aptitudeScore < 70) {
      areasToImprove.push("Practice speed math & quantitative reasoning sets");
      recommendedActions.push({ title: "Placement Aptitude Practice", link: "/placements", action: "Practice Tests" });
    } else {
      strongAreas.push("Solid foundation in quantitative & logical aptitude");
    }

    if (strongAreas.length === 0) strongAreas.push("Initial profile configured and active");

    return {
      totalScore,
      breakdown,
      strongAreas,
      areasToImprove,
      recommendedActions
    };
  }

  // Career Progress
  getCareerProgress(userId, pathId) {
    if (!this.careerProgress[userId]) this.careerProgress[userId] = {};
    if (!this.careerProgress[userId][pathId]) this.careerProgress[userId][pathId] = {};
    return this.careerProgress[userId][pathId];
  }

  updateMilestoneStatus(userId, pathId, milestoneId, status) {
    if (!this.careerProgress[userId]) this.careerProgress[userId] = {};
    if (!this.careerProgress[userId][pathId]) this.careerProgress[userId][pathId] = {};
    this.careerProgress[userId][pathId][milestoneId] = status;
    return this.careerProgress[userId][pathId];
  }

  // Companies
  getCompanies(filter = {}) {
    let list = [...this.companies];
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || (c.jobRoles || []).some(r => r.toLowerCase().includes(q)));
    }
    if (filter.industry) {
      list = list.filter(c => c.industry.toLowerCase().includes(filter.industry.toLowerCase()));
    }
    return list;
  }

  addCompany(company) {
    const newCompany = {
      _id: `comp_${Date.now()}`,
      isDemo: true,
      ...company
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  updateCompany(id, updateData) {
    const idx = this.companies.findIndex(c => c._id === id);
    if (idx >= 0) {
      this.companies[idx] = { ...this.companies[idx], ...updateData };
      return this.companies[idx];
    }
    return null;
  }

  deleteCompany(id) {
    const idx = this.companies.findIndex(c => c._id === id);
    if (idx >= 0) {
      const deleted = this.companies.splice(idx, 1);
      return deleted[0];
    }
    return null;
  }

  // Internships
  getInternships(filters = {}) {
    let list = [...this.internships];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || (i.techStack || []).some(t => t.toLowerCase().includes(q)));
    }
    if (filters.workType && filters.workType !== 'All') {
      list = list.filter(i => i.workType.toLowerCase() === filters.workType.toLowerCase());
    }
    if (filters.tech && filters.tech !== 'All') {
      list = list.filter(i => (i.techStack || []).some(t => t.toLowerCase().includes(filters.tech.toLowerCase())));
    }
    if (filters.location && filters.location !== 'All') {
      list = list.filter(i => i.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    return list;
  }

  addInternship(data) {
    const newIntern = { _id: `int_${Date.now()}`, isDemo: true, ...data };
    this.internships.push(newIntern);
    return newIntern;
  }

  updateInternship(id, data) {
    const idx = this.internships.findIndex(i => i._id === id);
    if (idx >= 0) {
      this.internships[idx] = { ...this.internships[idx], ...data };
      return this.internships[idx];
    }
    return null;
  }

  deleteInternship(id) {
    const idx = this.internships.findIndex(i => i._id === id);
    if (idx >= 0) {
      return this.internships.splice(idx, 1)[0];
    }
    return null;
  }

  // Events
  getEvents(filter = {}) {
    let list = [...this.events];
    if (filter.category && filter.category !== 'All') {
      list = list.filter(e => e.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(e => e.title.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q));
    }
    return list;
  }

  addEvent(data) {
    const newEv = { _id: `ev_${Date.now()}`, isDemo: true, ...data };
    this.events.push(newEv);
    return newEv;
  }

  updateEvent(id, data) {
    const idx = this.events.findIndex(e => e._id === id);
    if (idx >= 0) {
      this.events[idx] = { ...this.events[idx], ...data };
      return this.events[idx];
    }
    return null;
  }

  deleteEvent(id) {
    const idx = this.events.findIndex(e => e._id === id);
    if (idx >= 0) {
      return this.events.splice(idx, 1)[0];
    }
    return null;
  }

  // Resources
  getResources(filters = {}) {
    let list = [...this.resources];
    if (filters.category && filters.category !== 'All') {
      list = list.filter(r => r.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      list = list.filter(r => r.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
    }
    return list;
  }

  addResource(data) {
    const newRes = { _id: `res_${Date.now()}`, isDemo: true, ...data };
    this.resources.push(newRes);
    return newRes;
  }

  updateResource(id, data) {
    const idx = this.resources.findIndex(r => r._id === id);
    if (idx >= 0) {
      this.resources[idx] = { ...this.resources[idx], ...data };
      return this.resources[idx];
    }
    return null;
  }

  deleteResource(id) {
    const idx = this.resources.findIndex(r => r._id === id);
    if (idx >= 0) {
      return this.resources.splice(idx, 1)[0];
    }
    return null;
  }

  toggleBookmark(userId, resourceId) {
    if (!this.bookmarkedResources[userId]) this.bookmarkedResources[userId] = [];
    const idx = this.bookmarkedResources[userId].indexOf(resourceId);
    if (idx >= 0) {
      this.bookmarkedResources[userId].splice(idx, 1);
      return { bookmarked: false, list: this.bookmarkedResources[userId] };
    } else {
      this.bookmarkedResources[userId].push(resourceId);
      return { bookmarked: true, list: this.bookmarkedResources[userId] };
    }
  }

  toggleCompletedResource(userId, resourceId) {
    if (!this.completedResources[userId]) this.completedResources[userId] = [];
    const idx = this.completedResources[userId].indexOf(resourceId);
    if (idx >= 0) {
      this.completedResources[userId].splice(idx, 1);
      return { completed: false, list: this.completedResources[userId] };
    } else {
      this.completedResources[userId].push(resourceId);
      return { completed: true, list: this.completedResources[userId] };
    }
  }

  // Global Search
  searchAll(query) {
    if (!query || query.trim().length === 0) {
      return { companies: [], internships: [], skills: [], roadmaps: [], resources: [], events: [] };
    }
    const q = query.toLowerCase().trim();
    return {
      companies: this.companies.filter(c => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || (c.requiredSkills || []).some(s => s.toLowerCase().includes(q))).slice(0, 5),
      internships: this.internships.filter(i => i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || (i.techStack || []).some(t => t.toLowerCase().includes(q))).slice(0, 5),
      skills: this.skills.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)).slice(0, 6),
      roadmaps: this.careerPaths.filter(cp => cp.title.toLowerCase().includes(q) || cp.category.toLowerCase().includes(q) || cp.description.toLowerCase().includes(q)).slice(0, 4),
      resources: this.resources.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)).slice(0, 5),
      events: this.events.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)).slice(0, 4)
    };
  }

  // Admin Dashboard stats
  getAdminStats() {
    const studentCount = this.users.filter(u => u.role === 'student').length;
    const companyCount = this.companies.length;
    const internshipCount = this.internships.length;
    const eventCount = this.events.length;
    const resourceCount = this.resources.length;
    const roadmapCount = this.careerPaths.length;
    const avgScore = 74;

    return {
      studentCount,
      companyCount,
      internshipCount,
      eventCount,
      resourceCount,
      roadmapCount,
      avgScore
    };
  }
}

export const mockStore = new MockDataStore();
