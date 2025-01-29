const ImageUpload = ({ image, uploadImage }) => {
  return (
    <div
      id="image-container"
      className="w-[75%] md:w-[50%] h-[25rem] bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden ml-[25%] md:ml-[50%] mt-10"
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="uploaded image"
          className="w-full h-full object-cover text-center"
        />
      ) : (
        <label
          htmlFor="files"
          className="bg-gray-500 py-3 px-4 rounded-full text-white font-bold text-xl hover:bg-gray-800 hover:text-gray-200"
        >
          Upload an Image
        </label>
      )}
      <input
        onChange={uploadImage}
        id="files"
        accept="image/*"
        type="file"
        hidden
      />
    </div>
  );
};

export default ImageUpload;
