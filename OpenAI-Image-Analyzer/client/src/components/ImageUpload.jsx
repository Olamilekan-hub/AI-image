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
//           className="object-cover w-full h-full text-center"
//         />
//       ) : (
//         <label
//           htmlFor="files"
//           className="p-2 text-sm font-semibold text-black rounded-lg bg-white/60 md:text-lg hover:bg-white hover:text-black/50"
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

const ImageUpload = ({ image, imagePreviewUrl, uploadImage, upLoading }) => {
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
    <div className="flex flex-col items-center justify-center w-full mt-10 mb-6">
      <div
        className={`w-full md:w-4/5 lg:w-3/5 xl:w-1/2 aspect-video max-h-[30rem] relative rounded-xl overflow-hidden transition-all duration-300 ${
          isDragging
            ? "border-4 border-purple-500 shadow-lg shadow-purple-500/30"
            : imagePreviewUrl
            ? "border-2 border-white/40 shadow-md"
            : "border-2 border-dashed border-white/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/0 to-black/70"></div>

        {imagePreviewUrl ? (
          <>
            <img
              src={imagePreviewUrl}
              alt="uploaded image"
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute z-20 flex items-center justify-between bottom-4 left-4 right-4">
              <div className="px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm">
                <p className="text-sm text-white truncate">
                  {image?.name || "Uploaded image"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="px-3 py-2 text-sm text-white transition-colors duration-300 bg-purple-700 rounded-lg hover:bg-purple-600"
              >
                Change
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
            {upLoading ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <FaSpinner className="w-8 h-8 text-purple-400 animate-spin" />
                <p className="font-medium text-white">Processing...</p>
              </div>
            ) : (
              <>
                <FiUpload className="w-10 h-10 mb-3 text-white/80" />
                <p className="mb-2 text-lg font-medium text-white">
                  Upload an image to analyze
                </p>
                <p className="max-w-xs text-sm text-center text-white/60">
                  Drag and drop or click to select a file
                </p>
                <button
                  className="px-4 py-2 mt-4 text-white transition-colors duration-300 bg-purple-700 rounded-lg hover:bg-purple-600"
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
