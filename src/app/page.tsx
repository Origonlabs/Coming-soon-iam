"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Importar Beams dinámicamente (Three.js no funciona con SSR)
const Beams = dynamic(
  () => import('@/components/Beams').catch(() => () => null),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
  }
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  // const logoRef = useRef<HTMLDivElement>(null);
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
        gsap.set([titleRef.current, subtitleRef.current, badgeRef.current, footerRef.current], { 
          opacity: 1, 
          y: 0,
          scale: 1 
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1 }
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
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex flex-col">
      
      {/* Beams Background */}
      <div className="beams-wrapper" aria-hidden="true">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#6872f8"
          speed={2.8}
          noiseIntensity={0}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-background/50 via-background/30 to-background/70" aria-hidden="true" />

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

      {/* Noise Texture */}
      <div className="absolute inset-0 -z-5 opacity-[0.015] dark:opacity-[0.025] pointer-events-none bg-noise" aria-hidden="true" />

      {/* Glowing Lines */}
      <div className="absolute inset-0 -z-5 overflow-hidden" aria-hidden="true">
        <div className="glow-line glow-line-1" />
        <div className="glow-line glow-line-2" />
      </div>

      {/* Main Content */}
      <main role="main" className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
        
        {/* Logo with Glow - Removed */}
        {/* <div ref={logoRef} className="relative mb-12 opacity-0">
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
        </div> */}

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

          {/* Status Badge - Vercel Style with Liquid Glass */}
          <div ref={badgeRef} className="pt-10 opacity-0">
            {/* Premium Status Container */}
            <div className="vercel-status-container">
              <div className="vercel-status-inner">
                {/* Live Indicator */}
                <div className="vercel-status-badge group">
                  <div className="vercel-pulse-dot">
                    <span className="vercel-pulse-ring" />
                    <span className="vercel-pulse-core" />
                  </div>
                  <span className="vercel-status-text">En desarrollo</span>
                </div>

                {/* Elegant Divider */}
                <div className="vercel-divider" />

                {/* Launch Badge */}
                <div className="vercel-launch-badge group">
                  <div className="vercel-launch-icon">
                    <Image 
                      src="/logo_opendex.png" 
                      alt="Opendex Logo" 
                      width={16} 
                      height={16} 
                      className="w-4 h-4 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="vercel-launch-text">{currentYear}</span>
                </div>
              </div>
            </div>

            {/* Secondary Status Row */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="vercel-metric">
                <span className="vercel-metric-value">99.9%</span>
                <span className="vercel-metric-label">Uptime</span>
              </div>
              <div className="vercel-metric-divider" />
              <div className="vercel-metric">
                <span className="vercel-metric-value">&lt;50ms</span>
                <span className="vercel-metric-label">Latency</span>
              </div>
              <div className="vercel-metric-divider" />
              <div className="vercel-metric">
                <span className="vercel-metric-value">Edge</span>
                <span className="vercel-metric-label">Global</span>
              </div>
            </div>
          </div>

          {/* Email Signup - shadcn/ui Design */}
          <div className="pt-16 pb-8 w-full max-w-xl mx-auto px-4">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-xs font-medium border-primary/20 bg-primary/5 text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Acceso Anticipado
              </Badge>
            </div>

            {/* Main Card */}
            <Card className="border-border/40 bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/5">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                  Sé el primero en saberlo
                </CardTitle>
                <CardDescription className="text-base max-w-sm mx-auto">
                  Únete a los pioneros y obtén acceso exclusivo antes del lanzamiento oficial.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Email Form */}
                <form className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <svg 
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <Input 
                      type="email" 
                      placeholder="nombre@empresa.com"
                      className="pl-8 h-7 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 text-xs"
                      aria-label="Email para lista de espera"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-7 px-6 font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-xs"
                  >
                    <span>Unirme</span>
                    <svg className="w-3.5 h-3.5 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Button>
                </form>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Sin spam</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Acceso anticipado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>Beneficios VIP</span>
                  </div>
                </div>

                {/* Subscribers Social Proof */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border/30">
                  <div className="flex -space-x-2">
                    {['bg-gradient-to-br from-violet-500 to-purple-600', 'bg-gradient-to-br from-pink-500 to-rose-500', 'bg-gradient-to-br from-blue-500 to-cyan-500', 'bg-gradient-to-br from-emerald-500 to-teal-500'].map((gradient, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full ${gradient} ring-2 ring-background flex items-center justify-center text-xs font-semibold text-white shadow-lg`}
                      >
                        {['A', 'M', 'J', 'C'][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">2,847+</span> pioneros ya están en la lista
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

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
