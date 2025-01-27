import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[60%] bg-black text-white p-1 shadow-md z-45 rounded-full mt-5 font-poppins">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold hover:bg-white hover:text-black py-1 px-3 rounded-l-full border-2 border-white text-white rounded-br-full bg-black transition duration-300">
          SpectraCore<span className="r text-lg align-top">&reg;</span>
        </h1>

        <ul className="border-1 py-2 px-3 rounded-full shadow-md space-x-2 flex ">
          <li className="border-r-1 pr-2 border-white ">
            <a href="#about">Docs</a>
          </li>
          <li className="border-r-1 pr-2 border-white ">
            <a href="#about">Github</a>
          </li>
          <li className="border-r-1 pr-2 border-white ">
            <a href="#about"><FaXTwitter /></a>
          </li>
        </ul>

        <button className="hover:bg-white py-2 px-3 rounded-full shadow-md hover:text-black font-semibold  border-white border-2 bg-black text-white transition duration-300">
          <Link to="/Analyze">Try $IRISAI</Link>
        </button>
      </div>
    </header>
  );
};
export default Header;
