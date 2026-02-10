import React, { useEffect, useRef, useState } from 'react';

const HEARTS = ['💖', '💗', '💕', '✨', '💫', '🌸'];

const Hero = () => {
  const canvasRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = [];
    const starField = [];

    // Create starfield
    for (let i = 0; i < 120; i++) {
      starField.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Create floating hearts
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height,
        size: Math.random() * 24 + 12,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -(Math.random() * 1.5 + 0.5),
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        opacity: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starField.forEach(star => {
        const opacity = 0.3 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.4;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });

      // Draw hearts
      particles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.8;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated aurora background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0533] to-[#2d0a4e] animate-aurora" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,127,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,47,247,0.15),transparent_50%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />

      {/* Main Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-10 py-2 rounded-full glass animate-pulse-glow">
          <span className="text-lg">💌</span>
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-pink-200">A Letter From My Heart</span>
        </div>

        {/* Title */}
        <h1 className="font-display mb-8">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-tight"
                style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
            Every love story
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-pink-300/80 mb-2 leading-tight">
            is beautiful,
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
            but ours is my
          </span>
          <span className="block text-6xl md:text-8xl lg:text-9xl font-bold gradient-text italic leading-tight">
            favourite.
          </span>
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mt-10 mb-12">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-500/50" />
          <span className="animate-heartbeat text-2xl">💕</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500/50" />
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-pink-300/60 text-sm tracking-wider uppercase">Scroll to explore</span>
          <svg className="w-6 h-6 text-pink-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
