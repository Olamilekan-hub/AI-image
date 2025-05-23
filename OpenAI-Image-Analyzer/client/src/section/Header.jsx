import { IoMenu } from "react-icons/io5";
// import {Link} from "react-router-dom"
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiGoogledocs } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { MdDataUsage } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 relative">
        <div className="absolute inset-0 backdrop-blur -z-10 md:hidden "></div>
        <div className="px-5 lg:px-12 xl:px-28 2xl:px-42">
          <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
            <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
            <div className="inline-flex justify-center items-center">
              <Link to="/">
              <img src="/images/Variant 1.png" className="h-8 w-8" alt="logo" />
              </Link>
            </div>
            <div className="hidden md:block">
              <nav className="flex gap-8 text-sm items-center">
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href="https://spectra-ai.gitbook.io/spectra-ai-docs"
                >
                  Docs
                </a>
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href="https://x.com/useSpectraAI"
                >
                  X
                </a>
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href="#contact"
                >
                  Contact Us
                </a>
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href="#features"
                >
                  Features
                </a>
              </nav>
            </div>
            <div className="flex gap-4 items-center">
              <Link to="/analyze">
                <Button>
                  Try $SAI <IoIosArrowRoundForward />
                </Button>
              </Link>
              <button  onClick={toggleMenu}>
                {isOpen ? (
                  <IoClose className="md:hidden block text-white h-6 w-6" />
                ) : (
                  <IoMenu className="md:hidden block text-white h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="absolute bg-black/90 w-full z-30">
          <div className="md:hidden block w-full">
            <nav className="w-full flex flex-col text-sm items-center my-5">

              <a href="https://spectra-ai.gitbook.io/spectra-ai-docs" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <SiGoogledocs className="text-white/70 hover:text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="https://spectra-ai.gitbook.io/spectra-ai-docs"
                  >
                    Docs
                  </a>
                </div>
                <GoArrowUpRight className="text-white/70 hover:text-white h-8 w-8" />
              </a>              
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="https://x.com/useSpectraAI" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <FaXTwitter className="text-white/70 hover:text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="https://x.com/useSpectraAI"
                  >
                    Twitter(X)
                  </a>
                </div>
                <GoArrowUpRight className="text-white/70 hover:text-white h-8 w-8" />
              </a>
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="#contact" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <GrContact className="text-white/70 hover:text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="#contact"
                  >
                    Contact Us
                  </a>
                </div>
                <GoArrowUpRight className="text-white/70 hover:text-white h-8 w-8" />
              </a>
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="#features" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <MdDataUsage className="text-white/70 hover:text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="#features"
                  >
                    Features
                  </a>
                </div>
                <GoArrowUpRight className="text-white/70 hover:text-white h-8 w-8" />
              </a>
            </nav>
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
export default Header;
