"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const colorPalette = [
    '#FF6B6B', '#F7B801', '#06D6A0', '#118AB2', '#724CF9', '#EF476F',
    '#45F0DF', '#F72585', '#9B5DE5', '#FEE440', '#00F5D4', '#F95738'
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
};

const About = () => {
    const cardsData = [
        { title: "Blueprint & Architecture", image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1032", description: "Beyond the surface, I dive deep. Every project begins with a blueprint grounded in core CS principles. I leverage my training in System Design and DSA to architect solutions that are not just functional, but scalable, efficient, and built to last." },
        { title: "Intelligent & Intuitive Design", image: "https://plus.unsplash.com/premium_photo-1720503242835-b537741c9736?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1170", description: "I build human-centered interfaces where technology feels invisible. My approach to web development focuses on a seamless user experience, while my exploration into Agentic AI drives me to think about how applications can become more personalized and responsive." },
        { title: "Code as Craft", image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=687", description: "This is where vision becomes reality. I write clean, performant code using a modern web stack (React, Next.js, Node.js). My foundation in algorithms ensures my work is not just functional—it's thoughtfully optimized for speed and efficiency." },
        { title: "Launch & Evolve", image: "https://plus.unsplash.com/premium_photo-1745306842355-76a97ed6d803?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&q=80&w=1170", description: "Launching is just the beginning. I leverage automated CI/CD pipelines for seamless deployments. As a lifelong learner, I build systems that are architected to evolve, ready to integrate future technologies from advanced analytics to intelligent agents." }
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.card');
        
        if (!container || !cards.length) return;

        // --- The Master Timeline ---
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                pin: true,          // Pin the entire container
                scrub: 1,           // Smoothly scrub through the animation
                start: "top top",   // Start when the container hits the top of the viewport
                end: () => `+=${(cards.length - 1) * window.innerHeight}`, // End after scrolling a distance equal to the number of cards
                invalidateOnRefresh: true
            }
        });

        // Add an animation for each card (except the first one) to the timeline
        cards.forEach((card, index) => {
            if (index > 0) {
                // Animate the card FROM an off-screen position INTO its final stacked position
                timeline.from(card, {
                    yPercent: 105, // Start 105% of its height below its final position
                    ease: "none"
                }, "<0.5"); // The "<0.5" part ensures animations overlap slightly for a smoother feel
            }
        });

        return () => {
            // Kill the timeline and its ScrollTrigger on cleanup
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
                    // z-index ensures cards stack correctly on top of each other
                    style={{ zIndex: index }} 
                >
                    <div 
                        className="card-inner"
                        style={{ backgroundColor: getRandomColor() }}
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