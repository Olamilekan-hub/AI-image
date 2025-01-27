import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-900 text-center gap-2 md:gap-5 px-5">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold cursor-text">
        {Array.from("Smarter Insights, Clear Vision").map(
          (char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 hover:text-gray-200 hover:font-extrabold hover:text-3xl hover:sm:text-5xl hover:md:text-7xl hover:lg:text-10xl hover:bg-gray-900 hover:rounded-lg hover:pb-3 hover:px-2"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )
        )}
      </h1>
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold cursor-text">
        {Array.from("with SpectraCore").map(
          (char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 hover:text-gray-200 hover:font-extrabold hover:text-3xl hover:sm:text-5xl hover:md:text-7xl hover:lg:text-10xl hover:bg-gray-900 hover:rounded-lg hover:pb-3 hover:px-2"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )
        )}
      </h1>

      <button id="try AI btn" className="text-lg md:text-2xl mt-3 md:mt-5 font-semibold hover:bg-transparent hover:text-gray-900 py-1 md:py-2 px-2 md:px-4 rounded-full border-1 md:border-3 border-white hover:border-gray-900 text-white rounded-br-full bg-gray-900 transition duration-300 cursor-pointer">
        <Link to="/Analyze">
          Try our $IRISAI<span className="r text-md align-top">&reg;</span>
          </Link>
        </button>

        <p id="CA" className="text-gray-700 font-semibold text-sm sm:text-md md:text-lg">
          Try $IRISAI<span className="r text-sm align-top">&reg;</span> CA: CyQr3CGBDd4gTncX4qSRMB4wQqQyRLY5iDgKHjhXpump
        </p>

        <h1 id="bottom" className="fixed bottom-0 left-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold hover:bg-white hover:text-gray-900 py-1 px-2 md:px-3 rounded-r-full border-1 md:border-2 border-white text-white rounded-bl-full bg-gray-900 transition duration-300 cursor-pointer">
          SpectraCore<span className="r text-sm md:text-lg align-top">&reg;</span>
        </h1>
    </div>
  );
};
export default Hero;
