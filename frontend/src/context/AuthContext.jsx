import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('svit_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedToken = localStorage.getItem('svit_token');
      const storedUser = localStorage.getItem('svit_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Verify with backend
          const res = await API.get('/auth/me');
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('svit_user', JSON.stringify(res.data.user));
          }
        } catch (error) {
          console.warn('Session verification fallback to stored user', error);
        }
      } else {
        // Auto initialize with default student demo account for seamless first-time viewing if desired
        const defaultStudent = {
          id: 'u_demo_student_01',
          name: 'Rahul Sharma',
          email: 'student@svit.ac.in',
          role: 'student',
          studentId: '22SVIT0401',
          department: 'CSE',
          year: '3rd Year',
          cgpa: 8.7
        };
        // We do not force auto-login if they want to see public landing page first, but store defaults
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token: receivedToken, user: receivedUser } = res.data;
        setToken(receivedToken);
        setUser(receivedUser);
        localStorage.setItem('svit_token', receivedToken);
        localStorage.setItem('svit_user', JSON.stringify(receivedUser));
        return { success: true, user: receivedUser };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      return { success: false, message: msg };
    }
  };

  const register = async (formData) => {
    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.success) {
        const { token: receivedToken, user: receivedUser } = res.data;
        setToken(receivedToken);
        setUser(receivedUser);
        localStorage.setItem('svit_token', receivedToken);
        localStorage.setItem('svit_user', JSON.stringify(receivedUser));
        return { success: true, user: receivedUser };
      }
      return { success: false, message: res.data.message || 'Registration failed' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration error occurred';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('svit_token');
    localStorage.removeItem('svit_user');
  };

  // Quick 1-Click Demo Account Switcher
  const loginDemoAccount = async (role = 'student') => {
    if (role === 'admin') {
      return await login('admin@svit.ac.in', 'Admin@123');
    } else {
      return await login('student@svit.ac.in', 'Student@123');
    }
  };

  const updateUserProfileState = (updatedUser) => {
    setUser(prev => {
      const next = { ...prev, ...updatedUser };
      localStorage.setItem('svit_user', JSON.stringify(next));
      return next;
    });
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loginDemoAccount,
    updateUserProfileState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
