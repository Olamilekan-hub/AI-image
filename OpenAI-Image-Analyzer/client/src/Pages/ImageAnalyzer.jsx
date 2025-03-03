import { useState } from "react";
import Header from "../section/Header";
import Footer from "../section/Footer";
import useSurpriseOptions from "../utils/useSurpriseOptions";
import { uploadImageApi, analyzeImageApi } from "../utils/api";
import ImageUpload from "../components/ImageUpload";
import ImageQuestionInput from "../components/ImageQuestionInput";
import ImageResponse from "../components/ImageResponse";
import ExtraInfo from "../components/ExtraInfo";
import QuestionPrompt from "../components/QuestionPrompt";
import BgWrapper from "../section/bg";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileId, setFileId] = useState("");
  const [loading, setLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const { value, setValue, surprise } = useSurpriseOptions();

  const uploadImage = async (e) => {
    setResponse("");
    setError("");
    
    if (!e.target.files || !e.target.files[0]) {
      setError("Error: No file selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setImage(e.target.files[0]);

    try {
      setUpLoading(true);
      const data = await uploadImageApi(formData);
      setUpLoading(false);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.filePath) {
        setFilePath(data.filePath);
        setFileId(data.fileId);
        console.log("File uploaded successfully:", data.filePath);
      } else {
        throw new Error("No file path in response");
      }
    } catch (error) {
      setUpLoading(false);
      console.error("Upload error:", error);
      setError(`Error: ${error.message || "Something went wrong! Please try again"}`);
    }
  };

  const analyzeImage = async () => {
    setResponse("");
    setError("");
    
    if (!image) {
      setError("Error: No image uploaded! Please upload an image first.");
      return;
    }
    
    if (!value) {
      setError("Error: Please ask a question about the image.");
      return;
    }
    
    setLoading(true);
    
    try {
      // Use the new streaming API with a callback to update the response in real-time
      await analyzeImageApi(
        value, 
        filePath, 
        fileId, 
        (chunk, fullResponse) => {
          // This callback will be called for each chunk received
          setResponse(fullResponse);
        }
      );
    } catch (error) {
      console.error("Analysis error:", error);
      setError("Error: Something went wrong! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setResponse("");
    setError("");
    setValue("");
    setImage(null);
    setFilePath("");
    setFileId("");
  };

  return (
    <>
      <Header className="fixed sticky top-0" />
      <BgWrapper>
        <section id="Analyze" >
          <section
            id="search-section"
            className="w-full bg-black/20 px-3 space-y-4 flex flex-col"
          >
            <ImageUpload
              className=""
              image={image}
              uploadImage={uploadImage}
              upLoading={upLoading}
            />

            <ExtraInfo />

            <ImageResponse
              response={response}
              error={error}
              loading={loading}
              upLoading={upLoading}
            />

            <QuestionPrompt
              surprise={surprise}
              response={response}
              loading={loading}
              upLoading={upLoading}
            />
            
            <ImageQuestionInput
              value={value}
              setValue={setValue}
              analyzeImage={analyzeImage}
              response={response}
              error={error}
              clear={clear}
            />
          </section>
        </section>
      </BgWrapper>
      <Footer />
    </>
  );
};

export default ImageAnalyzer;