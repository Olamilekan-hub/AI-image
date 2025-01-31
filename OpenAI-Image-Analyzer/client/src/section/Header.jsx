import { IoMenu } from "react-icons/io5";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 ">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden "></div>
          <div className="container">
                    <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
                    <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
                              <div className="inline-flex justify-center items-center">
                                        <img src="/images/Variant 1.png" className="h-8 w-8" alt="logo" />
                              </div>
                              <div className="hidden md:block">
                                        <nav className="flex gap-8 text-sm items-center">
                                                  <a className="text-white/70 hover:text-white transition duration-300" href="">Docs</a>
                                                  <a className="text-white/70 hover:text-white transition duration-300" href="">Github</a>
                                                  <a className="text-white/70 hover:text-white transition duration-300" href="">Contact Us</a>
                                                  <a className="text-white/70 hover:text-white transition duration-300" href="#features">Features</a>
                                        </nav>
                              </div>
                              <div className="flex gap-4 items-center">
                                        <Button>
                                            <Link to="/">Try $AI </Link><IoIosArrowRoundForward />
                                        </Button>
                                        <IoMenu className="md:hidden block text-white h-8 w-8" />
                              </div>
                    </div>
          </div>
    </header>
  )
}
export default Header