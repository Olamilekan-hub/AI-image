import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import stars from "/images/stars.png";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, useMotionTemplate, useMotionValue } from "framer-motion";

const useRelativeMousePosition = (to) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const  updateMousePosition = (event) => {
    if (!to.current) return;
    const {top, left} = to.current.getBoundingClientRect();
    mouseX.set(event.x - left)
    mouseY.set(event.y - top)
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    }
  });

  return [mouseX, mouseY];
};

const Action = () => {
  const sectionRef = useRef(null);
  const borderDivRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderDivRef);

  const maskImage = useMotionTemplate `radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section className="py-20 md:py-24" ref={sectionRef}>
      <div className='px-5 lg:px-12 xl:px-28 2xl:px-42'>
                    <motion.div className="border border-white/15 py-24  overflow-hidden rounded-xl relative animate-background2 group" 
                    ref={borderDivRef}
                    style={{ 
                      backgroundImage: `url(${stars})`,
                      backgroundPositionY,
                      }}
                      >
                      <div 
                      className="absolute inset-0 bggr4 bg-blend-overlay group-hover:opacity-0 transition duration-700"
                      style={{ 
                                maskImage: 'radial-gradient(50% 50% at 50% 35%, black, transparent)',
                                backgroundImage: "url('/images/grid-lines.png')"
                      }}></div>
                      <motion.div 
                      className="absolute inset-0 bggr4 bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
                      style={{ 
                                maskImage,
                                backgroundImage: "url('/images/grid-lines.png')"
                      }}></motion.div>
                              <div className="relative lg:py-18">
                                        <h2 className="text-5xl md:text-6xl  mx-auto tracking-tighter tect center font-medium text-center">AI Image Analysis for everyone.</h2>
                                        <p className="text-center text-lg md:text-xl max-w-sm mx-auto text-white/70 px-4 mt-5 tracking-tight">Get Weekly updates about SpectraAI.</p>
                                        <div className="flex justify-center mt-5">
                                                  <Button>
                                                            <Link to="/">Subscribe</Link><IoIosArrowRoundForward />
                                                  </Button>
                                        </div>
                              </div>
                    </motion.div>
          </div>
    </section>
  );
};
export default Action;
