import { IoMenu } from "react-icons/io5";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiGoogledocs } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
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
    <header>
      <div className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 relative">
        <div className="absolute inset-0 backdrop-blur -z-10 md:hidden "></div>
        <div className="px-5 lg:px-12 xl:px-28 2xl:px-42">
          <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
            <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
            <div className="inline-flex justify-center items-center">
              <img src="/images/Variant 1.png" className="h-8 w-8" alt="logo" />
            </div>
            <div className="hidden md:block">
              <nav className="flex gap-8 text-sm items-center">
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href=""
                >
                  Docs
                </a>
                <a
                  className="text-white/70 hover:text-white transition duration-300"
                  href=""
                >
                  Github
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

              <a href="" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <SiGoogledocs className="text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href=""
                  >
                    Docs
                  </a>
                </div>
                <GoArrowUpRight className="text-white h-8 w-8" />
              </a>              
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="https://github.com/" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <FaGithub className="text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href=""
                  >
                    Github
                  </a>
                </div>
                <GoArrowUpRight className="text-white h-8 w-8" />
              </a>
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="#contact" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <GrContact className="text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="#contact"
                  >
                    Contact Us
                  </a>
                </div>
                <GoArrowUpRight className="text-white h-8 w-8" />
              </a>
              <hr className="w-full m-0 p-0 text-white/80" />

              <a href="#features" onClick={toggleMenu} className="flex justify-between w-full px-5 py-2 items-center">
                <div className="flex gap-2">
                  <MdDataUsage className="text-white h-5 w-5" />
                  <a
                    className="text-white/70 hover:text-white transition duration-300"
                    href="#features"
                  >
                    Features
                  </a>
                </div>
                <GoArrowUpRight className="text-white h-8 w-8" />
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
