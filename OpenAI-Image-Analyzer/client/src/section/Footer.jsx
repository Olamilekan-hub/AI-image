
import { FaXTwitter } from "react-icons/fa6";
// import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="py-5 border-t border-white/15">
      <div className='px-5 lg:px-12 xl:px-28 2xl:px-42'>
                              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                              <div className="flex gap-2 items-center lg:flex-1 lg:justify-start">
                                        <img src="/images/Variant 1.png" alt="logo" className="h-6 w-6" />
                                        <div className="font-medium md:text-lg">SPECTRA AI</div>
                              </div>
                                        <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
                                                  <a href="" className="text-white/70 hover:text-white text-xs md:text-sm transition">Docs</a>
                                                  
                                                  <a href="" className="text-white/70 hover:text-white text-xs md:text-sm transition">Contact Us</a>
                                                  <a href="#features" className="text-white/70 hover:text-white text-xs md:text-sm transition">Features</a>
                                        </nav>
                              <div className="flex gap-5 lg:flex-1 lg:justify-end">
                                                  <a href="https://x.com/useSpectraAI" className="text-white/70 hover:text-white text-xs md:text-sm transition flex items-center gap-2">
                                                  <FaXTwitter className="text-white/40 hover:text-white transition h-4 w-4" />
                                                   </a>
                                        {/* <FaXTwitter className="text-white/40 hover:text-white transition" />
                                        <BsTelegram className="text-white/40 hover:text-white transition" /> */}
                              </div>
                              </div>
                    </div>
    </footer>
  )
}
export default Footer