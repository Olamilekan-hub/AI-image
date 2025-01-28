import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div id="home" className="hero-container">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source
            src="/videos/technology-digital-or-information-data-concept-free-video-vmake.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col items-center justify-center h-full text-gray-200 text-center gap-3 md:gap-5 lg:gap-7 px-5 z-20 hero-conten">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold cursor-text cf">
            {Array.from("Smarter Insights, Clear Vision").map((char, index) => (
              <span
                key={index}
                className="cf inline-block transition-all duration-300 hover:text-gray-200 hover:font-extrabold hover:text-3xl hover:sm:text-5xl hover:md:text-7xl hover:lg:text-10xl hover:bg-gray-900 hover:rounded-lg hover:pb-3 hover:px-2"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold cursor-text cf">
            {Array.from("with SpectraAI").map((char, index) => (
              <span
                key={index}
                className="cf inline-block transition-all duration-300 hover:text-gray-200 hover:font-extrabold hover:text-3xl hover:sm:text-5xl hover:md:text-7xl hover:lg:text-10xl hover:bg-gray-900 hover:rounded-lg hover:pb-3 hover:px-2"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <button
            id="try AI btn"
            className="text-lg md:text-2xl mt-3 md:mt-5 font-semibold hover:text-gray-900 py-1 md:py-2 px-2 md:px-4 rounded-full border-1 md:border-3 border-white hover:bg-gray-200 hover:border-gray-900 text-white rounded-br-full bg-gray-900 transition duration-300 cursor-pointer"
          >
            <Link to="/Analyze">
              Try $SAI<span className="r text-md align-top">&reg;</span>
            </Link>
          </button>

          <div className="relative overflow-hidden max-w-[50%] bg-gray-200 rounded-4xl hidden lg:flex">
            <p
              id="CA"
              className="text-gray-900 font-semibold text-sm sm:text-md md:text-lg whitespace-nowrap animate-scroll px-3 py-1"
              style={{
                display: "inline-block",
              }}
            >
              Try $SAI<span className="r text-sm align-top">&reg;</span> CA:
              CA_NEEDED CA_NEEDED CA_NEEDED CA_NEEDED CA_NEEDED CA_NEEDED
              CA_NEEDED CA_NEEDED CA_NEEDED
            </p>
          </div>

          <p
            id="CA"
            className="text-gray-900 font-semibold text-sm sm:text-md md:text-lg bg-gray-200 p-1 rounded-4xl overflow-hidden max-w-[35%] whitespace-nowrap overflow-x-auto lg:hidden"
            style={{
              WebkitOverflowScrolling: "touch", // For smooth scrolling on mobile
            }}
          >
            Try $SAI<span className="r text-sm align-top">&reg;</span> CA:
            CA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDEDCA_NEEDED
          </p>

          <h1
            id="bottom"
            className="fixed bottom-0 left-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold hover:bg-white hover:text-gray-900 py-1 px-2 md:px-3 rounded-r-full border-1 md:border-2 border-white text-white rounded-bl-full bg-gray-900 transition duration-300 cursor-pointer"
          >
            <a href="#home">
              SpectraAI
              <span className="r text-sm md:text-lg align-top">&reg;</span>
            </a>
          </h1>
        </div>
      </div>
    </>
  );
};
export default Hero;
