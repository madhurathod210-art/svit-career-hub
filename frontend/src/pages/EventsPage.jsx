import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Award,
  Tag
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import DemoBadge from '../components/DemoBadge';
import confetti from 'canvas-confetti';

const EventsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Hackathons',
    'Workshops',
    'Seminars',
    'Coding competitions',
    'Placement drives'
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await API.get('/events');
        if (res.data.success) {
          setEvents(res.data.events);
        }
      } catch (error) {
        console.error('Error fetching events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterEvent = (eventId, eventTitle) => {
    setRegisteredEvents(prev => ({ ...prev, [eventId]: true }));
    showToast(`Registered successfully for ${eventTitle}! E-Pass sent to your email.`, 'success');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const filteredEvents = events.filter(e => {
    return selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>SVIT Campus Events & Technical Drives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Hackathons, Workshops & Drives
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Stay updated on upcoming campus 24h coding hackathons, placement preparation masterclasses, and cloud technical bootcamps.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <DemoBadge text="DEMO SCHEDULE" />
      </div>

      {/* Events List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => {
          const isRegistered = !!registeredEvents[event._id];

          return (
            <div
              key={event._id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                      {event.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400">Organized by: <strong className="text-slate-300">{event.organizer}</strong></p>
                  </div>
                  <DemoBadge />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>

                {/* Event Schedule Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <Calendar className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Tags */}
                {event.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Free Entry • Open to SVIT</span>

                {isRegistered ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Registered (Pass Active)
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegisterEvent(event._id, event.title)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition-all hover:scale-105"
                  >
                    <span>Register Now</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;
