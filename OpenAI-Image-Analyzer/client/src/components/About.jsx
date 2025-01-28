import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="font-bold bg-gray-200 py-8 px-14 text-gray-900">
      <div className="bg-gray-900 text-gray-100 p-10 rounded-3xl mt-12">
        <h1 className="text-5xl text-center cf">
          SpectraAI Simplifies Image Analysis
        </h1>
        <p className="text-xl text-center cf my-5 bg-gray-100 text-gray-900 rounded-xl p-1 w-auto">
          Tool Development • AI Workflows • API Integrations
          <button className="ml-[3rem] md:text-sm py-1 md:py-2 px-1.5 md:px-3 rounded-full shadow-sm shadow-gray-900 font-semibold  border-gray-900 border-1 md:border-2 bg-gray-100 text-gray-900 transition duration-300">
            <Link to="/Analyze">
              Try $SAI
              <span className="r text-[12px] md:text-xs align-top">&reg;</span>
            </Link>
          </button>
        </p>

        <div className="flex flex-col lg:flex-row justify-between mt-12 lg:mt-16 mb-8 px-5 md:px-14 xl:px-24 gap-5">
          {/* Card_1 */}
          <div className="bg-gray-900 border-4 border-gray-100 border-double hover:bg-gray-100 active:bg-gray-100 text-gray-100 active:text-gray-900 hover:text-gray-900 p-5 rounded-3xl w-full lg:w-[30%] transition-transform duration-300 ease-linear hover:-translate-y-15 active:-translate-y-15 shadow-md shadow-gray-100 active:inset-shadow-sm hover:inset-shadow-sm active:inset-shadow-gray-900 hover:inset-shadow-gray-900 active:border-none hover:border-none">
            <h4 className="text-md lg:text-xl xl:text-2xl text-center my-3 text-gray-900 hover:text-gray-100 bg-gray-100 hover:bg-gray-900 rounded-lg xl:rounded-xl p-1">
              Advanced Vision and Image Analysis.
            </h4>
            <p className="text-md xl:text-xl py-2  text-left font-normal">
              Develop powerful image-driven solutions that streamline workflows
              and connect seamlessly with advanced APIs. With SpectraAI, create
              smarter tools that analyze images with precision, enabling more
              insightful and impactful solutions.
            </p>
          </div>

          {/* Card_2 */}
          <div className="bg-gray-900 border-4 border-gray-100 border-double hover:bg-gray-100 text-gray-100 hover:text-gray-900 p-5 rounded-3xl w-full lg:w-[30%] transition-transform duration-300 ease-linear hover:-translate-y-15 active:-translate-y-15 shadow-md shadow-gray-100 hover:inset-shadow-sm hover:inset-shadow-gray-900 hover:border-none">
            <h4 className="text-md lg:text-xl xl:text-2xl text-center my-3 text-gray-900 hover:text-gray-100 bg-gray-100 hover:bg-gray-900 rounded-lg xl:rounded-xl p-1">
              Advanced Vision and Image Analysis.
            </h4>
            <p className="text-md xl:text-xl py-5  text-left font-normal">
              Develop powerful image-driven solutions that streamline workflows
              and connect seamlessly with advanced APIs. With SpectraAI, create
              smarter tools that analyze images with precision, enabling more
              insightful and impactful solutions.
            </p>
          </div>

          {/* Card_3 */}
          <div className="bg-gray-900 border-4 border-gray-100 border-double hover:bg-gray-100 text-gray-100 hover:text-gray-900 p-5 rounded-3xl w-full lg:w-[30%] transition-transform duration-300 ease-linear hover:-translate-y-15 active:-translate-y-15 shadow-md shadow-gray-100 hover:inset-shadow-sm hover:inset-shadow-gray-900 hover:border-none">
            <h4 className="text-md lg:text-xl xl:text-2xl text-center my-3 text-gray-900 hover:text-gray-100 bg-gray-100 hover:bg-gray-900 rounded-lg xl:rounded-xl p-1">
              Advanced Vision and Image Analysis.
            </h4>
            <p className="text-md xl:text-xl py-5  text-left font-normal">
              Develop powerful image-driven solutions that streamline workflows
              and connect seamlessly with advanced APIs. With SpectraAI, create
              smarter tools that analyze images with precision, enabling more
              insightful and impactful solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;

{
  /* <h2 className="text-[32px]">SpectraAI Simplifies Image Analysis</h2>
      <h3 className="text-[26px] mt-2  ml-30 w-[50%] text-justify">
        SpectraAI seamlessly equips image analysis tools with advanced vision
        capabilities, uniting deep learning modules and multi-language
        support—from Python to Rust, Go, TypeScript, and Next.js. Build, train,
        and deploy image-driven solutions faster than ever before. Create
        smarter workflows, connect advanced APIs, and empower your systems to
        truly understand visuals.
      </h3>

      <div className="flex justify-between px-24 items-top mt-12">
        <h3 className="text-[30px]">
          Let’s empower AI agents to see
          <span className="r text-md align-top">&reg;</span>
        </h3>

        <div className="flex flex-col items-center">
          <h3 className="text-[32px] text-gray-400">Tool Development</h3>
          <h3 className="text-[32px] text-gray-400">AI Workflows</h3>
          <h3 className="text-[32px] text-gray-400">API Integrations</h3>

          <button
            id="try AI btn"
            className="text-lg md:text-3xl mt-3 md:mt-5 font-semibold hover:bg-transparent hover:text-gray-100 py-1 md:py-3 px-2 md:px-6 rounded-full border-1 md:border-3 hover:border-white hover:border-gray-900 text-gray-900 rounded-br-full bg-gray-100 transition duration-300 cursor-pointer"
          >
            Try $SAI
          </button>
        </div>
      </div> */
}
