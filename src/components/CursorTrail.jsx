import React, { useEffect, useState } from 'react';

const SPARKLES = ['✨', '💖', '💗', '💕', '🌸', '⭐'];

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return; // Throttle
      lastTime = now;

      const id = now + Math.random();
      const sparkle = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
      setTrail(prev => [...prev.slice(-15), {
        id,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        sparkle,
      }]);

      setTimeout(() => {
        setTrail(prev => prev.filter(p => p.id !== id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trail.map(p => (
        <span
          key={p.id}
          className="cursor-heart"
          style={{ left: p.x, top: p.y }}
        >
          {p.sparkle}
        </span>
      ))}
    </div>
  );
};

export default CursorTrail;
