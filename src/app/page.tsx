"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import SplitText from '@/components/SplitText';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
          delay: 0.5, // Start after split text animation
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 -z-10">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <main
        role="main"
        className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center"
      >
        <div ref={logoRef} className="opacity-0">
          <Image
            src="/logo_opendex.png"
            alt="Logo de la empresa"
            width={35}
            height={35}
            data-ai-hint="logo"
            className="mb-8"
          />
        </div>
        <h1
          className="font-bold tracking-tighter text-foreground transition-shadow duration-300 text-glow-hover"
        >
          <SplitText>Algo nuevo está por llegar</SplitText>
        </h1>
        <p ref={pRef} className="mt-4 max-w-xl text-lg md:text-xl text-muted-foreground opacity-0">
          Estamos trabajando en algo increíble. Vuelve pronto para descubrirlo.
        </p>
      </main>
      <footer ref={footerRef} className="relative z-10 p-6 text-center text-xs text-muted-foreground opacity-0">
        <p className="font-code">© 2025, Opendex Corporation. o sus empresas afiliadas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
