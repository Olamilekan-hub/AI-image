// //ImageAnalyzer.jsx 
// import { useState, useRef } from "react";
// import Header from "../section/Header";
// import Footer from "../section/Footer";
// import useSurpriseOptions from "../utils/useSurpriseOptions";
// import { uploadImageApi, analyzeImageApi } from "../utils/api";
// import ImageUpload from "../components/ImageUpload";
// import ImageQuestionInput from "../components/ImageQuestionInput";
// import ImageResponse from "../components/ImageResponse";
// import ExtraInfo from "../components/ExtraInfo";
// import QuestionPrompt from "../components/QuestionPrompt";
// import BgWrapper from "../section/bg";

// const ImageAnalyzer = () => {
//   const [image, setImage] = useState(null);
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const [filePath, setFilePath] = useState("");
//   const [fileId, setFileId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [upLoading, setUpLoading] = useState(false);
//   const { value, setValue, surprise } = useSurpriseOptions();
  
//   // This ref will store the complete response as it comes in chunks
//   const completeResponseRef = useRef("");

//   const uploadImage = async (e) => {
//     setResponse("");
//     setError("");
//     completeResponseRef.current = "";
    
//     if (!e.target.files || !e.target.files[0]) {
//       setError("Error: No file selected");
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append("file", e.target.files[0]);
//     setImage(e.target.files[0]);

//     try {
//       setUpLoading(true);
//       const data = await uploadImageApi(formData);
//       setUpLoading(false);
      
//       if (data.error) {
//         throw new Error(data.error);
//       }
      
//       if (data.filePath) {
//         setFilePath(data.filePath);
//         setFileId(data.fileId);
//         console.log("File uploaded successfully:", data.filePath);
//       } else {
//         throw new Error("No file path in response");
//       }
//     } catch (error) {
//       setUpLoading(false);
//       console.error("Upload error:", error);
//       setError(`Error: ${error.message || "Something went wrong! Please try again"}`);
//     }
//   };

//   const analyzeImage = async () => {
//     setResponse("");
//     setError("");
//     completeResponseRef.current = "";
    
//     if (!image) {
//       setError("Error: No image uploaded! Please upload an image first.");
//       return;
//     }
    
//     if (!value) {
//       setError("Error: Please ask a question about the image.");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // Use the new streaming API with a callback to update the response in real-time
//       await analyzeImageApi(
//         value, 
//         filePath, 
//         fileId, 
//         (chunk) => {
//           // This callback will be called for each chunk received
//           completeResponseRef.current += chunk;
//           // Update the state to trigger the typing effect in ImageResponse
//           setResponse(completeResponseRef.current);
//         }
//       );
//     } catch (error) {
//       console.error("Analysis error:", error);
//       setError("Error: Something went wrong! Please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clear = () => {
//     setResponse("");
//     setError("");
//     setValue("");
//     setImage(null);
//     setFilePath("");
//     setFileId("");
//     completeResponseRef.current = "";
//   };

//   return (
//     <>
//       <Header className="fixed sticky top-0" />
//       <BgWrapper>
//         <section id="Analyze" >
//           <section
//             id="search-section"
//             className="flex flex-col w-full px-3 space-y-4 bg-black/20"
//           >
//             <ImageUpload
//               className=""
//               image={image}
//               uploadImage={uploadImage}
//               upLoading={upLoading}
//             />

//             <ExtraInfo />

//             <ImageResponse
//               response={response}
//               error={error}
//               loading={loading}
//               upLoading={upLoading}
//             />

//             <QuestionPrompt
//               surprise={surprise}
//               response={response}
//               loading={loading}
//             />
            
//             <ImageQuestionInput
//               value={value}
//               setValue={setValue}
//               analyzeImage={analyzeImage}
//               response={response}
//               error={error}
//               clear={clear}
//             />
//           </section>
//         </section>
//       </BgWrapper>
//       <Footer />
//     </>
//   );
// };

// export default ImageAnalyzer;

