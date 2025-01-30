import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      {/* <video className="hero-video" autoPlay loop muted playsInline>
          <source
            src="/videos/technology-digital-or-information-data-concept-free-video-vmake.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video> */}

      {/* <img src="/images/Hero.png" className="hero-video" />
        <img
          src="/images/Particles .png"
          className="hero-video absolute w-full h-auto z-1 top-0 left-0"
        />
        <img
          src="/images/Circles.png"
          className="hero-video absolute w-full h-full -z-30 top-0 left-0"
        />

        <img
          src="/images/Gradient Bottom.png"
          alt=""
          className="absolute w-full h-auto  z-9 bottom-0 left-0"
        /> */}

      <div id="home" className="w-full h-[100vh] overflow-hidden relative">
        <div className="absolute bottom-10 left-[47%]">
          <div className="border-[0.0001px] border-white rounded-xl p-[7px]">
            <button
              id="try AI btn"
              className="text-lg md:text-2xl font-medium py-1 md:py-2 px-2 md:px-5 rounded-xl  hover:bg-gray-100 text-black bg-white transition duration-300 cursor-pointer"
            >
              <Link to="/Analyze">
                Try $SAI<span className="r text-sm align-top">&reg;</span>
              </Link>
            </button>
          </div>

        </div>

        <img
          src="/images/Hero1.png"
          className="absolute -z-50 w-full -top-10"
        />
        <div className="flex flex-col items-center justify-center h-full text-gray-200 text-center gap-3 md:gap-5 lg:gap-7 px-5 z-20 hero-conten">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold cursor-text cf leading-[8rem]">
            Smarter Insights, Clear Vision <br />{" "}
            <span className="gradient-text"> with SpectraAI</span>
          </h1>
          {/*         
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
          </h1> */}

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
        </div>
      </div>
    </>
  );
};
export default Hero;
