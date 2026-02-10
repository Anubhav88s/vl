import React, { useEffect, useRef, useState } from 'react';

const events = [
  { emoji: '💫', date: 'Chapter 1', title: 'The Day We Met', desc: 'The universe conspired to bring us together. That moment changed everything — my world went from monochrome to every colour imaginable.' },
  { emoji: '🦋', date: 'Chapter 2', title: 'Butterflies', desc: 'Every text made my heart race. Every call made time stop. I knew this wasn\'t just a crush — this was the beginning of something extraordinary.' },
  { emoji: '💑', date: 'Chapter 3', title: 'Us', desc: 'And then it was official. You and me, together. The best decision of my life. Every day with you feels like a dream I never want to wake up from.' },
  { emoji: '♾️', date: 'Chapter ∞', title: 'Forever', desc: 'This story has no ending. It\'s you and me until the stars burn out. I\'ll choose you in every lifetime, in every universe, always.' },
];

const TimelineItem = ({ event, index, isLeft }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 md:mb-20 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
        <div
          className={`glass transition-all duration-700 hover:border-pink-500/30 overflow-hidden flex flex-col ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : `opacity-0 ${isLeft ? '-translate-x-16' : 'translate-x-16'}`
          }`}
          style={{ transitionDelay: `${index * 200}ms`, padding: '40px' }}
        >
          <span className="text-pink-400 font-bold text-xs tracking-[0.3em] uppercase block mb-2">
            {event.date}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-display">{event.title}</h3>
          <p className="text-purple-200/70 leading-relaxed text-sm break-words">{event.desc}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30 transition-all duration-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 200 + 100}ms` }}
        >
          <span className="text-xl">{event.emoji}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const Timeline = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, windowHeight - rect.top);
      const total = rect.height + windowHeight;
      const pct = Math.min(1, scrolled / total);
      setLineHeight(pct * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-24 px-4 min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0015] via-[#0d0020] to-[#0a0015]" />

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-5xl block mb-4 animate-float">📖</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h2>
          <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
          <p className="mt-4 text-purple-300/60 text-lg">Every chapter is my favourite</p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Animated line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-white/5 h-full rounded-full">
            <div
              className="w-full bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
