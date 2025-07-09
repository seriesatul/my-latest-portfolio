import React, { useEffect } from "react"
import Landing from "./Landing"
import About from "./About"
import Lenis from 'lenis';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const GTAIntroduction = () => {

  useEffect(()=>{
     const lenis = new Lenis();
        const update = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);

        // Cleanup on component unmount
        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
  })






  return (
    <>
    <Landing/>
    <About/>
    </>
    
  )
}

export default GTAIntroduction