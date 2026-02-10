import React, { useEffect, useRef, useState } from 'react';

const reasons = [
  { emoji: '😊', title: 'Your Smile', desc: 'It lights up my entire universe. One smile from you and even my worst days feel like magic.', color: 'from-pink-500/20 to-rose-500/20' },
  { emoji: '🤗', title: 'Your Warmth', desc: 'The way you make everyone feel seen and loved. Your kindness is your superpower.', color: 'from-amber-500/20 to-orange-500/20' },
  { emoji: '😂', title: 'Your Laugh', desc: 'That contagious laugh that makes the world stop. I would do anything to hear it forever.', color: 'from-purple-500/20 to-violet-500/20' },
  { emoji: '💪', title: 'Your Strength', desc: 'How you handle everything with such grace and power. You inspire me every single day.', color: 'from-cyan-500/20 to-blue-500/20' },
  { emoji: '🧠', title: 'Your Mind', desc: 'Your brilliant thoughts and wild ideas. Every conversation with you feels like discovering a new world.', color: 'from-emerald-500/20 to-green-500/20' },
  { emoji: '❤️', title: 'Your Heart', desc: 'The way you love with every fibre of your being. Being loved by you is life\'s greatest gift.', color: 'from-red-500/20 to-pink-500/20' },
];

const ReasonCard = ({ reason, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const [padding, setPadding] = useState('24px');

  useEffect(() => {
    const updatePadding = () => {
      setPadding(window.innerWidth < 768 ? '24px' : '40px');
    };
    
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${index * 120}ms`,
        transform: isVisible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(64px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect behind card */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

      <div 
        className="relative glass glass-hover h-full transition-all duration-300 overflow-hidden flex flex-col items-start text-left"
        style={{ padding }}
      >
        {/* Emoji */}
        <div 
          className="text-4xl md:text-5xl group-hover:scale-125 transition-transform duration-500 group-hover:animate-float"
          style={{ marginBottom: '24px' }}
        >
          {reason.emoji}
        </div>

        {/* Title */}
        <h3 
          className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300"
          style={{ marginBottom: '16px' }}
        >
          {reason.title}
        </h3>

        {/* Description */}
        <p className="text-purple-200/80 leading-relaxed text-sm md:text-base break-words">
          {reason.desc}
        </p>
        
        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-pink-500/50 group-hover:bg-pink-400 group-hover:shadow-[0_0_10px_rgba(255,0,127,0.5)] transition-all duration-300" />
      </div>
    </div>
  );
};

const Reasons = () => {
  return (
    <section className="relative py-24 px-4 min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0015] via-[#120025] to-[#0a0015]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(123,47,247,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-5xl block mb-4 animate-float">💎</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Reasons I Love You</h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <p className="mt-4 text-purple-300/60 text-lg">An incomplete list, because I'd need forever to finish it</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reasons;
