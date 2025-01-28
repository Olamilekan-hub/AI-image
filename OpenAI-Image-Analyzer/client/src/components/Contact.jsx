const Contact = () => {
  return (
    <div>
      <footer className="w-full h-screen bg-[#4728E7] text-gray-100 pb-16 pt-8 px-6">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
            <form className="w-full flex-1  space-y-6">
              <h6 className="text-lg font-medium mb-6">Contact us</h6>
              <div className="space-y-4">
                <label className="block">
                  {/* < className="block text-sm opacity-70 mb-2">Twitter Handle and/or Telegram Username</> */}
                  <input
                    type="text"
                    className="w-full p-3 bg-black/5 border border-gray-700/10 rounded focus:outline-none focus:border-gray-500 transition-colors"
                    placeholder=""
                  />
                </label>
                <label className="block">
                  <span className="block text-sm opacity-70 mb-2">Message</span>
                  <textarea
                    className="w-full p-3 bg-black/5 border border-gray-700/10 rounded focus:outline-none focus:border-gray-500 transition-colors min-h-[120px] text[#fff]"
                    placeholder="Hello!"
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="px-10 py-3 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors font-medium"
                >
                  Submit
                </button>
                <div className="flex-1 gap-4 text-sm">
                  <span className="font-medium pr-2">21:31</span>
                  <span className="font-medium opacity-70">01/27/2025</span>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center">
            <h1 className="text-[30px] lg:text-[280px] font-[500]">
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                N
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                e
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                u
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                r
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                o
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                S
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                t
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                a
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                c
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                k
              </span>
              <span className="inline-block transition-all duration-300 ease-in-out hover:font-[900]">
                ®
              </span>
            </h1>
          </div>
          {/* </form>
          </div> */}
        </div>
      </footer>
    </div>
  );
};
export default Contact;
