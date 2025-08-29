"use client"
import { useRevealer } from "../hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react"; // 1. Import hooks

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
    useRevealer();
    const container = useRef();
    
    // 2. Create a "ready" state, initially false
    const [isReady, setIsReady] = useState(false);

    // 3. This effect runs ONCE after the component has fully mounted
    useEffect(() => {
        // Its only job is to flip the switch to true
        setIsReady(true);
    }, []); // Empty array ensures it runs only once

    // 4. This GSAP code now WAITS for `isReady` to be true
    useGSAP(() => {
        if (isReady) {
            // Now it's safe to run animations because the DOM is stable
            gsap.fromTo("h1",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: "h1",
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(".projects img",
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".projects",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, [isReady]); // 5. The dependency array is the key!

    return (
        <>
        <div className="revealer"></div>
        <div className="work" ref={container}>
            <h1>Showcase</h1>
            <div className="projects">
                <img src="https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%D" alt="Project 1" />
                <img src="https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%D" alt="Project 2" />
                <img src="https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%D" alt="Project 3" />
                <img src="https://images.unsplash.com/photo-1720884413532-59289875c3e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%D%D" alt="Project 4" />
            </div>
        </div>
        </>
    )
}
export default Work;