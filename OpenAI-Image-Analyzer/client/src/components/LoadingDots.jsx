import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingDots = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    // Animate the dots
    gsap.to(dotsRef.current, {
      x: -15, // Move the dots up
      repeat: -1,
      yoyo: true,
      stagger: 0.2, // Each dot animates in sequence
      ease: "power1.inOut",
      duration: 0.5,
    });
  }, []);

  return (
    <div className="flex justify-center items-center space-x-1 text-6xl font-lobster">
      <span
        className="inline-block text-white font-bold text-6xl font-lobster"
        ref={(el) => (dotsRef.current[0] = el)}
      >
        .
      </span>
      <span
        className="inline-block text-white font-bold text-6xl font-lobster"
        ref={(el) => (dotsRef.current[1] = el)}
      >
        .
      </span>
      <span
        className="inline-block text-white font-bold text-6xl font-lobster"
        ref={(el) => (dotsRef.current[2] = el)}
      >
        .
      </span>
    </div>
  );
};

export default LoadingDots;
