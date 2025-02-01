import { FaSpinner } from "react-icons/fa6";

const ImageResponse = ({ response, error, loading }) => {
  return (
    <>
      {loading && (
        <p
          id="loading"
          className="text-center w-full text-md md:text-xl font-semibold bg-gray-100 mb-8 text-black p-5 rounded-lg shadow-lg"
        >
          Generating Analysis...
          <FaSpinner className="animate-spin mr-2" />
        </p>
      )}
      {error && (
        <p
          id="error"
          className="text-red-500 italic text-md text-center mb-4 font-semibold"
        >
          {error}
        </p>
      )}
      {response && (
        <p
          id="response"
          className="bg-gray-100 text-black mt-2 mb-8 rounded-lg p-5 shadow-lg w-[78%] md:w-[68%]"
        >
          {response}
        </p>
      )}
    </>
  );
};

export default ImageResponse;
