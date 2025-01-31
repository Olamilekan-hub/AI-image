
import { DotLottiePlayer } from "@dotlottie/react-player"

const tabs = [
  {
    icon: "/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    par: "Navigate through your image analysis effortlessly with our intuitive dashboard. All your results, tools, and features are neatly organized for a seamless experience.",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/lottie/click.lottie",
    title: "Real Time Analysis",
    par: "Get instant results with our real-time image analysis! Simply upload an image and receive accurate insights in seconds, helping you make quick, data-driven decisions.",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/lottie/stars.lottie",
    title: "Smart keyword suggestion",
    par: "Looking for the best keywords to ask? Our AI suggests relevant queries based on your image. Simply upload your image, and we’ll recommend insightful keywords to guide your next steps for optimized results.",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

const Features = () => {
  return (
    <section id="features" className='py-20 py-24'>
      <div className='container'>
      <h2 className="text-5xl md:text-6xl font-medium text-center tracking tighter"> Analyze your Image Effortlessly</h2>
      <p className='text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-thight text-center mt-5'> Get real time Image Analysis. Get any information you want about your
          image effortlessly with SpectraAI, where Smart Technology meets
          user-friendly Image Analysis tools.</p>

      <div className='mt-10 flex flex-col gap-3 lg:flex-row'>
        {tabs.map((tab) => (
          <div key={tab.title} className='border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1'>
            <div className='border h-12 w-12 border-white/15 rounded-lg inline-flex justify-center items-center'>
              <DotLottiePlayer src={tab.icon} className="h-5 w-5" autoplay />
            </div>
            <div className='font-medium'>{tab.title}</div>
            {tab.isNew && <div className='text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold'>new</div>}
          </div>
        ))}
      </div>
      <div className='border border-white/20 p-2.5 rounded-xl mt-3 flex flex-col gap-3 lg:flex-row'>
        {/* <div className='aspect-video bg-cover  border border-white/20 rounded-lg' style={{backgroundImage: `url(/images/product-image.png)`}}></div> */}
        {tabs.map((tab) => (
          <div key={tab.title} className='border border-white/15 flex px-3 py-5 rounded-xl gap-2.5 items-center justify-center lg:flex-1 lg:flex-col'>
            <div className='border h-12 w-12 border-white/15 rounded-lg inline-flex justify-center items-center'>
              <DotLottiePlayer src={tab.icon} className="h-5 w-5" autoplay />
            </div>
            <div className='font-medium'>{tab.par}</div>
            {/* {tab.isNew && <div className='text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold'>new</div>} */}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Features;