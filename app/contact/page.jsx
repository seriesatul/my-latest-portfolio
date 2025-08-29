"use client"
import { useRevealer } from "../hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from 'split-type';

const Contact = () => {
    useRevealer();
    const container = useRef();

    useGSAP(() => {
        const title = container.current.querySelector(".col:nth-child(1) h2");
        const contactCopies = container.current.querySelectorAll(".contact-copy");
        const contactLines = container.current.querySelectorAll(".contact-copy h2");
        const socialLinks = container.current.querySelectorAll(".socials p");

        // Safety check
        if (!title || contactLines.length === 0) return;

        const titleLines = new SplitType(title, { types: 'lines' }).lines;

        const tl = gsap.timeline({
            delay: 1.6
        });

        // --- THIS IS THE FIX ---
        // Instantly set the parent containers' opacity to 1.
        tl.set([title, ...contactCopies], { opacity: 1 });

        // Animate the "Contact Us" title
        tl.fromTo(titleLines,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' },
            "<" // Start at the same time
        );

        // Animate the contact details
        tl.fromTo(contactLines,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' },
            "-=0.8"
        );

        // Animate social links
        tl.fromTo(socialLinks,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
            "-=0.5"
        );

    }, { scope: container });

    return (
        <>
        <div className="revealer"></div>
        <div className="contact" ref={container}>
            <div className="col">
                <h2>Contact Us</h2>
            </div>
            <div className="col">
                <div className="contact-copy">
                    <h2>Collaborations</h2>
                    <h2>atulsingh04895@gmail.com</h2>
                </div>
                 <div className="contact-copy">
                    <h2>Inquiries</h2>
                    <h2>atulsingh04895@gmail.com</h2>
                </div>
                <div className="socials">
                    <p>Github</p>
                    <p>LinkedIn</p>
                    <p>Instagram</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Contact;