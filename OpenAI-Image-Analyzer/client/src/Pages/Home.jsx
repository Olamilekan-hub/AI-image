import { useState } from "react";
// import { gsap } from "gsap";
import LoadingDots from "../components/Loading";
import useLoadingAnimation from "../utils/useLoadingAnimation";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLoadingAnimation(setIsLoading);

  return (
    <>
      {/* Loading Background */}
      {isLoading && (
        <div
          id="loading-bg"
          className="loading-bg fixed inset-0 bg-blue-600 flex items-center justify-center z-50"
          // style={{ transform: "scale(1)", transition: "transform 0.5s" }}
        >
          <h1 className="text-white text-4xl font-bold flex font-lobster">
            Loading
            <LoadingDots />
          </h1>
        </div>
      )}

      {/* Main Content */}
      {/* {!isLoading && ( */}
      <div className="min-h-screen flex items-center justify-center bg-black relative">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 font-lobster">
            Welcome!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            This is the main content of the page.
          </p>
        </div>

        {/* )} */}
      </div>
    </>
  );
};

export default Home;
