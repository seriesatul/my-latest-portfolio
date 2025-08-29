"use client"
import { useRevealer } from "../hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import SplitType from 'split-type';

const Contact = () => {
    useRevealer();
    const container = useRef();
    const [isSplit, setIsSplit] = useState(false);

    useEffect(() => {
        const title = container.current.querySelector(".col:nth-child(1) h2");
        if (title) {
            new SplitType(title, { types: 'lines' });
            setIsSplit(true);
        }
    }, []);

    useGSAP(() => {
        if (isSplit) {
            const title = container.current.querySelector(".col:nth-child(1) h2");
            const contactCopies = container.current.querySelectorAll(".contact-copy");
            const contactLines = container.current.querySelectorAll(".contact-copy h2");
            const socialLinks = container.current.querySelectorAll(".socials p");

            const titleLines = title.querySelectorAll('.line');

            const tl = gsap.timeline({ delay: 1.6 });

            tl.set([title, ...contactCopies], { opacity: 1 });

            tl.fromTo(titleLines,
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' },
                "<"
            );
            tl.fromTo(contactLines,
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' },
                "-=0.8"
            );
            tl.fromTo(socialLinks,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
                "-=0.5"
            );
        }
    }, [isSplit]);

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