import { useEffect } from "react";
import { gsap } from "gsap";

const useLoadingAnimation = (setIsLoading) => {
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Animation to reveal content
      gsap.to(".loading-bg", {
        scale: 0,
        duration: 1.5,
        ease: "power4.in",
        onComplete: () => setIsLoading(false), // Hide loading after animation
      });
    }, 2000); // Simulated loading time (4 seconds)

    return () => clearTimeout(timer);
  }, [setIsLoading]); // Depend on setIsLoading to avoid unnecessary rerenders

};

export default useLoadingAnimation;
