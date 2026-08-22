import React, { useState } from 'react';
import {
  GraduationCap,
  Globe,
  Award,
  BookOpen,
  Calendar,
  FileCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

const HigherEducationPage = () => {
  const [activeTab, setActiveTab] = useState('india'); // 'india' or 'abroad'
  const [selectedCountry, setSelectedCountry] = useState('USA');

  const indiaPrograms = [
    {
      title: "M.Tech / M.E. through GATE",
      institutions: "IITs, NITs, IIITs, BITS, IISc Bangalore",
      exams: "GATE (Graduate Aptitude Test in Engineering)",
      eligibility: "B.Tech/B.E. degree with valid GATE scorecard",
      timeline: "Exam in February • Results in March • COAP / CCMT Counseling in May-June",
      scholarships: "MHRD Stipend of ₹12,400/month for all GATE qualified admitted students",
      officialLink: "https://gate2026.iit.ac.in/"
    },
    {
      title: "MBA / Tech Management through CAT",
      institutions: "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS, XLRI, SPJIMR",
      exams: "CAT (Common Admission Test) / XAT / GMAT",
      eligibility: "Graduation with minimum 50% aggregate + high percentile",
      timeline: "CAT in November • WAT-PI Shortlists in January • Interviews in Feb-April",
      scholarships: "Need-based financial assistance and corporate scholarships available",
      officialLink: "https://iimcat.ac.in/"
    },
    {
      title: "MCA (Master of Computer Applications)",
      institutions: "NITs through NIMCET, Central Universities, State Universities",
      exams: "NIMCET / State CETs (e.g. TS ICET)",
      eligibility: "B.Tech/B.Sc/BCA with Mathematics at 10+2 or degree level",
      timeline: "Notification in March • Exam in June • Admissions in July",
      scholarships: "State post-matric scholarships & fee reimbursement schemes",
      officialLink: "https://nimcet.in/"
    }
  ];

  const abroadCountries = {
    USA: {
      name: "United States of America",
      degreeTypes: ["MS in Computer Science", "MS in Data Science", "MBA", "Direct PhD"],
      standardizedExams: "GRE (General) + TOEFL / IELTS",
      topUniversities: "Stanford, MIT, Carnegie Mellon, UC Berkeley, UT Austin, Georgia Tech",
      averageCost: "$45,000 - $70,000 / year (Tuition + Living)",
      scholarshipsFunding: "Teaching Assistantships (TA), Research Assistantships (RA) offering tuition waivers + monthly stipend",
      visaType: "F-1 Student Visa with 3-Year STEM OPT Extension",
      applicationTimeline: "Fall Intake: Submit apps by Dec-Jan • Spring Intake: Submit by Aug-Sep"
    },
    Germany: {
      name: "Germany (Tuition-Free Public Universities)",
      degreeTypes: ["M.Sc. in Informatics", "Embedded Systems", "Automotive Engineering", "AI Research"],
      standardizedExams: "IELTS / TOEFL + Basic German (A1/A2 recommended)",
      topUniversities: "TU Munich (TUM), RWTH Aachen, TU Berlin, University of Stuttgart",
      averageCost: "€0 - €1,500 / semester (Nominal admin semester ticket) + €11,208 Blocked Account",
      scholarshipsFunding: "DAAD Scholarships, Erasmus+ Student Exchange, HiWi student jobs",
      visaType: "German National Student Visa with 18-Month Jobseeker Residence Permit",
      applicationTimeline: "Winter Intake: Deadline May-July • Summer Intake: Deadline Dec-Jan"
    },
    Canada: {
      name: "Canada",
      degreeTypes: ["MASc / MEng in Electrical & Computer Eng", "MS Computing Science", "Master of Applied Science"],
      standardizedExams: "IELTS (6.5+ / 7.0 bands) / TOEFL (90+)",
      topUniversities: "University of Toronto, UBC, McGill, University of Waterloo",
      averageCost: "CAD $30,000 - $48,000 / year",
      scholarshipsFunding: "Vanier Canada Graduate Scholarships, Departmental Research Assistantships",
      visaType: "Study Permit with Post-Graduation Work Permit (PGWP) up to 3 years",
      applicationTimeline: "Fall Intake: Submit by Dec-Feb • Winter Intake: Submit by Aug-Oct"
    },
    UK: {
      name: "United Kingdom",
      degreeTypes: ["1-Year Intensive MSc Computing", "MSc Artificial Intelligence", "MSc Cybersecurity"],
      standardizedExams: "IELTS / PTE Academic (GRE not mandatory for most UK programs)",
      topUniversities: "Oxford, Cambridge, Imperial College London, UCL, Edinburgh, Manchester",
      averageCost: "£24,000 - £38,000 / year",
      scholarshipsFunding: "Chevening Scholarships, Commonwealth Scholarships, Great Scholarships",
      visaType: "Student Route Visa with 2-Year Graduate Immigration Route (PSW)",
      applicationTimeline: "Rolling admissions (September Intake): Apply between Oct-June"
    },
    Australia: {
      name: "Australia",
      degreeTypes: ["Master of Information Technology", "Master of Data Science", "Master of Engineering"],
      standardizedExams: "IELTS (6.5+ band) / PTE Academic",
      topUniversities: "University of Melbourne, UNSW Sydney, ANU, University of Sydney",
      averageCost: "AUD $38,000 - $50,000 / year",
      scholarshipsFunding: "Australia Awards Scholarships, University Vice-Chancellor International Scholarships",
      visaType: "Subclass 500 Visa with Temporary Graduate Subclass 485 Post-Study Work",
      applicationTimeline: "Semester 1 (Feb Intake): Apply by Nov • Semester 2 (July Intake): Apply by May"
    }
  };

  const documentChecklist = [
    { name: "Academic Transcripts", desc: "Consolidated grade cards and semester marksheets attested by SVIT Examination Branch." },
    { name: "Statement of Purpose (SOP)", desc: "1000-word structured narrative outlining academic motivations, project work, and career vision." },
    { name: "Letters of Recommendation (LOR)", desc: "3 academic and project recommendations from SVIT HODs and faculty mentors." },
    { name: "Standardized Exam Scorecards", desc: "Official score reports for GATE, GRE, CAT, TOEFL, or IELTS." },
    { name: "ATS Academic Curriculum Vitae (CV)", desc: "2-page resume highlighting technical publications, coding repositories, and internships." },
    { name: "Financial Affidavit & Bank Statements", desc: "Proof of liquid funds, approved education loan sanction letters, or scholarship letters." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Higher Education & Postgraduate Planner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Plan Masters, MBA & PhD Pathways
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          In-depth roadmaps for Indian premier institutions (IITs, NITs, IIMs) and global universities across USA, Germany, Canada, UK, and Australia.
        </p>
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Advisory Note:</span> Admission criteria and visa policies evolve annually. Always verify current details on respective official university and testing agency portals.
          </p>
        </div>
        <DemoBadge text="OFFICIAL GUIDES" className="shrink-0 hidden sm:inline-flex" />
      </div>

      {/* Main Track Toggle: India vs Abroad */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <button
            onClick={() => setActiveTab('india')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'india'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>India Track (GATE, CAT, M.Tech, MBA)</span>
          </button>

          <button
            onClick={() => setActiveTab('abroad')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'abroad'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Abroad Track (MS, MBA, Global Universities)</span>
          </button>
        </div>
      </div>

      {/* INDIA TRACK */}
      {activeTab === 'india' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indiaPrograms.map((prog, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-blue-400 font-bold">Track 0{idx + 1}</span>
                  <h3 className="text-lg font-bold text-white">{prog.title}</h3>
                  <div className="text-xs text-slate-300 space-y-2">
                    <p><span className="text-slate-500 font-semibold block">Target Institutions:</span> {prog.institutions}</p>
                    <p><span className="text-slate-500 font-semibold block">Entrance Exam:</span> {prog.exams}</p>
                    <p><span className="text-slate-500 font-semibold block">Admission Timeline:</span> {prog.timeline}</p>
                    <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-emerald-300">
                      <span className="text-emerald-400 font-bold block mb-0.5">Funding & Stipend:</span>
                      {prog.scholarships}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={prog.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    Official Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABROAD TRACK */}
      {activeTab === 'abroad' && (
        <div className="space-y-6">
          {/* Country Selection Chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(abroadCountries).map((countryKey) => (
              <button
                key={countryKey}
                onClick={() => setSelectedCountry(countryKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCountry === countryKey
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {abroadCountries[countryKey].name}
              </button>
            ))}
          </div>

          {/* Selected Country Blueprint Card */}
          {abroadCountries[selectedCountry] && (
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Destination Guide</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{abroadCountries[selectedCountry].name}</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 font-semibold self-start sm:self-center">
                  {abroadCountries[selectedCountry].visaType}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Popular Degrees</span>
                  <ul className="space-y-1">
                    {abroadCountries[selectedCountry].degreeTypes.map((d, idx) => (
                      <li key={idx} className="text-white font-medium">• {d}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Required Standardized Exams</span>
                  <p className="text-white font-semibold text-sm">{abroadCountries[selectedCountry].standardizedExams}</p>
                  <p className="text-slate-400 text-[11px] pt-1">Recommended prep window: 4-6 months before application deadlines.</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Average Investment & Cost</span>
                  <p className="text-white font-mono font-bold text-sm">{abroadCountries[selectedCountry].averageCost}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5 md:col-span-2">
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">Scholarships & Financial Aid</span>
                  <p className="text-emerald-200">{abroadCountries[selectedCountry].scholarshipsFunding}</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-blue-400 font-bold uppercase text-[10px]">Application Timeline</span>
                  <p className="text-slate-300">{abroadCountries[selectedCountry].applicationTimeline}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mandatory Document Checklist */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Admissions & Visa Document Checklist</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">Prepare these certified documents well in advance of university application cycles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentChecklist.map((doc, idx) => (
            <div key={idx} className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {doc.name}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">{doc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HigherEducationPage;
