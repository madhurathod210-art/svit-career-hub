import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './components/Toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedStudentRoute, ProtectedAdminRoute } from './components/ProtectedRoutes';

// Pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CareerPlannerPage from './pages/CareerPlannerPage';
import PlacementHubPage from './pages/PlacementHubPage';
import InternshipHubPage from './pages/InternshipHubPage';
import SkillsExplorerPage from './pages/SkillsExplorerPage';
import HigherEducationPage from './pages/HigherEducationPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import ResourceLibraryPage from './pages/ResourceLibraryPage';
import EventsPage from './pages/EventsPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen bg-[#0B1120] text-slate-100 selection:bg-blue-600 selection:text-white">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Core Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/careers" element={<CareerPlannerPage />} />
                  <Route path="/placements" element={<PlacementHubPage />} />
                  <Route path="/internships" element={<InternshipHubPage />} />
                  <Route path="/skills" element={<SkillsExplorerPage />} />
                  <Route path="/higher-studies" element={<HigherEducationPage />} />
                  <Route path="/resume-builder" element={<ResumeBuilderPage />} />
                  <Route path="/resources" element={<ResourceLibraryPage />} />
                  <Route path="/events" element={<EventsPage />} />

                  {/* Protected Student Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedStudentRoute>
                        <DashboardPage />
                      </ProtectedStudentRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedStudentRoute>
                        <NotificationsPage />
                      </ProtectedStudentRoute>
                    }
                  />

                  {/* Protected Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboardPage />
                      </ProtectedAdminRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
