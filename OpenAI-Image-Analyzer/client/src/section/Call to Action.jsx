import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Action = () => {
  return (
    <section className="py-20 md:py-24">
      <div className='px-5 lg:px-12 xl:px-28 2xl:px-42'>
                    <div className="border border-white/15 py-24  overflow-hidden rounded-xl relative" style={{ backgroundImage: "url('/images/stars.png')" }}>
                              <div className="absolute inset-0 bggr4 bg-blend-overlay"
                              style={{ 
                                        maskImage: 'radial-gradient(50% 50% at 50% 35%, black, transparent)',
                                        backgroundImage: "url('/images/grid-lines.png')" 
                                        }}></div>
                              <div className="relative">
                                        <h2 className="text-5xl md:text-6xl max-w-md mx-auto tracking-tighter tect center font-medium text-center">AI Image Analysis for everyone.</h2>
                                        <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">Get Weekly updates about SpectraAI.</p>
                                        <div className="flex justify-center mt-5">
                                                  <Button>
                                                            <Link to="/">Subscribe</Link><IoIosArrowRoundForward />
                                                  </Button>
                                        </div>
                              </div>
                    </div>
          </div>
    </section>
  );
};
export default Action;
