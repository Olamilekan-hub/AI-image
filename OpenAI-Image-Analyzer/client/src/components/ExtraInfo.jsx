// // ExtraInfo.jsx

// const ExtraInfo = () => (
//   <p
//     id="extra-info"
//     className="p-2 text-sm font-medium text-center text-white/80 hover:text-white"
//   >
//     Upload your image to discover its underlying technology, let SpectraAI
//     analyze it for you.
//   </p>
// );

// export default ExtraInfo;

import { RiLightbulbFlashLine } from "react-icons/ri";

const ExtraInfo = () => {
  return (
    <div className="flex items-center justify-center w-full p-4 my-6 border rounded-lg bg-indigo-900/20 backdrop-blur-sm border-indigo-500/30">
      <RiLightbulbFlashLine className="flex-shrink-0 w-5 h-5 mr-3 text-indigo-400" />
      <p className="text-sm text-white/90 md:text-base">
        Upload your image to discover its underlying technology. Spectra
        AI will analyze and provide insights about your image.
      </p>
    </div>
  );
};

export default ExtraInfo;

// import { RiLightbulbFlashLine } from "react-icons/ri";

// const ExtraInfo = ({ promptCount = 0 }) => {
//   return (
//     <div className="flex items-center justify-center w-full p-4 my-6 border rounded-lg bg-indigo-900/20 backdrop-blur-sm border-indigo-500/30">
//       <RiLightbulbFlashLine className="flex-shrink-0 w-5 h-5 mr-3 text-indigo-400" />
//       <div className="flex-grow text-sm text-white/90 md:text-base">
//         <p>
//           Upload your image to discover its underlying technology. SpectraAI will analyze and provide insights about your image.
//         </p>
//         {promptCount > 0 && (
//           <p className="mt-1 text-sm text-indigo-300">
//             You've used {promptCount} out of 10 available questions for this session.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExtraInfo;