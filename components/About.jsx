"use client";
import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. A more vibrant color palette with high contrast for white text ---
const vibrantColorPalette = [
    '#E63946', // Imperial Red
    '#F77F00', // Tangerine
    '#3A86FF', // Royal Blue
    '#8338EC', // Blue Violet
    '#3A0CA3', // Palatinate Blue
    '#00BFA5', // Teal
    '#FF006E', // Neon Pink
    '#1B4332', // Dark Forest Green
    '#D00000', // Strong Red
    '#5F0F40', // Tyrian Purple
    '#03045E', // Midnight Blue
    '#FB8500', // Orange
];

// --- 2. A helper function to shuffle the color array ---
// This ensures the color order is random on every page load.
const shuffleArray = (array) => {
    // Create a copy to avoid modifying the original array
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
};


const About = () => {
    const cardsData = [
        { title: "Blueprint & Architecture", image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1032", description: "Beyond the surface, I dive deep. Every project begins with a blueprint grounded in core CS principles. I leverage my training in System Design and DSA to architect solutions that are not just functional, but scalable, efficient, and built to last." },
        { title: "Intelligent & Intuitive Design", image: "https://plus.unsplash.com/premium_photo-1720503242835-b537741c9736?ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1170", description: "I build human-centered interfaces where technology feels invisible. My approach to web development focuses on a seamless user experience, while my exploration into Agentic AI drives me to think about how applications can become more personalized and responsive." },
        { title: "Code as Craft", image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=687", description: "This is where vision becomes reality. I write clean, performant code using a modern web stack (React, Next.js, Node.js). My foundation in algorithms ensures my work is not just functional—it's thoughtfully optimized for speed and efficiency." },
        { title: "Launch & Evolve", image: "https://plus.unsplash.com/premium_photo-1745306842355-76a97ed6d803?ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1170", description: "Launching is just the beginning. I leverage automated CI/CD pipelines for seamless deployments. As a lifelong learner, I build systems that are architected to evolve, ready to integrate future technologies from advanced analytics to intelligent agents." }
    ];

    const containerRef = useRef(null);

    // --- 3. Create a shuffled, unique color list ONCE per component render ---
    // useMemo ensures this shuffle only happens once, preventing color changes on re-renders.
    const uniqueCardColors = useMemo(() => shuffleArray(vibrantColorPalette), []);


    useEffect(() => {
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.card');
        
        if (!container || !cards.length) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${(cards.length - 1) * window.innerHeight}`,
                invalidateOnRefresh: true
            }
        });

        cards.forEach((card, index) => {
            if (index > 0) {
                timeline.from(card, {
                    yPercent: 105,
                    ease: "none"
                }, "<0.5");
            }
        });

        return () => {
            if (timeline.scrollTrigger) {
                timeline.scrollTrigger.kill();
            }
            timeline.kill();
        };
    }, []);

    return (
        <div className='about' ref={containerRef}>
            {cardsData.map((props, index) => (
                <div 
                    className='card'
                    key={index}
                    style={{ zIndex: index }} 
                >
                    <div 
                        className="card-inner"
                        // --- 4. Assign a unique color from our shuffled list ---
                        style={{ backgroundColor: uniqueCardColors[index % uniqueCardColors.length] }}
                    >
                        <div className="card-content">
                            <h1>{props.title}</h1>
                            <p>{props.description}</p>
                        </div>
                        <div className="card-image">
                            <img src={props.image} alt={props.title} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default About;