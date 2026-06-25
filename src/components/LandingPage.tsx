import React from 'react';
import { ArrowRight, BarChart, Briefcase, Globe, Users } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex-1 flex flex-col relative z-10 w-full max-w-[1440px] mx-auto">
      <header className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-yellow-200 rounded-sm transform rotate-45"></div>
          <span className="text-xl font-serif tracking-widest text-white uppercase">Acme Consulting</span>
        </div>
        <nav className="hidden md:flex gap-10 text-xs uppercase tracking-widest font-medium text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="#portal" className="text-amber-500 hover:text-amber-400 transition-colors">Client Portal</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col md:flex-row px-6 md:px-12 items-center py-12 md:py-0">
        <div className="w-full md:w-3/5 md:pr-16">
          <div className="inline-block px-3 py-1 border border-amber-500/30 text-amber-500 text-[10px] uppercase tracking-[0.2em] mb-6">
            Global Strategy & Transformation
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Strategic Insights for <br/><span className="italic text-amber-200">Modern Businesses</span>.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-10">
            We help ambitious companies scale, optimize operations, and navigate complex market dynamics with data-driven consulting.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
              Our Services
            </button>
          </div>
        </div>

        {/* Abstract Visual */}
        <div className="hidden md:block w-2/5 h-[500px] relative mt-16 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="relative w-full h-full border border-white/5 rounded-2xl flex flex-col p-8 bg-black/40 backdrop-blur-sm">
            <div className="flex justify-between border-b border-white/10 pb-6 mb-6">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Market Performance</span>
              <span className="text-[10px] text-emerald-400">+12.4% YTD</span>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-4 w-full bg-white/5 rounded-full"></div>
              <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
              <div className="h-4 w-5/6 bg-white/5 rounded-full"></div>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-serif text-white">$4.2B</span>
                  <span className="text-xs text-slate-500">Assets Managed</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-amber-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="services" className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:text-center md:flex md:flex-col md:items-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Expertise That Drives Results</h2>
            <p className="text-lg text-slate-400 max-w-2xl">
              Comprehensive consulting solutions tailored to your unique business challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/20">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Growth Strategy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Identify new market opportunities and develop actionable plans to accelerate revenue growth sustainably.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Organizational Design</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Restructure your teams and processes to maximize efficiency, collaboration, and employee satisfaction.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/20">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Digital Transformation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Modernize your technological infrastructure and workflows to stay competitive in a digital-first world.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest mt-auto">
        <span>© {new Date().getFullYear()} Acme Consulting Group</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Compliance</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Legal</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Sustainability Report</span>
        </div>
      </footer>
    </div>
  );
}
