import Button from "../components/Button";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion, useScroll, useTransform } from "framer-motion";
import stars from "/images/stars.png";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  // useMotionValueEvent(ScrollYProgress, "change", (value) => {
  //   console.log('scrollYProgress', value)
  // })

  return (
    <motion.section
      ref={sectionRef}
      className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative   bggr3"
      style={{
        backgroundImage: `url(${stars})`,
        backgroundPositionY,
      }}
      animate={{
        backgroundPositionX: "100%",
      }}
      transition={{
        reapeat: Infinity,
        ease: "linear",
        duration: 120,
      }}
    >
      <div className="absolute inset-0 bggr2"></div>

      {/* Start Planet */}
      <div
        id="Shadows"
        className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bggr1 shadow-[-20px -20px 50px rgb(255, 255, 255, .5)]"
      ></div>
      <motion.div
        style={
          {
            // translateY: '-50%',
            // translateX: '-50%'
          }
        }
        animate={{
          rotate: "1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        id="First Ring"
        className="absolute h-[344px] w-[344px] md:w-[580px] md:h-[580px] border rounded-full border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      >
        <div
          id="Circle on Ring 1"
          className="absolute h-2 w-2 top-1/2 left-0 bg-white rounded-full -translate-x-1/2 -translate-1/2"
        ></div>
        <div
          id="Circle on Ring 2"
          className="absolute h-2 w-2 top-0 left-1/2 bg-white rounded-full -translate-x-1/2 -translate-1/2"
        ></div>

        <div
          id="Circle on Ring 3(double)"
          className="absolute h-5 w-5 top-1/2 left-full border border-white  rounded-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"
        >
          <div
            id="Child Circle 1"
            className="h-2 w-2 bg-white rounded-full"
          ></div>
        </div>
      </motion.div>

      {/* Second Ring */}
      <motion.div
        animate={{
          rotate: "-1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        id="Second Ring"
        className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] rounded-full border border-white/20 -translate-1/2 top-1/2 left-1/2 border-dashed"
      ></motion.div>

      {/* Third Ring */}
      <motion.div
        animate={{
          rotate: "1turn",
        }}
        transition={{
          repeat: Infinity,
          duration: 90,
          ease: "linear",
        }}
        className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] rounded-full border border-white opacity-20 -translate-1/2 top-1/2 left-1/2"
      >
        <div
          id="Circle on Ring 1"
          className="absolute h-2 w-2 top-1/2 left-0 bg-white rounded-full -translate-x-1/2 -translate-1/2"
        ></div>
        <div
          id="Circle on Ring 2"
          className="absolute h-2 w-2 top-1/2 left-full bg-white rounded-full -translate-x-1/2 -translate-1/2"
        ></div>

        <div
          id="Circle on Ring 3(double)"
          className="absolute h-5 w-5 top-1/2 left-full border border-white  rounded-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"
        >
          <div
            id="Child Circle 1"
            className="h-2 w-2 bg-white rounded-full"
          ></div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative mt-16 mx-auto px-5 lg:px-12 xl:px-28 2xl:px-42">
        <h1 className="bggr text-[90px] md:text-[160px] md:leading-none font-semibold tracking-tighter bg-white text-center">
          SpectraAI
        </h1>
        <p className="text-lg text-white/70 mt-5 text-center md:text-xl max-w-xl mx-auto">
          Get real time Image Analysis. Get any information you want about your
          image effortlessly with SpectraAI, where Smart Technology meets
          user-friendly Image Analysis tools.
        </p>
        <div className="flex justify-center mt-5">
          <Link to="/analyze">
            <Button as="a" href="/analyze">
              Try $AI <IoIosArrowRoundForward />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
export default Hero;
