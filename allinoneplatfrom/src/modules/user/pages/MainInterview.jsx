import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'lucide-react';

function MainInterview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Dashboard Header */}
      <header className="glass-header px-6 py-6 border-b border-slate-100 mb-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/inter')}
            className="flex items-center gap-2 text-brand-primary font-bold text-sm tracking-widest hover:text-brand-dark transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            RETURN TO OVERVIEW
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-brand-dark font-black tracking-tight uppercase">Interview<span className="text-brand-primary">HUB</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-reveal">
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-6 tracking-tight">
            Preparation Dashboard
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto font-medium leading-relaxed">
            Unlock your potential with structured content designed for career acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Aptitude Test Card */}
          <div className="premium-card group animate-reveal overflow-hidden" style={{ animationDelay: '100ms' }}>
            <div className="h-64 relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Aptitude Test"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                Assessment
              </div>
            </div>

            <div className="p-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                Aptitude Mastery
              </h3>
              <p className="text-slate-500 leading-relaxed mb-10 font-medium h-20 text-[15px]">
                Sharpen your analytical skills with real-world scenarios and time-bound challenges.
              </p>

              <Link to="/aptitude" className="btn-premium block text-center w-full bg-brand-primary!">
                Start Practice
              </Link>
            </div>
          </div>

          {/* Video Preparation Card */}
          <div className="premium-card group animate-reveal overflow-hidden" style={{ animationDelay: '200ms' }}>
            <div className="h-64 relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                alt="Video Preparation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                Visual Learning
              </div>
            </div>

            <div className="p-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                Video Insights
              </h3>
              <p className="text-slate-500 leading-relaxed mb-10 font-medium h-20 text-[15px]">
                Expert masterclasses covering technical basics and advanced strategies.
              </p>

              <Link to="/mainvdo" className="btn-premium block text-center w-full bg-slate-800!">
                Watch Sessions
              </Link>
            </div>
          </div>

          {/* Interview Tips Card */}
          <div className="premium-card group animate-reveal overflow-hidden" style={{ animationDelay: '300ms' }}>
            <div className="h-64 relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                alt="Interview Tips"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                Pro Strategies
              </div>
            </div>

            <div className="p-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                Success Tips
              </h3>
              <p className="text-slate-500 leading-relaxed mb-10 font-medium h-20 text-[15px]">
                Actionable advice on communication, resume building, and branding.
              </p>

              <Link to="/tips" className="btn-premium block text-center w-full bg-brand-accent!">
                Read Guides
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default MainInterview;