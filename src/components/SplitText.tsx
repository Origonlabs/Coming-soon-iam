"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

interface SplitTextProps {
  children: React.ReactNode;
}

export default function SplitText({ children }: SplitTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const text = new SplitType(textRef.current, { types: 'chars' });
    const chars = text.chars;

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3,
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return <span ref={textRef} style={{ display: 'inline-block' }}>{children}</span>;
}
