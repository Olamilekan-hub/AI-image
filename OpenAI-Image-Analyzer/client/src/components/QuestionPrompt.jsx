// // QuestionPrompt.jsx
// import SurpriseButton from "./SurpriseButton";

// const QuestionPrompt = ({ surprise, response, loading, upLoading }) => (
//   <div className="flex gap-2 flex-col">
//     <p className="text-white text-left">
//       What do you want to know about the image?
//     </p>
//     <div className="text-center">
//       <SurpriseButton
//         surprise={surprise}
//         response={response}
//         loading={loading}
//         upLoading={upLoading}
//       />
//     </div>
//   </div>
// );

// export default QuestionPrompt;

import { FaShuffle } from "react-icons/fa6";

const QuestionPrompt = ({ surprise, response, loading, upLoading }) => {
  const isDisabled = loading || upLoading || response;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <h3 className="text-white text-lg font-medium">
        What would you like to know about this image?
      </h3>
      
      <button
        onClick={surprise}
        disabled={isDisabled}
        className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
          isDisabled
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : "bg-indigo-700 hover:bg-indigo-600 text-white shadow-md hover:shadow-indigo-500/30"
        }`}
      >
        <FaShuffle className="mr-2 h-4 w-4" />
        Random Question
      </button>
    </div>
  );
};

export default QuestionPrompt;