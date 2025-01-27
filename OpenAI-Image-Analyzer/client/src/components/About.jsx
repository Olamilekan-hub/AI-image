const About = () => {
  return (
    <div className="font-bold bg-gray-900 py-8 px-14 text-white">
      <h2 className="text-[32px]">SpectraCore Simplifies Image Analysis</h2>
      <h3 className="text-[26px] mt-2  ml-30 w-[50%] text-justify">
        SpectraCore seamlessly equips image analysis tools with advanced vision
        capabilities, uniting deep learning modules and multi-language
        support—from Python to Rust, Go, TypeScript, and Next.js. Build, train,
        and deploy image-driven solutions faster than ever before. Create
        smarter workflows, connect advanced APIs, and empower your systems to
        truly understand visuals.
      </h3>

      <div className="flex justify-between px-24 items-top mt-12">
        <h3 className="text-[30px]">Let’s empower AI agents to see<span className="r text-md align-top">&reg;</span></h3>

        <div className="flex flex-col items-center">
          <h3 className="text-[32px] text-gray-400">Tool Development</h3>
          <h3 className="text-[32px] text-gray-400">AI Workflows</h3>
          <h3 className="text-[32px] text-gray-400">API Integrations</h3>

          <button
            id="try AI btn"
            className="text-lg md:text-3xl mt-3 md:mt-5 font-semibold hover:bg-transparent hover:text-gray-100 py-1 md:py-3 px-2 md:px-6 rounded-full border-1 md:border-3 hover:border-white hover:border-gray-900 text-gray-900 rounded-br-full bg-gray-100 transition duration-300 cursor-pointer"
          >
            Try our $IRISAI
          </button>
        </div>
      </div>
    </div>
  );
};
export default About;
