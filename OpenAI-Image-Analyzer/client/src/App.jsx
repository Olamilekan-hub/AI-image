import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageAnalyzer from "./Pages/ImageAnalyzer";
import Home from "./Pages/Home";
import Home1 from "./Pages/Home1";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analyze" element={<ImageAnalyzer />} />
        <Route path="*" element={<Home1 />} />
      </Routes>
    </Router>
  );
};
export default App;

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [value, setValue] = useState("");
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const [filePath, setFilePath] = useState("");
//   const [loading, setLoading] = useState(false);

//   const surpriseOptions = [
//     "What is the main object in the image?",
//     "What are the color used in the image?",
//     "Generate the text in the image?",
//     "What is the image about?",
//     "What is the image trying to convey?",
//     "What is the mood of the image?",
//   ];

//   const surprise = () => {
//     const randomPrompt =
//       surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
//     setValue(randomPrompt);
//   };

//   const uploadImage = async (e) => {
//     setResponse("");
//     const formData = new FormData();
//     formData.append("file", e.target.files[0]);
//     setImage(e.target.files[0]);

//     try {
//       const options = {
//         method: "POST",
//         body: formData,
//       };
//       const response = await fetch(
//         "https://ai-image-production.up.railway.app/upload",
//         options
//       );
//       const data = await response.json();
//       console.log(data);
//       if (data.filePath) {
//         setFilePath(data.filePath);
//         console.log("File path:", data.filePath);
//       } else {
//         throw new Error("No file path in response");
//       }
//     } catch (error) {
//       setError("Error: Something went wrong! Please try again");
//       console.error(error);
//     }
//   };

//   const analyzeImage = async () => {
//     setResponse("");
//     if (!image) {
//       setError("Error: No image uploaded");
//       return;
//     }
//     if (!value) {
//       setError("Error: Please ask a question");
//       return;
//     }
//     setLoading(true);
//     try {
//       const options = {
//         method: "POST",
//         body: JSON.stringify({
//           message: value,
//           filePath,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await fetch(
//         "https://ai-image-production.up.railway.app/openai",
//         options
//       );
//       const data = await response.text();
//       console.log(data);
//       setResponse(data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//       setError("Error: Something went wrong! Please try again");
//     }
//   };

//   const clear = () => {
//     setResponse("");
//     setError("");
//     setValue("");
//     setImage(null);
//   };

//   return (
//     <div
//       id="app"
//       className="min-h-screen w-full bg-gray-100 p-4 flex justify-center items-center"
//     >
//       <section
//         id="search-section"
//         className="w-full  shadow-xl bg-white rounded-xl px-8 space-y-4 flex flex-col"
//       >
//         <div
//           id="image-container"
//           className="w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden m-8 mx-auto"
//         >
//           {image && (
//             <img
//               src={URL.createObjectURL(image)}
//               alt="uploaded image"
//               className="w-full h-full object-cover text-center"
//             />
//           )}
//           {!image && (
//             <label
//               htmlFor="files"
//               className="bg-gray-500 py-3 px-4 rounded-full text-white font-bold text-xl hover:bg-gray-800 hover:text-gray-200"
//             >
//               Upload an Image{" "}
//             </label>
//           )}
//         </div>

//         <p id="extra-info" className="text-center text-gray-500">
//           <span>
//             <input
//               onChange={uploadImage}
//               id="files"
//               accept="image/*"
//               type="file"
//               hidden
//             />
//           </span>
//           Upload an image and ask anything you want to know about it.
//         </p>

//         <p className="text-gray-600 text-left  flex gap-2">
//           What do you want to know abot the image?
//           <button
//             id="surprise"
//             onClick={surprise}
//             className="bg-gray-200 text-black px-3 py- rounded-lg font-semibold hover:bg-gray-400 hover:text-gray-800"
//             disabled={response || loading}
//           >
//             Surprise me
//           </button>
//         </p>

//         <div
//           id="input-container"
//           className="w-full flex border-2 mb-4 border-gray-300 rounded-lg overflow-hidden shadow-md mt-2"
//         >
//           <input
//             type="text"
//             value={value}
//             placeholder="Ask anything you want about te image"
//             onChange={(e) => setValue(e.target.value)}
//             className="border-none p-2 w-[90%] outline-none font-[200] text-md box-border placeholder:text-gray-500 placeholder:italic placeholder-opacity-50 placeholder:font-[200]"
//           />
//           {!response && !error && (
//             <button
//               onClick={analyzeImage}
//               className="min-w-[10%] border-none border-l-2 border-l-black bg-gray-300 text-center"
//             >
//               Ask me
//             </button>
//           )}
//           {(response || error) && (
//             <button
//               onClick={clear}
//               className="min-w-[10%] border-none border-l-2 border-l-black bg-gray-300 text-center text-red-700 font-semibold text-md"
//             >
//               Clear
//             </button>
//           )}
//         </div>
//         {loading && (
//           <p
//             id="loading"
//             className="text-center w-full text-xl font-semibold bg-gray-100 mb-8 text-black p-3 rounded-lg shadow-lg"
//           >
//             Loading...
//           </p>
//         )}
//         {error && (
//           <p
//             id="error"
//             className="text-red-700 italic text-lg text-center mb-4 font-semibold"
//           >
//             {error}
//           </p>
//         )}
//         {response && (
//           <p
//             id="response"
//             className="bg-gray-100 text-black mt-2 mb-8 rounded-lg p-4 shadow-lg"
//           >
//             {response}
//           </p>
//         )}
//       </section>
//     </div>
//   );
// };
// export default App;
