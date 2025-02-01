const ImageUpload = ({ image, uploadImage }) => {
  return (
    <div
      id="image-container"
      className="w-full md:w-[65%] xl:w-[60%] h-[15rem] md:[20rem] xl:h-[25rem] bg-black/50 border-2 border-dashed border-white/50 flex items-center justify-center rounded-xl overflow-hidden ml-0 md:ml-[35%] xl:ml-[40%] mt-10"
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
          className="bg-white/60 text-black font-semibold text-sm p-2 rounded-lg md:text-lg hover:bg-white hover:text-black/50"
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
