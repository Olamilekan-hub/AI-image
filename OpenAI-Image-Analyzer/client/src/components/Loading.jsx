import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
//   Simulate loading
      const timer = setTimeout(() => {
        // Animation to reveal content
        gsap.to(".loading-bg", {
          scale: 0,
          duration: 1.5,
          ease: "power4.out",
          onComplete: () => setIsLoading(false),
        });
      }, 2000); // Simulated loading time (2 seconds)

      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Loading Background */}
      {isLoading && (
        <div
          className="loading-bg fixed inset-0 bg-blue-600 flex items-center justify-center z-50"
          // style={{ transform: "scale(1)", transition: "transform 0.5s" }}
        >
          <h1 className="text-white text-4xl font-bold">
            Loading...
          </h1>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600">Welcome!</h1>
          <p className="mt-4 text-lg text-gray-300">
            This is the main content of the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
