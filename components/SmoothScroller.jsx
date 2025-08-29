"use client"; // This component must be a client component

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroller = () => {
  // We use GSAP's context to properly initialize and clean up GSAP logic
  useGSAP(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2, // speed
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
    });

    // 2. Sync GSAP ScrollTrigger with Lenis's scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Tell GSAP to use Lenis's ticker for updates, ensuring perfect synchronization.
    gsap.ticker.add((time) => {
        // We multiply by 1000 because GSAP's time is in seconds, but Lenis's is in milliseconds.
        lenis.raf(time * 1000);
    });

    // 4. Set a refresh function for ScrollTrigger to use on resize or other updates
    ScrollTrigger.defaults({ scroller: "body" }); // Use body as the scroller
    
    // Optional: A function to refresh ScrollTrigger on demand
    const refresh = () => {
        ScrollTrigger.refresh();
    }
    
    // Optional: Refresh on resize
    window.addEventListener('resize', refresh);
    
    // Cleanup function to run when the component unmounts
    return () => {
        lenis.destroy();
        window.removeEventListener('resize', refresh);
    };

  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render any visible JSX
};

export default SmoothScroller;