import { useState, useRef } from "react";
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const { value, setValue, surprise } = useSurpriseOptions();
  
  // This ref will store the complete response as it comes in chunks
  const completeResponseRef = useRef("");
  const uploadImage = async (e) => {
    // Clear previous states
    setResponse("");
    setError("");
    completeResponseRef.current = "";
    
    if (!e.target.files || !e.target.files[0]) {
      setError("Error: No file selected");
      return;
    }
    
    // Store the file
    const fileToUpload = e.target.files[0];
    
    // Set loading state first
    setUpLoading(true);
    
    // Clear previous file data
    setFilePath("");
    setFileId("");
    
    // Set image preview
    setImage(fileToUpload);
    
    // Create a new FormData instance for each upload
    const formData = new FormData();
    formData.append("file", fileToUpload);
    
    try {
      // Wait for the API response
      const data = await uploadImageApi(formData);
      
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
      console.error("Upload error:", error);
      setError(`Error uploading: ${error.message || "Please try again"}`);
      // Don't clear the image preview here so user can see what they tried to upload
    } finally {
      setUpLoading(false);
    }
  };
  
  const analyzeImage = async () => {
    setResponse("");
    setError("");
    
    if (!image) {
      setError("Please upload an image first before analyzing");
      return;
    }
    
    if (!value) {
      setError("Please ask a question about the image");
      return;
    }
    
    setLoading(true);
    
    try {
      const textResponse = await analyzeImageApi(value, filePath, fileId);
      console.log("Setting response:", textResponse); // Debug
      setResponse(textResponse);
    } catch (error) {
      console.error("Analysis error:", error);
      setError("Unable to analyze the image. Please try again");
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
    completeResponseRef.current = "";
  };

  return (
    <>
      <Header className="fixed sticky top-0" />
      <BgWrapper>
        <section id="Analyze" className="min-h-[80vh]">
          <div className="container px-4 mx-auto">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                  SpectraAI
                </span>{" "}
                Image Analyzer
              </h1>
              <p className="max-w-2xl mx-auto text-white/70">
                Upload your image and discover its underlying technology with our AI-powered analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <ImageUpload
                image={image}
                uploadImage={uploadImage}
                upLoading={upLoading}
              />
              
              <ExtraInfo />
              
              {image && (
                <>
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
                </>
              )}
              
              <ImageResponse
                response={response}
                error={error}
                loading={loading}
                upLoading={upLoading}
              />
            </div>
          </div>
        </section>
      </BgWrapper>
      <Footer />
    </>
  );
};

export default ImageAnalyzer;

// import { useState, useRef, useEffect } from "react";
// import Header from "../section/Header";
// import Footer from "../section/Footer";
// import useSurpriseOptions from "../utils/useSurpriseOptions";
// import { uploadImageApi, analyzeImageApi, clearConversationApi } from "../utils/api";
// import ImageUpload from "../components/ImageUpload";
// import ImageQuestionInput from "../components/ImageQuestionInput";
// import ImageResponse from "../components/ImageResponse";
// import ExtraInfo from "../components/ExtraInfo";
// import QuestionPrompt from "../components/QuestionPrompt";
// import BgWrapper from "../section/bg";
// import ConversationHistory from "../components/ConversationHistory";

// const ImageAnalyzer = () => {
//   const [image, setImage] = useState(null);
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const [filePath, setFilePath] = useState("");
//   const [fileId, setFileId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [upLoading, setUpLoading] = useState(false);
//   const { value, setValue, surprise } = useSurpriseOptions();
  
//   // Conversation history state
//   const [conversationHistory, setConversationHistory] = useState([]);
//   const [promptCount, setPromptCount] = useState(0);
  
//   // This ref will store the complete response as it comes in chunks
//   const completeResponseRef = useRef("");

//   // Auto-scroll to bottom on new messages
//   const conversationEndRef = useRef(null);
  
//   useEffect(() => {
//     if (conversationEndRef.current) {
//       conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [conversationHistory]);

//   const uploadImage = async (e) => {
//     setResponse("");
//     setError("");
//     completeResponseRef.current = "";
    
//     // Reset conversation when uploading a new image
//     setConversationHistory([]);
//     setPromptCount(0);
    
//     if (!e.target.files || !e.target.files[0]) {
//       setError("Error: No file selected");
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append("file", e.target.files[0]);
//     setImage(e.target.files[0]);

//     try {
//       setUpLoading(true);
//       const data = await uploadImageApi(formData);
//       setUpLoading(false);
      
//       if (data.error) {
//         throw new Error(data.error);
//       }
      
//       if (data.filePath) {
//         setFilePath(data.filePath);
//         setFileId(data.fileId);
//         console.log("File uploaded successfully:", data.filePath);
//       } else {
//         throw new Error("No file path in response");
//       }
//     } catch (error) {
//       setUpLoading(false);
//       console.error("Upload error:", error);
//       setError(`Error uploading: ${error.message || "Please try again"}`);
//     }
//   };

