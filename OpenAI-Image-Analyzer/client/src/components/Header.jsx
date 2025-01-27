

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[70%] bg-blue-700 text-white p-3 shadow-md z-45 rounded-full mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">$IRISAI</h1>
        <ul>
          <li><a href="#about">about</a></li>
        </ul>
      <button className="bg-white py-2 px-3 rounded-full shadow-md text-black font-semibold hover:bg-black hover:text-white transition duration-300">
          Try $IRISAI
      </button>
      </div>
    </header>
  );
};
export default Header;
