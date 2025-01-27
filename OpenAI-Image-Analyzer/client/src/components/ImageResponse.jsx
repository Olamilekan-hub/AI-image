
const ImageResponse = ({ response, error, loading }) => {
  return (
    <>
      {loading && (
        <p
          id="loading"
          className="text-center w-full text-xl font-semibold bg-gray-100 mb-8 text-black p-3 rounded-lg shadow-lg"
        >
          Loading...
        </p>
      )}
      {error && (
        <p
          id="error"
          className="text-red-700 italic text-lg text-center mb-4 font-semibold"
        >
          {error}
        </p>
      )}
      {response && (
        <p
          id="response"
          className="bg-gray-100 text-black mt-2 mb-8 rounded-lg p-4 shadow-lg"
        >
          {response}
        </p>
      )}
    </>
  );
};

export default ImageResponse;
