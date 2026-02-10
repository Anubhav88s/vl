import React from 'react';
import CursorTrail from './components/CursorTrail';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import Reasons from './components/Reasons';
import Timeline from './components/Timeline';
import Proposal from './components/Proposal';

function App() {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-[#0a0015]">
      <CursorTrail />
      <Hero />

      {/* Divider */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0015]" />
        <div className="flex justify-center items-center h-full gap-8">
          {['💕', '💖', '💗', '💖', '💕'].map((h, i) => (
            <span key={i} className="text-lg opacity-30 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{h}</span>
          ))}
        </div>
      </div>

      <LoveLetter />

      {/* Divider */}
      <div className="flex justify-center w-full">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      </div>

      <Reasons />

      {/* Divider */}
      <div className="flex justify-center w-full">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      <Timeline />

      {/* Divider */}
      <div className="flex justify-center w-full">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      </div>

      <Proposal />

      {/* Footer */}
      <footer className="relative py-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10">
          <div className="animate-heartbeat text-3xl mb-4">❤️</div>
          <p className="text-pink-200/50 text-sm tracking-wider uppercase mb-2">Made with all my love, just for you</p>
          <p className="text-purple-300/30 text-xs">Happy Valentine's Day 2026 💕</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
