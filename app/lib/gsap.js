// lib/gsap.js

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// This is the crucial part: register the plugin IMMEDIATELY
gsap.registerPlugin(ScrollTrigger, useGSAP);

// You can export the modules again to have a single entry point
export * from "gsap";
export * from "gsap/ScrollTrigger";
export * from "@gsap/react";