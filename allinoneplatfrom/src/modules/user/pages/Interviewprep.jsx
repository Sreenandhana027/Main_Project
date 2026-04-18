import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function Interviewprep() {
    return (
        <div className="min-h-screen bg-brand-bg">

            {/* Hero Section - Premium Glassmorphic */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Mesh Gradient */}
                <div className="absolute inset-0 bg-[#0e1d37]">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-900 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-200"></span>
                        </span>
                        <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Master Your Career</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                        Interview{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-blue-900">
                            <span>P</span>reparation
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Unlock your potential with our expert-led preparation paths. From technical aptitude to behavioral strategies, we've got you covered.
                    </p>

                    <Link to="/maininter" className="btn-premium inline-block group">
                        <span className="flex items-center gap-3">
                            Start Preparing Now
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Interviewprep;