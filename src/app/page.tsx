"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import SplitText from '@/components/SplitText';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [currentYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([logoRef.current, pRef.current, footerRef.current], { opacity: 1, y: 0 });
        return;
      }
      
      gsap.fromTo(
        [logoRef.current, pRef.current, footerRef.current],
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 -z-5 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-noise" aria-hidden="true" />
      
      <main
        role="main"
        className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center"
      >
        <div ref={logoRef} className="opacity-0">
          <Image
            src="/logo_opendex.png"
            alt="Logo de Opendex"
            width={40}
            height={40}
            priority
            className="mb-8 drop-shadow-lg"
          />
        </div>
        
        <h1 className="font-bold tracking-tighter text-foreground transition-all duration-300 text-glow-hover">
          <SplitText>Algo nuevo está por llegar</SplitText>
        </h1>
        
        <p 
          ref={pRef} 
          className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground opacity-0 leading-relaxed"
        >
          Estamos trabajando en algo increíble. Vuelve pronto para descubrirlo.
        </p>
        
        {/* Optional: Email signup teaser */}
        <div className="mt-12 opacity-0" ref={pRef as never}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            En desarrollo activo
          </div>
        </div>
      </main>
      
      <footer 
        ref={footerRef} 
        className="relative z-10 p-6 text-center text-xs text-muted-foreground opacity-0"
      >
        <p className="font-code">
          © {currentYear}, Opendex Corporation. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
