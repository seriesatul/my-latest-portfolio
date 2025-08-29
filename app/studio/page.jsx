"use client"
import { useRevealer } from "../hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from 'split-type';

const Studio = () => {
    useRevealer();
    const container = useRef();

    useGSAP(() => {
        const title = container.current.querySelector(".col:nth-child(1) h2");
        const storyParagraph = container.current.querySelector(".col:nth-child(2) > h2");
        const aboutImg = container.current.querySelector(".about-img");

        // Safety check to prevent errors if elements aren't found
        if (!title || !storyParagraph || !aboutImg) return;

        const titleLines = new SplitType(title, { types: 'lines' }).lines;
        const storyLines = new SplitType(storyParagraph, { types: 'lines' }).lines;

        const tl = gsap.timeline({
            delay: 1.6
        });

        // --- THIS IS THE FIX ---
        // Instantly set the parent containers' opacity to 1 so their children can be seen.
        tl.set([title, storyParagraph], { opacity: 1 });

        // Animate the "My Story" title with opacity
        tl.fromTo(titleLines,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' },
            "<" // Start at the same time as the .set()
        );

        // Animate the main paragraph with opacity
        tl.fromTo(storyLines,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out' },
            "-=0.8"
        );

        // Animate the image in
        tl.fromTo(aboutImg,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
            "<"
        );

    }, { scope: container });

    return(
        <>
        <div className="revealer"></div>
        <div className="studio" ref={container}>
            <div className="col">
                <h2>My Story</h2>
            </div>
            <div className="col">
                <h2>I’m Atul, a Computer Science Engineering student who believes technology should not just work — it should feel alive. My journey began with simple curiosity: writing small scripts and experimenting with how computers respond. That curiosity grew into building projects like personal assistants, emotion-driven bots, news-perspective apps, and even creative platforms that blend storytelling with code.</h2>
                <div className="about-img">
                    <img src="/about-img.png" alt="" />
                </div>
            </div>
        </div>
        </>
    )
}
export default Studio;