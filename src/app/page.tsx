
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([logoRef.current, h1Ref.current, pRef.current, footerRef.current], { opacity: 1, y: 0 });
        return;
      }
      
      gsap.fromTo(
        [logoRef.current, h1Ref.current, pRef.current, footerRef.current],
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.3,
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
            width={150}
            height={50}
            data-ai-hint="logo"
            className="mb-8"
          />
        </div>
        <h1
          ref={h1Ref}
          className="font-bold tracking-tighter text-foreground opacity-0 transition-shadow duration-300 text-glow-hover"
        >
          Esta página está en desarrollo
        </h1>
        <p ref={pRef} className="mt-4 max-w-xl text-lg md:text-xl text-muted-foreground opacity-0">
          Estará disponible próximamente
        </p>
      </main>
      <footer ref={footerRef} className="relative z-10 p-6 text-center text-xs text-muted-foreground opacity-0">
        <p>© 2025, Opendex Corporation. o sus empresas afiliadas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
