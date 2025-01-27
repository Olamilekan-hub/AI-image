import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-black text-white p-1 shadow-md z-47 rounded-full mt-4 md:mt-7 font-poppins">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold hover:bg-white hover:text-black py-1 px-2 md:px-3 rounded-l-full border-1 md:border-2 border-white text-white rounded-br-full bg-black transition duration-300 cursor-pointer">
          SpectraCore<span className="r text-sm align-top">&reg;</span>
        </h1>

        <ul className="border-b-[0.5px] md:border-b-1 py-2 px-2 md:px-7 rounded-full shadow-md space-x-2 md:space-x-7 lg:flex justify-center items-center hidden">
          <li className="border-r-1 text-sm md:text-md pr-2 md:pr-7 border-white">
            <a href="#about">Docs</a>
          </li>
          <li className="border-r-1 text-sm md:text-md pr-2 md:pr-7 border-white">
            <a href="#about">Github</a>
          </li>
          <li className="border-r-1 text-sm md:text-md pr-2 md:pr-7 border-white">
            <a href="#contact">Contact Us</a>
          </li>
          <li className="">
            <a href="https://x.com/">
              <FaXTwitter />
            </a>
          </li>
        </ul>

        <button className="hover:bg-white md:text-sm py-1 md:py-2 px-1.5 md:px-3 rounded-full shadow-md hover:text-black font-semibold  border-white border-1 md:border-2 bg-black text-white transition duration-300">
          <Link to="/Analyze">
            Try $IRISAI
            <span className="r text-[12px] md:text-sm align-top">&reg;</span>
          </Link>
        </button>
      </div>
    </header>
  );
};
export default Header;
