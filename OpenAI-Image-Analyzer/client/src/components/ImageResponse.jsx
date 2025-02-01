import { FaSpinner } from "react-icons/fa6";
import ReactMarkdown from "react-markdown"

const ImageResponse = ({ response, error, loading }) => {
  return (
    <>
      {loading && (
        <p
          id="loading"
          className="flex items-center justify-center w-[50%] text-center w-full text-sm md:text-lg font-semibold bg-white/50 mb-8 text-black p-5 rounded-lg"
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
          className="bg-white/50 text-black font-semibold mt-2 mb-8 rounded-lg p-5  w-[85%] md:w-[68%]"
        >
          <ReactMarkdown>{response}</ReactMarkdown>
        </p>
      )}
    </>
  );
};

export default ImageResponse;
