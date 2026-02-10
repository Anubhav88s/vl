import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const Proposal = () => {
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const noRef = useRef(null);
  const sectionRef = useRef(null);

  const noTexts = [
    'No 😢', 'Are you sure? 🥺', 'Really sure? 😭',
    'Think again! 💔', 'Please? 🙏', 'Don\'t do this 😩',
    'I\'ll cry 😢', 'You\'re breaking my heart 💔',
    'NOOO 😭😭', 'Last chance! 🥺',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNoHover = () => {
    if (!noRef.current) return;
    const parent = noRef.current.parentElement.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnW = noRef.current.offsetWidth;
    const btnH = noRef.current.offsetHeight;
    const maxX = parentRect.width - btnW - 20;
    const maxY = parentRect.height - btnH - 20;
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
    noRef.current.style.position = 'absolute';
    noRef.current.style.left = `${x}px`;
    noRef.current.style.top = `${y}px`;
    setNoAttempts(prev => prev + 1);
    setYesScale(prev => Math.min(prev + 0.15, 2.5));
  };

  const fireConfetti = () => {
    const duration = 8000;
    const end = Date.now() + duration;
    const colors = ['#ff007f', '#ff6b9d', '#c471ed', '#7b2ff7', '#ffd700', '#ffffff'];

    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors });

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  if (accepted) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 animate-aurora" />
        <div className="relative z-10 text-center px-6 animate-fadeInScale">
          <div className="text-8xl mb-8 animate-heartbeat">💖</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>
            I KNEW IT!
          </h2>
          <p className="text-2xl text-pink-100 mb-4">You just made me the happiest person alive!</p>
          <p className="text-6xl mt-8">🥹💕🎉</p>
          <div className="mt-12 flex justify-center gap-4">
            {['💑', '💏', '👩‍❤️‍👨', '💞'].map((e, i) => (
              <span key={i} className="text-4xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0533] to-[#0a0015]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.1),transparent_40%)]" />

      {/* Floating background hearts */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-10 animate-float pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        >
          💕
        </span>
      ))}

      <div className={`relative z-10 w-full max-w-lg px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
           style={{ minHeight: '400px' }}>
        <div className="glass p-6 md:p-12 text-center animate-pulse-glow relative overflow-hidden">
          {/* Shimmering border overlay */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50 animate-shimmer opacity-50 pointer-events-none"
               style={{ backgroundSize: '200% auto' }} />

          <div className="text-6xl mb-6">🥺👉👈</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Will You Be My Valentine?
          </h2>
          <p className="text-pink-200/80 mb-10 text-lg">
            {noAttempts > 3
              ? "The 'No' button is trying to run away too! 😂"
              : "Please say yes... I made this whole website for you! 🥹"}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative" style={{ minHeight: '80px' }}>
            <button
              onClick={handleYes}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 text-xl z-10 w-full md:w-auto"
              style={{
                transform: `scale(${yesScale})`,
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              Yes! 💖
            </button>

            <button
              ref={noRef}
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              className="px-8 py-4 bg-gray-700/50 text-white rounded-full backdrop-blur text-lg transition-all duration-300 border border-white/10 hover:bg-gray-600/50 z-10 w-full md:w-auto"
            >
              {noTexts[Math.min(noAttempts, noTexts.length - 1)]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proposal;
