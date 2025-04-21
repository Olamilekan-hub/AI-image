// // ImageQuestionInput.jsx
// import { IoIosSend } from "react-icons/io";
// import { VscDebugRestart } from "react-icons/vsc";
// import Button from "./Button1";

// const ImageQuestionInput = ({
//   value,
//   setValue,
//   analyzeImage,
//   response,
//   error,
//   clear,
// }) => {
//   return (
//     <div
//       id="input-container"
//       className="w-full flex justify-between border mb-4 border-white/30 rounded-lg overflow-hidden shadow-xs shadow-white/50 mt-2"
//     >
//       <input
//         type="text"
//         value={value}
//         placeholder="Ask anything about the image..."
//         onChange={(e) => setValue(e.target.value)}
//         className="w-[80%] border-none p-2  outline-none text-sm placeholder:text-white/30 placeholder:italic focus:ring-1 focus:rounded-lg"
//       />
//       {!response && !error ? (
//         <Button
//           onClick={analyzeImage}
//           className="border-none border-l-2 border-l-black bg-gray-300 text-center"
//         >
//           <IoIosSend className="h-5 w-5" />
//         </Button>
//       ) : (
//         <Button
//           onClick={clear}
//           className="border-none border-l-2 border-l-black bg-gray-300 text-center text-red-700 font-semibold text-md"
//         >
//           <VscDebugRestart className="h-5 w-5" />
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ImageQuestionInput;


import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

const ImageQuestionInput = ({
  value,
  setValue,
  analyzeImage,
  response,
  error,
  clear,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !response && !error) {
      analyzeImage();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full mb-6 relative"
    >
      <div 
        className={`flex items-center w-full bg-white/10 backdrop-blur-md rounded-lg border transition-all duration-300 ${
          isFocused 
            ? "border-purple-500/70 shadow-lg shadow-purple-500/20" 
            : "border-white/20 shadow-md"
        }`}
      >
        <input
          type="text"
          value={value}
          placeholder="Ask anything about the image..."
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-3 px-4 bg-transparent text-white outline-none placeholder:text-white/40 text-base"
        />
        
        <div className="pr-3">
          {!response && !error ? (
            <button
              type="submit"
              disabled={!value.trim()}
              className={`p-2 rounded-full transition-all duration-300 ${
                value.trim() 
                  ? "bg-purple-600 hover:bg-purple-500 text-white" 
                  : "bg-white/20 text-white/40 cursor-not-allowed"
              }`}
            >
              <IoIosSend className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={clear}
              className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all duration-300"
            >
              <VscDebugRestart className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ImageQuestionInput;