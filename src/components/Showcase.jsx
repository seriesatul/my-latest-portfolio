
import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'

const Showcase = () => {

    let [showContent,setShowContent] = useState(false);

useGSAP ( () =>{
  const tl = gsap.timeline();

  tl.to('.vi-mask-group', {
    duration: 2,
    ease: 'Power4.easeInOut',
    transformOrigin: '50% 50%',
  }).to('.vi-mask-group', {
    scale: 10,
    duration: 3.5,
    delay: -1.8,
    ease: 'Expo.easeInOut',
    transformOrigin: '50% 50%',
    opacity: 0,
    onUpdate: function () {
      if (this.progress() >= 0.9) {
        document.querySelector('.svg').remove();
        setShowContent(true);
        this.kill();
      }
    },
  });

})

useGSAP(() => {
  


  if (!showContent) return; // <-- Prevents animation crash

  // gsap.fromTo('.main', {
  //   rotate: -10,
  //   color: "black"
  // }, {
  //   color: "black",
  //   scale: 1,
  //   rotate: 0,
  //   duration: 2,
  //   delay: '-1',
  //   ease: 'Expo.easeInOut',
  // });

  gsap.fromTo('.sky', {
    rotate: -10,
    
  }, {
    scale: 1.1,
    rotate: 0,
   
    duration: 2,
    delay: '-.8',
    ease: 'Expo.easeInOut',
  });

  gsap.fromTo('.bg', {
    rotate: -10,
    
  }, {
    scale: 1.1,
    rotate: 0,
    duration: 2,
    delay: '-.8',
    ease: 'Expo.easeInOut',
  });

 
  gsap.fromTo('.character', {
    scale: 0.8,
    x: '-50%',
    bottom: '-100%',
    rotate: -20,
  }, {
    scale: 0.5,
    x: '-50%',
    bottom: '-80%',
    rotate: 0,
    duration: 2,
    delay: '-.8',
    ease: 'Expo.easeInOut',
  });


  const main = document.querySelector('.main');
  const text = document.querySelector('.main .text');

  if (!main || !text) return; // <-- Prevents animation crash

  main.addEventListener('mousemove', function (e) {
    const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

    gsap.to(text, {
      x: `${xMove}%`,
    });

    gsap.to(".sky",{
      x: xMove
    })

    gsap.to(".bg",{
      x: xMove
    })




  });
}, [showContent]);



  return (
    <div>
        <>
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="150"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="pricedown"
                >
                  Projects
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./Screenshot 2025-07-01 193711.png"
            width="100%"
            height="80%"
            objectPosition="center"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {
        showContent && <div className='main overflow-hidden bg-black w-full'>
          <div className='landing overflow-hidden relative w-full h-screen bg-black'>
            <div className='navbar absolute top-0 left-0 w-full py-10 px-10 z-[10]'>
              <div className='logo flex gap-4'>
                <div className='text-white gap-1 flex flex-col lines'>
                  <div className='line bg-zinc-50 h-1 w-5'></div>
                  <div className='line bg-zinc-50 h-1 w-8'></div>
                  <div className='line bg-zinc-50 h-1 w-5'></div>
                </div>
                <h3 className=' text-3xl -mt-2 text-white'>Portfolio</h3>
              </div>
            </div>
           
            <div className='imagesdiv relative overflow-hidden w-full h-screen'>
              <img  className='w-full scale-[1.1] sky absolute h-full object-cover' src="./sky.png" alt="" />
              <img className='w-full scale-[1.1] bg absolute h-full object-cover' src="./bg.png" alt="" />
               <div className='text text-white top-5 left-1/2 -translate-x-1/2 absolute'>
              <h1 className='absolute mt-[40vh] text-[40vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>Projects</h1>
              

            </div>
              <img className='left-1/2 character absolute -bottom-[80%] overflow-hidden -translate-x-1/2 scale-[0.5]' src="./20250609_1756_Stylized Selfie Character_remix_01jxaacr6be7xvddsc4v7yy3d5 (1).png"alt="" />
            </div>
            <div className='text-white bottombar flex gap-4 absolute w-full h-20 items-center bottom-0 bg-gradient-to-t from-black to-transparent'>
              <i className=" ml-2 p-2 border-white text-2xl rounded-full ri-arrow-down-circle-line"></i>
              <h3 className='text-2xl font-sans'>Scroll Down</h3>
            </div>
          </div>

          

        </div>
      }
   </>
    </div>
  )
}

export default Showcase;