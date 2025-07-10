import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';

// Register plugin once
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const [showContent, setShowContent] = useState(false);
  
  // Refs for key elements for safe access
  const mainRef = useRef();
  const svgContainerRef = useRef();

  // --- Animation 1: SVG Mask Intro ---
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // When the SVG animation is done, show the main content
        setShowContent(true);
      }
    });

    tl.to('.vi-mask-group', {
        duration: 2,
        ease: 'Power4.easeInOut',
        transformOrigin: '50% 50%',
      })
      .to('.vi-mask-group', {
        scale: 10,
        duration: 3.5,
        delay: -1.8,
        ease: 'Expo.easeInOut',
        transformOrigin: '50% 50%',
        opacity: 0,
      })
      .to(svgContainerRef.current, { // Fade out the entire SVG container
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          svgContainerRef.current.style.display = 'none'; // Remove from layout
        }
      }, "-=1"); // Overlap the fade out
  });

  // --- Animation 2: Main Content Intro Sequence (FIXED) ---
  useGSAP(() => {
    // This hook only runs when showContent becomes true
    if (!showContent) return;

    const tl = gsap.timeline();

    // Step 1: Animate IN the "Welcome to, my Portfolio" text
    tl.fromTo('.landing .image', {
      scale: 1.2,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
    });

    // Step 2: Animate OUT the "Welcome to, my Portfolio" text
    tl.to('.landing .image', {
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
      delay: 0.5,
    });
    
    // Step 3: Animate IN the main hero scene (parallax elements)
    // This happens while the "Welcome" text is fading out for a smooth transition
    tl.fromTo(['.sky', '.bg', '.text', '.character', '.bottombar'], {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
    }, "<"); // The "<" starts this animation at the same time as the previous one

    // Staggered animation for the parallax layers for a more dynamic feel
    tl.from('.sky', { scale: 1.2, rotate: -5, duration: 2, ease: 'expo.out' }, "<")
      .from('.bg', { scale: 1.2, rotate: -5, duration: 2, ease: 'expo.out' }, "<0.1")
      .from('.text', { scale: 1.1, rotate: -5, duration: 2, ease: 'expo.out' }, "<0.1")
      .from('.character', { y: '100%', rotate: -10, duration: 1.5, ease: 'expo.out' }, "<0.2");

  }, [showContent]);

  // --- Animation 3: Interactive Scroll & Mouse Effects ---
  useGSAP(() => {
    if (!showContent) return;

    // Scroll-based zoom out effect for the entire hero scene
    gsap.to('.imagesdiv', {
      scale: 0.9,
      scrollTrigger: {
        trigger: '.landing',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      }
    });

    // Parallax mouse move effect
    const mainElement = mainRef.current;
    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to('.text', { x: xMove * 1.5, ease: 'power1.out' });
      gsap.to(".sky", { x: xMove * 0.5, ease: 'power1.out' });
      gsap.to(".bg", { x: xMove, ease: 'power1.out' });
      gsap.to(".character", { x: `-50% + ${xMove * 2}px`, ease: 'power1.out' });
    };
    mainElement.addEventListener('mousemove', handleMouseMove);

    // Cleanup function for the event listener
    return () => {
        mainElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, [showContent]);

  return (
    <div ref={mainRef}>
      {/* SVG Mask Container - This will be animated first */}
      <div ref={svgContainerRef} className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text x="50%" y="50%" fontSize="150" textAnchor="middle" fill="white" dominantBaseline="middle" fontFamily="pricedown">
                  Portfolio
                </text>
              </g>
            </mask>
          </defs>
          <image href="./Screenshot 2025-07-01 193711.png" width="100%" height="80%" preserveAspectRatio="xMidYMid slice" mask="url(#viMask)" />
        </svg>
      </div>

      {/* Main Content - Renders only after the SVG animation is complete */}
      {showContent && (
        <div>
          <div className='navbar fixed top-0 left-0 w-full py-10 px-10 z-50 flex justify-between items-center'>
            <h3 className='text-3xl -mt-2 text-white'>Portfolio</h3>
            <div className='logo flex gap-4'>
              <div className='text-white gap-1 flex flex-col lines'>
                <div className='line bg-zinc-50 h-2 w-8'></div>
                <div className='line bg-zinc-50 h-2 w-8'></div>
              </div>
            </div>
          </div>
          
          <div className='main overflow-hidden relative w-full bg-black'>
            <div className='landing overflow-hidden relative w-full h-screen'>
              <div className='imagesdiv relative overflow-hidden w-full h-screen'>
                
                {/* FIX: This is the transitional "Welcome" text. It's animated in, then out. */}
                <div className='image w-full flex flex-col items-center justify-center overflow-hidden z-40 bg-black text-white absolute inset-0'>
                  <h1 className='text-9xl'>Welcome</h1>
                  <h1 className='text-9xl'>to, my</h1>
                  <h1 className='text-9xl'>Portfolio</h1>
                </div>

                {/* These are the main hero elements that fade in after the "Welcome" text */}
                <img className='w-full scale-[1.1] sky absolute h-full object-cover z-10' src="./sky.png" alt="" />
                <img className='w-full scale-[1.1] bg absolute h-full object-cover z-20' src="./bg.png" alt="" />
                <div className='text text-white top-5 left-1/2 -translate-x-1/2 absolute z-30'>
                  <h1 className='text-8xl -ml-10'>Atul</h1>
                  <h1 className='text-8xl ml-10'>Singh</h1>
                  <h1 className='text-8xl -ml-40'>Chauhan</h1>
                </div>
                <img className='left-1/2 top-[30%] -translate-y-1/2 character absolute scale-[1] -bottom-[80%] w-[30%] -translate-x-1/2 z-30 rounded-lg' src="./20250609_1756_Stylized Selfie Character_remix_01jxaacr6be7xvddsc4v7yy3d5 (1).png" alt="" />
                <div className='text-white bottombar flex gap-4 absolute w-full h-20 items-center bottom-0 bg-gradient-to-t from-black to-transparent z-40'>
                  <i className="ml-4 p-2 border-white font-light text-4xl rounded-full ri-arrow-down-circle-line"></i>
                  <h3 className='text-2xl font-sans'>Scroll Down</h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;