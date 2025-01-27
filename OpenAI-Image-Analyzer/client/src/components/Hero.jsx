const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black text-center">
      <h1 className="text-5xl font-bold font-popins">
        Smarter Insights, <br />
        Clear Vision <br />
        with SpectraCore
      </h1>
      <h1 className="text-5xl font-bold">
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
      <h1 className="text-5xl font-bold">
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
    </div>
  );
};
export default Hero;
