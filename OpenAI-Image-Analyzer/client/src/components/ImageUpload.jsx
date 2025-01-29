const ImageUpload = ({ image, uploadImage }) => {
  return (
    <div
      id="image-container"
      className="w-[75%] md:w-[65%] xl:w-[60%] h-[15rem] md:[20rem] xl:h-[25rem] bg-gray-200 border-2 border-dashed border-gray-500 flex items-center justify-center rounded-xl overflow-hidden ml-[25%] md:ml-[35%] xl:ml-[40%] mt-10"
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
          className="bg-gray-600 py-1 md:py-3 px-2 md:px-4 rounded-full text-gray-200 font-bold text-md md:text-xl hover:bg-gray-800 hover:text-gray-200"
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
