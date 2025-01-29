
const ImageResponse = ({ response, error, loading }) => {
  return (
    <>
      {loading && (
        <p
          id="loading"
          className="text-center w-full text-xl font-semibold bg-gray-100 mb-8 text-black p-5 rounded-lg shadow-lg w-[68%]"
        >
          Generating Analysis...
        </p>
      )}
      {error && (
        <p
          id="error"
          className="text-red-700 italic text-lg text-center mb-4 font-semibold w-[68%]"
        >
          {error}
        </p>
      )}
      {response && (
        <p
          id="response"
          className="bg-gray-100 text-black mt-2 mb-8 rounded-lg p-5 shadow-lg w-[68%]"
        >
          {response}
        </p>
      )}
    </>
  );
};

export default ImageResponse;
