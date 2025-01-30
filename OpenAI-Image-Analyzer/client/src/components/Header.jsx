import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[40%] bg-black text-white p-2 z-100 rounded-xl mt-4 md:mt-7 font-poppins border border-dotted border-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1 md:space-x-2">
          <img src="/images/Variant 1.png" alt="logo" className="w-[50%] lg:w-[70%] xl:w-auto" />
          <h1 className="text-lg md:text-xl font-semibold text-white gradient-text transition duration-300 cursor-pointer">
            <a href="#home">
              SpectraAI<span className="r text-sm align-top">&reg;</span>
            </a>
          </h1>
        </div>

        <ul
          id="links"
          className="space-x-2 md:space-x-5 lg:flex justify-center items-center hidden text-gray-200"
        >
          <li className="text-sm md:text-md">
            <a href="#about">Docs</a>
          </li>
          <li className="text-sm md:text-md">
            <a href="#about">Github</a>
          </li>
          <li className="text-sm md:text-md">
            <a href="#contact">Contact Us</a>
          </li>
          <li className="">
            <a href="https://x.com/">
              <FaXTwitter />
            </a>
          </li>
        </ul>

        <button className="hover:bg-[#9856FF] md:text-md py-1 md:py-2 px-1.5 md:px-3 rounded-xl hover:text-[gray-200] font-semibold  border-white border-dotted  bg-[#6c009a] inset-shadow-sm inset-shadow-white text-white transition duration-300">
          <Link to="/Analyze">
            Try $SAI
            {/* <span className="r text-[12px] md:text-sm align-top">&reg;</span> */}
          </Link>
        </button>
      </div>
    </header>
  );
};
export default Header;
