"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [currentYear] = useState(() => new Date().getFullYear());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([logoRef.current, titleRef.current, subtitleRef.current, badgeRef.current, footerRef.current], { 
          opacity: 1, 
          y: 0,
          scale: 1 
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(logoRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2 }
      )
      .fromTo(titleRef.current,
        { y: 100, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      {/* Floating Orbs with Parallax */}
      <div 
        className="absolute inset-0 -z-10 transition-transform duration-300 ease-out" 
        aria-hidden="true"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-radial from-transparent via-transparent to-background/80" aria-hidden="true" />

      {/* Noise Texture */}
      <div className="absolute inset-0 -z-5 opacity-[0.015] dark:opacity-[0.025] pointer-events-none bg-noise" aria-hidden="true" />

      {/* Glowing Lines */}
      <div className="absolute inset-0 -z-5 overflow-hidden" aria-hidden="true">
        <div className="glow-line glow-line-1" />
        <div className="glow-line glow-line-2" />
      </div>

      {/* Main Content */}
      <main role="main" className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
        
        {/* Logo with Glow */}
        <div ref={logoRef} className="relative mb-12 opacity-0">
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150 animate-pulse-slow" />
          <div className="relative glass-card p-4 rounded-2xl">
            <Image
              src="/logo_opendex.png"
              alt="Logo de Opendex"
              width={50}
              height={50}
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div ref={heroRef} className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Title with Gradient */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight opacity-0"
          >
            <span className="block text-foreground/90">Algo nuevo</span>
            <span className="block gradient-text-animated mt-2">está por llegar</span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            Estamos creando algo <span className="text-primary font-medium">extraordinario</span>. 
            Una nueva experiencia que transformará la forma en que interactúas con la tecnología.
          </p>

          {/* Status Badge */}
          <div ref={badgeRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 opacity-0">
            <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-foreground/80">En desarrollo activo</span>
            </div>
            
            <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-medium text-foreground/80">Lanzamiento {currentYear}</span>
            </div>
          </div>

          {/* Email Signup Teaser */}
          <div className="pt-8">
            <div className="glass-card-strong max-w-md mx-auto p-1.5 rounded-full">
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="flex-1 bg-transparent px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Email para notificaciones"
                />
                <button className="liquid-glass-btn text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm">
                  Notifícame
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Sé el primero en saber cuando lancemos. Sin spam, lo prometemos.
            </p>
          </div>

        </div>
      </main>

      {/* Social Links */}
      <div className="relative z-10 flex justify-center gap-6 pb-4">
        <a href="#" className="glass-card p-3 rounded-full hover:scale-110 transition-transform duration-300 group" aria-label="Twitter">
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" className="glass-card p-3 rounded-full hover:scale-110 transition-transform duration-300 group" aria-label="GitHub">
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>
        <a href="#" className="glass-card p-3 rounded-full hover:scale-110 transition-transform duration-300 group" aria-label="LinkedIn">
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef} 
        className="relative z-10 p-6 text-center opacity-0"
      >
        <div className="glass-card-subtle inline-block px-6 py-3 rounded-full">
          <p className="text-xs text-muted-foreground font-code">
            © {currentYear} Opendex Corporation. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
