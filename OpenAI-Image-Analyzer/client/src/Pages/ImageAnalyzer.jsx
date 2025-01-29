import { useState } from "react";
import useSurpriseOptions from "../utils/useSurpriseOptions";
import { uploadImageApi, analyzeImageApi } from "../utils/api";
import ImageUpload from "../components/ImageUpload";
import ImageQuestionInput from "../components/ImageQuestionInput";
import ImageResponse from "../components/ImageResponse";
import ExtraInfo from "../components/ExtraInfo";
import QuestionPrompt from "../components/QuestionPrompt";
// import Header from "../components/Header";
import Footer from "../components/Footer"

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const { value, setValue, surprise } = useSurpriseOptions();

  const uploadImage = async (e) => {
    setResponse("");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setImage(e.target.files[0]);

    try {
      const data = await uploadImageApi(formData);
      if (data.filePath) {
        setFilePath(data.filePath);
      } else {
        throw new Error("No file path in response");
      }
    } catch {
      setError("Error: Something went wrong! Please try again");
    }
  };

  const analyzeImage = async () => {
    setResponse("");
    if (!image) {
      setError("Error: No image uploaded");
      return;
    }
    if (!value) {
      setError("Error: Please ask a question");
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeImageApi(value, filePath);
      setResponse(data);
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Error: Something went wrong! Please try again");
    }
  };

  const clear = () => {
    setResponse("");
    setError("");
    setValue("");
    setImage(null);
  };

  return (
    <div className="h-screen overflow-auto">

      {/* <Header /> */}

      <video id="Video" className="hero-video" autoPlay loop muted playsInline>
        <source
          src="/videos/technology-digital-or-information-data-concept-free-video-vmake.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-6xl p-4 fixed w-full top-0 cf bg-gray-900/75 font-bold text-gray-200 text-center">SpectraAI $SAI</h1>

      <div
        id="Analyze"
        className="min-h-screen w-full bg-gray-900/45 p-4 flex justify-center items-center overflow-auto mt-20"
      >
        <section
          id="search-section"
          className="w-full md:w-[70%] h-screen shadow-xl shadow-gray-500 bg-gray-800 border-2 border-gray-200 rounded-xl px-8 space-y-4 flex flex-col overflow-auto"
        >
          <ImageUpload className="flex justify-end item-right" image={image} uploadImage={uploadImage} />

          <ExtraInfo />
          <QuestionPrompt
            surprise={surprise}
            response={response}
            loading={loading}
          />
          <ImageQuestionInput
            value={value}
            setValue={setValue}
            analyzeImage={analyzeImage}
            response={response}
            error={error}
            clear={clear}
          />
          <ImageResponse response={response} error={error} loading={loading} />
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ImageAnalyzer;
