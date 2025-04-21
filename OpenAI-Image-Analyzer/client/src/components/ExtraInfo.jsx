// // ExtraInfo.jsx

// const ExtraInfo = () => (
//   <p
//     id="extra-info"
//     className="text-center text-white/80 hover:text-white font-medium text-sm  p-2"
//   >
//     Upload your image to discover its underlying technology, let SpectraAI
//     analyze it for you.
//   </p>
// );

// export default ExtraInfo;

// import { RiLightbulbFlashLine } from "react-icons/ri";

// const ExtraInfo = () => {
//   return (
//     <div className="w-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4 flex items-center justify-center my-6">
//       <RiLightbulbFlashLine className="text-indigo-400 h-5 w-5 mr-3 flex-shrink-0" />
//       <p className="text-white/90 text-sm md:text-base">
//         Upload your image to discover its underlying technology. SpectraAI will analyze and provide insights about your image.
//       </p>
//     </div>
//   );
// };

// export default ExtraInfo;

import { RiLightbulbFlashLine } from "react-icons/ri";

const ExtraInfo = ({ promptCount = 0 }) => {
  return (
    <div className="w-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4 flex items-center justify-center my-6">
      <RiLightbulbFlashLine className="text-indigo-400 h-5 w-5 mr-3 flex-shrink-0" />
      <div className="text-white/90 text-sm md:text-base flex-grow">
        <p>
          Upload your image to discover its underlying technology. SpectraAI will analyze and provide insights about your image.
        </p>
        {promptCount > 0 && (
          <p className="text-indigo-300 text-sm mt-1">
            You've used {promptCount} out of 10 available questions for this session.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExtraInfo;