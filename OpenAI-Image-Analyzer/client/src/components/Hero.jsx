const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black text-center gap-5">
      <h1 className="text-7xl font-bold cursor-text">
        {Array.from("Smarter Insights, Clear Vision").map(
          (char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 hover:text-blue-500 hover:font-extrabold"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )
        )}
      </h1>
      <h1 className="text-7xl font-bold cursor-text">
        {Array.from("with SpectraCore").map(
          (char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 hover:text-blue-500 hover:font-extrabold"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )
        )}
      </h1>

      <button id="try AI btn" className="text-2xl mt-5 font-semibold hover:bg-transparent hover:text-black py-2 px-4 rounded-full border-3 border-white hover:border-black text-white rounded-br-full bg-black transition duration-300 cursor-pointer">
          Try our $IRISAI<span className="r text-md align-top">&reg;</span>
        </button>

        <p id="CA" className="text-gray-700 font-semibold text-lg">
          Try $IRISAI<span className="r text-sm align-top">&reg;</span> CA: CyQr3CGBDd4gTncX4qSRMB4wQqQyRLY5iDgKHjhXpump
        </p>

        <h1 id="bottom" className="fixed bottom-0 left-0 text-3xl font-semibold hover:bg-white hover:text-black py-1 px-3 rounded-r-full border-2 border-white text-white rounded-bl-full bg-black transition duration-300 cursor-pointer">
          SpectraCore<span className="r text-lg align-top">&reg;</span>
        </h1>
    </div>
  );
};
export default Hero;
