import { FaSpinner } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';


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
        <div
          id="response"
          className="bg-white/70 text-black font-semibold text-sm md:text-md lg:text-lg mt-2 mb-8 rounded-lg p-5  w-full mdw-[80%] lg:w-[70%]"
        >
          <ReactMarkdown>{String(response)}</ReactMarkdown>

        </div>
      )}
    </>
  );
};

export default ImageResponse;
