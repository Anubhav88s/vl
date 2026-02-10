import React, { useState, useEffect, useRef } from 'react';

const fullText = `My Dearest,

From the very first moment our paths crossed, my life was painted in colours I never knew existed. You are the sunrise that warms my coldest mornings and the constellation that guides me through my darkest nights.

Every smile you share becomes a treasure I guard fiercely. Every laugh we share becomes a melody I replay endlessly. You inspire me to be braver, to love deeper, and to dream without limits.

I don't know what I did to deserve someone as extraordinary as you, but I promise to spend every day being worthy of your love.

You are my today and all of my tomorrows.

Forever & Always Yours ♾️`;

const LoveLetter = () => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setIsOpen(true), 400);
          setTimeout(() => setStartTyping(true), 1200);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [startTyping]);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0015] via-[#1a0a2e] to-[#0a0015]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.08),transparent_60%)]" />

      <div className={`relative z-10 max-w-2xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block animate-float">✉️</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">A Letter to You</h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
        </div>

        {/* Envelope / Letter Card */}
        <div className="relative">
          {/* Envelope flap */}
          <div
            className={`absolute -top-1 left-0 right-0 h-24 z-20 transition-all duration-700 origin-top ${
              isOpen
                ? 'opacity-0 -translate-y-8 rotate-x-180'
                : 'opacity-100'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,127,0.3), rgba(123,47,247,0.3))',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />

          {/* Letter */}
          <div
            className={`glass p-8 md:p-12 transition-all duration-700 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
            }`}
            style={{
              boxShadow: '0 0 60px rgba(255,0,127,0.1), inset 0 0 60px rgba(255,0,127,0.03)',
            }}
          >
            {/* Seal */}
            <div className="flex justify-center -mt-2 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse-glow">
                <span className="text-2xl">💋</span>
              </div>
            </div>

            {/* Letter text */}
            <div className="font-script text-xl md:text-2xl leading-relaxed text-pink-100/90 whitespace-pre-wrap min-h-[300px]">
              {text}
              {text.length < fullText.length && (
                <span className="inline-block w-0.5 h-6 bg-pink-400 ml-1 animate-typewriter-blink" />
              )}
            </div>

            {/* Signature line */}
            {text.length >= fullText.length && (
              <div className="mt-8 pt-6 border-t border-white/10 text-center animate-fadeInUp">
                <span className="text-pink-300/70 text-sm tracking-wider uppercase">Written with love, just for you</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
