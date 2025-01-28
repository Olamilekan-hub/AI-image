// import { Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-8">
      <ul
        id="links"
        className="border-b-[0.5px] md:border-b-1 mb-5 py-2 px-2 md:px-7 rounded-full shadow-xs shadow-gray-200 space-x-4 md:space-x-9 flex justify-center items-center w-2/3 lg:w-3/5 xl:w-2/5 mx-auto"
      >
        <li className="border-r-1 text-md md:text-lg pr-4 md:pr-9 border-white">
          <a href="#about">Docs</a>
        </li>
        <li className="border-r-1 text-md md:text-lg pr-4 md:pr-9 border-white">
          <a href="#about">Github</a>
        </li>
        <li className="border-r-1 text-md md:text-lg pr-4 md:pr-9 border-white">
          <a href="#contact">Contact Us</a>
        </li>
        <li className="text-md md:text-lg">
          <a href="https://x.com/">
            <FaXTwitter />
          </a>
        </li>
      </ul>

      <div className="flex justify-between items-center px-24">
        <h1 className="text-lg md:text-2xl font-semibold hover:bg-white hover:text-gray-900 py-1 px-2 md:px-3 rounded-l-full border-1 md:border-2 border-white text-white rounded-br-full bg-gray-900 transition duration-300 cursor-pointer">
          SpectraAI<span className="r text-sm align-top">&reg;</span>
        </h1>

        <h1 className="text-lg md:text-2xl font-semibold hover:bg-white hover:text-gray-900 py-1 px-2 md:px-3 rounded-bl-full border-1 md:border-2 border-white text-white rounded-r-full bg-gray-900 transition duration-300 cursor-pointer">
          <a href="#home">Back to top</a>
        </h1>
      </div>

      <hr className="w-full lg:w-4/5 mx-auto border-1 border-gray-700 mt-5" />
      <hr className="w-full lg:w-2/5 mx-auto mt-5" style={{
      border: 'none', 
      height: '1px', 
      background: 'linear-gradient(to right, rgba(51, 51, 51, 0) 0%, #333 50%, rgba(51, 51, 51, 0) 100%)'
    }}  />


      <div>
        <p className="text-center text-gray-500 mt-5 pb-10">
          <span className="text-blue-900">&copy;</span> {currentYear} SpectraAI.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
