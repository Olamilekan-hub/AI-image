import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import useLoadingAnimation from "../utils/useLoadingAnimation";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLoadingAnimation(setIsLoading);

  return (
    <>
      {/* Loading Background */}
      {isLoading && (
        <div
          id="loading-bg"
          className="loading-bg fixed inset-0 bg-blue-600 flex items-center justify-center z-50"
          // style={{ transition: "transform 1.5s" }}
        >
          <h1 className="text-white text-6xl font-bold flex font-lobster">
            {/* Loading */}
            <LoadingDots />
          </h1>
        </div>
      )}
    </>
  );
};
export default LoadingPage;
