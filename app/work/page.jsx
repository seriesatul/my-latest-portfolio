"use client"
import { useRevealer } from "../hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
    useRevealer();
    const container = useRef();

    useGSAP(() => {
        gsap.fromTo(".work h1",
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: ".work h1",
                    start: "top 85%", // Start animation when top of h1 is 85% down the viewport
                    toggleActions: "play none none reverse" // Play on enter, reverse on leave back
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

    }, { scope: container });

    return (
        <>
        <div className="revealer"></div>
        <div className="work" ref={container}>
            <h1>Showcase</h1>
            <div className="projects">
                <img src="https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <img src="https://images.unsplash.com/photo-1720884413532-59289875c3e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>
        </div>
        </>
    )
}
export default Work;