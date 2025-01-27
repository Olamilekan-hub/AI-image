const ImageUpload = ({ image, uploadImage }) => {
  return (
    <div
      id="image-container"
      className="w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden m-8 mx-auto"
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
