

const ImageQuestionInput = ({ value, setValue, analyzeImage, response, error, clear }) => {
  return (
    <div
      id="input-container"
      className="w-full flex border-2 mb-4 border-gray-300 rounded-lg overflow-hidden shadow-md mt-2"
    >
      <input
        type="text"
        value={value}
        placeholder="Ask anything you want about the image"
        onChange={(e) => setValue(e.target.value)}
        className="border-none p-2 w-[90%] outline-none font-[200] text-md box-border placeholder:text-gray-500 placeholder:italic placeholder-opacity-50 placeholder:font-[200]"
      />
      {!response && !error ? (
        <button
          onClick={analyzeImage}
          className="min-w-[10%] border-none border-l-2 border-l-black bg-gray-300 text-center"
        >
          Ask me
        </button>
      ) : (
        <button
          onClick={clear}
          className="min-w-[10%] border-none border-l-2 border-l-black bg-gray-300 text-center text-red-700 font-semibold text-md"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default ImageQuestionInput;
