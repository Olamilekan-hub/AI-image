import Header from "../components/Header";
import Hero from "../components/Hero";
import LoadingPage from "./LoadingPage";
import About from "../components/About";
import Footer from "../components/Footer";
import ContactForm from "../components/Contact";

const Home = () => {
  return (
    <div className="text-white h-screen">
      <LoadingPage />

      {/* Main Content */}
      {/* {!isLoading && ( */}
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 font-lobster">
            Welcome!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            This is the main content of the page.
          </p>
        </div>
      </div> */}
      {/* )} */}
      
      <Header />
      <Hero/>
      <About/>
      <ContactForm/>
      <hr className="border-1 border-gray-500" />
      <Footer/>
    </div>
  );
};

export default Home;