//   const analyzeImage = async () => {
//     setResponse("");
//     setError("");
//     completeResponseRef.current = "";
    
//     if (!image) {
//       setError("Please upload an image first before analyzing");
//       return;
//     }
    
//     if (!value) {
//       setError("Please ask a question about the image");
//       return;
//     }
    
//     // Check if the conversation limit has been reached
//     if (promptCount >= 10) {
//       setError("You've reached the maximum number of questions (10). Please restart the conversation.");
//       return;
//     }
    
//     setLoading(true);
    
//     // Add user question to conversation history
//     setConversationHistory(prev => [...prev, { role: 'user', content: value }]);
    
//     try {
//       // Use the streaming API with a callback to update the response in real-time
//       await analyzeImageApi(
//         value, 
//         filePath, 
//         fileId, 
//         (chunk) => {
//           // This callback will be called for each chunk received
//           completeResponseRef.current += chunk;
//           // Update the state to trigger the typing effect in ImageResponse
//           setResponse(completeResponseRef.current);
//         }
//       );
      
//       // Increment the prompt count
//       setPromptCount(prev => prev + 1);
      
//       // Add AI response to conversation history once complete
//       setConversationHistory(prev => [...prev, { 
//         role: 'assistant', 
//         content: completeResponseRef.current 
//       }]);
      
//     } catch (error) {
//       console.error("Analysis error:", error);
//       setError("Unable to analyze the image. Please try again");
//     } finally {
//       setLoading(false);
//       setValue(""); // Clear input field after sending
//     }
//   };

//   const restartConversation = async () => {
//     try {
//       // Clear conversation history on the server
//       await clearConversationApi();
      
//       // Reset local state
//       setResponse("");
//       setError("");
//       setValue("");
//       setConversationHistory([]);
//       setPromptCount(0);
//       completeResponseRef.current = "";
      
//     } catch (error) {
//       console.error("Error restarting conversation:", error);
//       setError("Failed to restart conversation. Please try again.");
//     }
//   };

//   const clear = () => {
//     setResponse("");
//     setError("");
//     setValue("");
//     setImage(null);
//     setFilePath("");
//     setFileId("");
//     setConversationHistory([]);
//     setPromptCount(0);
//     completeResponseRef.current = "";
//   };

//   return (
//     <>
//       <Header className="fixed sticky top-0" />
//       <BgWrapper>
//         <section id="Analyze" className="min-h-[80vh]">
//           <div className="container px-4 mx-auto">
//             <div className="mb-8 text-center">
//               <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
//                   SpectraAI
//                 </span>{" "}
//                 Image Analyzer
//               </h1>
//               <p className="max-w-2xl mx-auto text-white/70">
//                 Upload your image and discover its underlying technology with our AI-powered analysis
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 gap-6">
//               <ImageUpload
//                 image={image}
//                 uploadImage={uploadImage}
//                 upLoading={upLoading}
//               />
              
//               <ExtraInfo promptCount={promptCount} />
              
//               {/* Show conversation history if there are messages */}
//               {conversationHistory.length > 0 && (
//                 <ConversationHistory 
//                   history={conversationHistory} 
//                   onRestart={restartConversation} 
//                   promptCount={promptCount}
//                 />
//               )}
              
//               {image && (
//                 <>
//                   {/* Show question prompt only if we haven't reached limit */}
//                   {promptCount < 10 && (
//                     <>
//                       <QuestionPrompt
//                         surprise={surprise}
//                         response={response}
//                         loading={loading}
//                         upLoading={upLoading}
//                       />
                      
//                       <ImageQuestionInput
//                         value={value}
//                         setValue={setValue}
//                         analyzeImage={analyzeImage}
//                         response={response}
//                         error={error}
//                         clear={clear}
//                         isNewConversation={conversationHistory.length === 0}
//                       />
//                     </>
//                   )}
                  
//                   {/* Show only the current response that's being typed */}
//                   {(loading || (response && conversationHistory.length === 0)) && (
//                     <ImageResponse
//                       response={response}
//                       error={error}
//                       loading={loading}
//                       upLoading={upLoading}
//                     />
//                   )}
//                 </>
//               )}
              
//               {/* Reference for auto-scrolling */}
//               <div ref={conversationEndRef} />
//             </div>
//           </div>
//         </section>
//       </BgWrapper>
//       <Footer />
//     </>
//   );
// };

// export default ImageAnalyzer;