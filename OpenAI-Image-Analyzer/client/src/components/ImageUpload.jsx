// //ImageUpload.jsx
// const ImageUpload = ({ image, uploadImage }) => {
//   return (
//     <div
//       id="image-container"
//       className="w-full md:w-[65%] xl:w-[60%] h-[15rem] md:[20rem] xl:h-[25rem] bg-black/50 border-2 border-dashed border-white/50 flex items-center justify-center rounded-xl overflow-hidden ml-0 md:ml-[35%] xl:ml-[40%] mt-10"
//     >
//       {image ? (
//         <img
//           src={URL.createObjectURL(image)}
//           alt="uploaded image"
//           className="w-full h-full object-cover text-center"
//         />
//       ) : (
//         <label
//           htmlFor="files"
//           className="bg-white/60 text-black font-semibold text-sm p-2 rounded-lg md:text-lg hover:bg-white hover:text-black/50"
//         >
//           Upload an Image
//         </label>
//       )}
//       <input
//         onChange={uploadImage}
//         id="files"
//         accept="image/*"
//         type="file"
//         hidden
//       />
//     </div>
//   );
// };

// export default ImageUpload;

import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa6";

const ImageUpload = ({ image, uploadImage, upLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const event = { target: { files: e.dataTransfer.files } };
      uploadImage(event);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 mb-6">
      <div
        className={`w-full md:w-4/5 lg:w-3/5 xl:w-1/2 aspect-video max-h-[30rem] relative rounded-xl overflow-hidden transition-all duration-300 ${
          isDragging
            ? "border-4 border-purple-500 shadow-lg shadow-purple-500/30"
            : image
            ? "border-2 border-white/40 shadow-md"
            : "border-2 border-dashed border-white/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70 pointer-events-none z-10"></div>
        
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="uploaded image"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-white text-sm truncate">
                  {image.name || "Uploaded image"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="bg-purple-700 hover:bg-purple-600 text-white rounded-lg px-3 py-2 text-sm transition-colors duration-300"
              >
                Change
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            {upLoading ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <FaSpinner className="animate-spin text-purple-400 h-8 w-8" />
                <p className="text-white font-medium">Processing...</p>
              </div>
            ) : (
              <>
                <FiUpload className="text-white/80 h-10 w-10 mb-3" />
                <p className="text-white font-medium text-lg mb-2">
                  Upload an image to analyze
                </p>
                <p className="text-white/60 text-sm max-w-xs text-center">
                  Drag and drop or click to select a file
                </p>
                <button
                  className="mt-4 bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  onClick={handleClick}
                >
                  Select Image
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        onChange={uploadImage}
        id="files"
        accept="image/*"
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;