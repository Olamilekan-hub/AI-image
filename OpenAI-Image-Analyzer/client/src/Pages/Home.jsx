import LoadingPage from "./LoadingPage";

const Home = () => {
  return (
    <>
      <LoadingPage />

      {/* Main Content */}
      {/* {!isLoading && ( */}
      <div className="min-h-screen flex items-center justify-center bg-black relative">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 font-lobster">
            Welcome!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            This is the main content of the page.
          </p>
        </div>

        {/* )} */}
      </div>
    </>
  );
};

export default Home;
