import { useState } from "react";
import useSurpriseOptions from "../utils/useSurpriseOptions";
import { uploadImageApi, analyzeImageApi } from "../utils/api";
import ImageUpload from "../components/ImageUpload";
import ImageQuestionInput from "../components/ImageQuestionInput";
import ImageResponse from "../components/ImageResponse";
import ExtraInfo from "../components/ExtraInfo";
import QuestionPrompt from "../components/QuestionPrompt";

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
    <div
      id="app"
      className="min-h-screen w-full bg-gray-100 p-4 flex justify-center items-center"
    >
      <section
        id="search-section"
        className="w-full shadow-xl bg-white rounded-xl px-8 space-y-4 flex flex-col"
      >
        <ImageUpload image={image} uploadImage={uploadImage} />
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
  );
};

export default ImageAnalyzer;
