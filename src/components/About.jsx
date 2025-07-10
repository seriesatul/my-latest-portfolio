import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import React, { useRef, useEffect } from 'react';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Refs for all key elements to ensure safe and direct access
    const main = useRef();
    const componentWrapperRef = useRef(); // <-- NEW: Ref for the entry animation trigger
    const heroSectionRef = useRef();
    const heroHeaderRef = useRef();
    const animatedIconsRef = useRef();
    
    // Lenis setup for smooth scrolling
    useEffect(() => {
        const lenis = new Lenis();
        const update = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    // --- NEW: Entry Animation for the whole component ---
    useGSAP(() => {
        const entryTl = gsap.timeline({
            scrollTrigger: {
                trigger: componentWrapperRef.current,
                start: 'top 80%', // Start when the top of the wrapper is 80% from the top of the viewport
                end: 'bottom top',
                toggleActions: 'play none none reverse', // Play on enter, reverse on leave
            }
        });

        // Animate the header text into view
        entryTl.from(heroHeaderRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
        });

        // Animate the icons into view with a stagger
        entryTl.from(animatedIconsRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
        }, "-=1.2"); // Overlap the animations for a smoother effect

    }, { scope: main });

    // --- Main Pinned Scroll Animation (Unchanged) ---
    useGSAP(() => {
        const iconElements = gsap.utils.toArray('.animated-icon', animatedIconsRef.current);
        const textSegments = gsap.utils.toArray('.text-segment', main.current);
        const placeholders = gsap.utils.toArray('.placeholder-icon', main.current);
        
        const textAnimationOrder = [...textSegments].sort(() => Math.random() - 0.5);

        const isMobile = window.innerWidth < 1000;
        const headerIconSize = isMobile ? 30 : 60;
        const currentIconSize = iconElements[0]?.getBoundingClientRect().width || 60;
        const exactScale = headerIconSize / currentIconSize;

        let duplicateIcons = null;

        ScrollTrigger.create({
            trigger: heroSectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 8}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const { progress } = self;
                const heroHeader = heroHeaderRef.current;
                const animatedIconsContainer = animatedIconsRef.current;
                const heroSection = heroSectionRef.current;

                // Phase 1: 0% to 30%
                if (progress < 0.3) {
                    const moveProgress = progress / 0.3;
                    const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

                    gsap.set(heroHeader, {
                        y: progress < 0.15 ? -50 * (progress / 0.15) : -50,
                        opacity: progress < 0.15 ? 1 - (progress / 0.15) : 0,
                    });
                    
                    if (duplicateIcons) {
                        duplicateIcons.forEach(dup => dup.remove());
                        duplicateIcons = null;
                    }
                    gsap.set(animatedIconsContainer, { autoAlpha: 1, scale: 1, x: 0, y: containerMoveY });
                    
                    iconElements.forEach((icon, index) => {
                        const iconProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(index * 0.1, index * 0.1 + 0.5, 0, 1, moveProgress));
                        gsap.set(icon, { y: -containerMoveY * (1 - iconProgress) });
                    });
                    
                    gsap.set(heroSection, { backgroundColor: '#141414' });

                // Phase 2: 30% to 60%
                } else if (progress <= 0.6) {
                    const scaleProgress = (progress - 0.3) / 0.3;
                    gsap.to(heroSection, { backgroundColor: scaleProgress > 0.5 ? '#E3E3DB' : '#141414', ease: 'none', duration: 0.1 });
                    
                    const containerRect = animatedIconsContainer.getBoundingClientRect();
                    const deltaX = (window.innerWidth / 2) - (containerRect.left + containerRect.width / 2);
                    const deltaY = (window.innerHeight / 2) - (containerRect.top + containerRect.height / 2);
                    const baseY = -window.innerHeight * 0.3;

                    gsap.set(animatedIconsContainer, {
                        x: deltaX * scaleProgress,
                        y: baseY + (deltaY * scaleProgress),
                        scale: 1 + (exactScale - 1) * scaleProgress,
                    });
                    gsap.set(iconElements, { x: 0, y: 0 });

                // Phase 3: 60% to 75%
                } else if (progress <= 0.75) {
                    const moveProgress = (progress - 0.6) / 0.15;
                    
                    gsap.set(animatedIconsContainer, { autoAlpha: 0 });
                    if (!duplicateIcons) {
                        duplicateIcons = [];
                        iconElements.forEach((icon) => {
                            const duplicate = icon.cloneNode(true);
                            duplicate.classList.add('duplicate-icon');
                            Object.assign(duplicate.style, {
                                position: 'fixed', zIndex: 200,
                                width: `${headerIconSize}px`, height: `${headerIconSize}px`,
                            });
                            document.body.appendChild(duplicate);
                            duplicateIcons.push(duplicate);
                        });
                    }
                    
                    duplicateIcons.forEach((duplicate, index) => {
                        const startRect = iconElements[index].getBoundingClientRect();
                        const targetRect = placeholders[index].getBoundingClientRect();
                        const moveX = targetRect.left - startRect.left;
                        const moveY = targetRect.top - startRect.top;

                        let currentX = 0, currentY = 0;
                        if (moveProgress < 0.5) {
                            currentY = moveY * (moveProgress / 0.5);
                        } else {
                            currentY = moveY;
                            currentX = moveX * ((moveProgress - 0.5) / 0.5);
                        }
                        
                        gsap.set(duplicate, { left: startRect.left + currentX, top: startRect.top + currentY, autoAlpha: 1 });
                    });

                // Phase 4: 75% onwards
                } else {
                    if (duplicateIcons) {
                        duplicateIcons.forEach((duplicate, index) => {
                            const targetRect = placeholders[index].getBoundingClientRect();
                            gsap.set(duplicate, { left: targetRect.left, top: targetRect.top });
                        });
                    }
                    
                    textAnimationOrder.forEach((segment, index) => {
                        const segmentProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.75 + index * 0.03, 0.75 + index * 0.03 + 0.015, 0, 1, progress));
                        gsap.set(segment, { opacity: segmentProgress });
                    });
                }
            },
        });

    }, { scope: main });


  return (
    <div ref={main}>
        {/* Dummy content to allow scrolling INTO the About component */}
       

        {/* NEW: Wrapper for the component to trigger the entry animation */}
        <div ref={componentWrapperRef}>
            <section ref={heroSectionRef} className='hero overflow-hidden flex-col relative w-full h-screen flex justify-center items-center bg-[#141414] text-white'>
            
                <div ref={heroHeaderRef} className='hero-header absolute top-[55%] z-20 left-[50%] -translate-x-1/2 -translate-y-1/2 gap-2 md:gap-4 w-full flex flex-col items-center will-change-transform'>
                    <h1 className='text-6xl overflow-hidden md:text-7xl font-bold w-full text-center'>About Me</h1>
                    <p className='font-sans w-full text-lg md:text-xl text-center py-2 text-gray-300'>A "Pull Stack" Developer, who pulls code from Github.</p>
                </div>
                
                <div ref={animatedIconsRef} className='animated-icons fixed bottom-10 z-20 flex items-center will-change-transform gap-4 w-11/12 max-w-md'>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`animated-icon icon-${i} flex-1 aspect-square will-change-transform`}>
                            <img className='w-full h-full object-cover object-center scale-[1.1] rounded-lg' src={`./about/Image ${i}.avif`} alt={`Animated icon ${i}`} />
                        </div>
                    ))}
                </div>

                <h1 className='animated-text px-10 text-black text-3xl md:text-5xl relative z-10 text-center leading-snug md:leading-relaxed font-semibold'>
                    <div className='placeholder-icon w-20 h-20 md:w-16 md:h-16 inline-block align-middle invisible'></div>
                    <span className='text-segment opacity-0'> I'm Atul, a Computer Science Student driven by a passion for AI and full-stack development. </span>
                    <br/>
                    <div className='placeholder-icon w-20 h-20 md:w-16 md:h-16 inline-block align-middle invisible'></div>
                    <span className='text-segment opacity-0'> I build intelligent, user-focused solutions—from websites to </span>
                    <div className='placeholder-icon w-20 h-20 md:w-16 md:h-16 inline-block align-middle invisible'></div>
                    <span className='text-segment opacity-0'> creative AI tools—with a focus </span>
                    <div className='placeholder-icon w-20 h-20 md:w-16 md:h-16 inline-block align-middle invisible'></div>
                    <span className='text-segment opacity-0'> on real-world impact.</span>
                    <div className='placeholder-icon w-20 h-20 md:w-16 md:h-16 inline-block align-middle invisible'></div>
                </h1>
            </section>
        </div>
    </div>
  )
}

export default About;