"use client"
import Link from "next/link"
import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation"

// Step 1: Add necessary imports
import { useRef } from "react";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin here or in your global setup file
gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  
  // Create a ref for the main navbar element
  const navRef = useRef();

  // Step 2: Implement the GSAP animation logic
  useGSAP(() => {
    // This creates a tween that controls the navbar's vertical position
    // We start it in a paused state
    const showNav = gsap.fromTo(navRef.current, {
      yPercent: -100 // Start hidden (100% of its own height above the viewport)
    }, {
      yPercent: 0,   // Animate to fully visible
      duration: 0.3,
      ease: 'power2.inOut',
      paused: true
    });

    // Use ScrollTrigger to control the animation based on scroll direction
    ScrollTrigger.create({
      start: "top top-=-80", // Start tracking after scrolling 80px down
      end: "max",
      onUpdate: (self) => {
        // self.direction will be 1 for scrolling down, -1 for scrolling up
        if (self.direction === -1) {
          showNav.play(); // If scrolling up, play the animation to show the nav
        } else {
          showNav.reverse(); // If scrolling down, reverse it to hide the nav
        }
      }
    });

  }, { scope: navRef }); // Scope the hook to our navbar for better performance and cleanup


  // ... your existing functions (triggerPageTransition, handleNavigation) are fine ...
  function triggerPageTransition(){
    document.documentElement.animate([
      { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }
    ],{
      duration: 1000,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      pseudoElement: "::view-transition-new(root)",
    })
  }
  const handleNavigation = (path) => (e) => {
    if(path === pathname){
      e.preventDefault();
      return;
    }
    router.push(path, { onTransitionReady: triggerPageTransition })
  }

  return (
      // Attach the ref to the main div
      <div className="nav" ref={navRef}>
        <div className="col">
          <div className="nav-logo">
              <Link href="/" onClick={handleNavigation("/")}><h1>portfolio</h1></Link>
          </div>
        </div>
        <div className="col">
           <div className="nav-items">
              <div className="nav-item">
                  <Link href="/work" onClick={handleNavigation("/work")}>showcase</Link>
              </div>
              <div className="nav-item">
                  <Link href="/studio" onClick={handleNavigation("/studio")}>story</Link>
              </div>
              <div className="nav-item">
                  <Link href="/contact" onClick={handleNavigation("/contact")}>contact</Link>
              </div>
           </div>
        </div>
        
        <div className="nav-copy">
          <p>prayagraj, U.P., India</p>
        </div>
      
      </div>
  )
}

export default Nav;