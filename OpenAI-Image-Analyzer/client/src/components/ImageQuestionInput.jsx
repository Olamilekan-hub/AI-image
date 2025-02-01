import { IoIosSend } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import Button from "./Button1";

const ImageQuestionInput = ({
  value,
  setValue,
  analyzeImage,
  response,
  error,
  clear,
}) => {
  return (
    <div
      id="input-container"
      className="w-full flex justify-between border mb-4 border-white/30 rounded-lg overflow-hidden shadow-xs shadow-white/50 mt-2"
    >
      <input
        type="text"
        value={value}
        placeholder="Ask anything about the image..."
        onChange={(e) => setValue(e.target.value)}
        className="w-[80%] border-none p-2  outline-none text-sm placeholder:text-white/30 placeholder:italic focus:ring-1 focus:rounded-lg"
      />
      {!response && !error ? (
        <Button
          onClick={analyzeImage}
          className="border-none border-l-2 border-l-black bg-gray-300 text-center"
        >
          <IoIosSend className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          onClick={clear}
          className="border-none border-l-2 border-l-black bg-gray-300 text-center text-red-700 font-semibold text-md"
        >
          <VscDebugRestart className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default ImageQuestionInput;
