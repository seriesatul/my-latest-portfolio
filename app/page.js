"use client"
import About from "@/components/About";
import { useRevealer } from "./hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from 'split-type'; // Remember: run npm install split-type if you haven't

export default function Home() {
  useRevealer();
  const container = useRef();

  useGSAP(() => {
    const h1 = container.current.querySelector(".header h1");
    if (!h1) return; // Safety check

    const chars = new SplitType(h1, { types: 'chars' }).chars;

    // A GSAP Timeline gives us precise control over the animation sequence
    const tl = gsap.timeline({
      delay: 1.6 // This single delay waits for the revealer to finish
    });

    // 1. FIRST, make the parent <h1> visible so its children can appear.
    // We use .set() to do this instantly at the start of the timeline.
    tl.set(h1, { opacity: 1 });

    // 2. THEN, animate the characters and the image.
    // The "<" at the end tells GSAP to start these animations at the same time
    // as the previous step (the very beginning of the timeline).

    tl.fromTo(chars,
      { // FROM state
        yPercent: 100,
        opacity: 0
      },
      { // TO state
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
      },
      "<" // Start at the same time as the .set()
    );

    tl.fromTo(".hero-img",
      { // FROM state
        yPercent: 40,
        delay:2,
        scale: 1.,
        opacity: 0
      },
      { // TO state
        yPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
      },
      "<" // Also start at the same time
    );

  }, { scope: container });

  return (
    <>
      <div className="revealer"></div>
      <div className="home" ref={container}>
        <div className="header">
          <h1>CHAUHAN</h1>
        </div>
        <div className="hero-img">
          <img src="/hero-img.png" alt="Hero Image" />
        </div>
      </div>

      <div className="portfolio">
        <h1>Welcome to my Portfolio</h1>
        <About/>
      </div>


    </>
  );
}