// // ImageResponse.jsx
// import { FaSpinner } from "react-icons/fa6";
// import ReactMarkdown from 'react-markdown';
// import { useState, useEffect, useRef } from 'react';

// const ImageResponse = ({ response, error, loading, upLoading }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const fullResponseRef = useRef('');
//   const typingSpeedRef = useRef(30); // milliseconds per character
//   const timeoutRef = useRef(null);

//   // Update the full response reference when the response prop changes
//   useEffect(() => {
//     if (response) {
//       fullResponseRef.current = response;
      
//       // If we're not already typing, start the typing effect
//       if (!timeoutRef.current && displayedText.length < fullResponseRef.current.length) {
//         typeNextCharacter();
//       }
//     } else {
//       // Reset displayed text when response is cleared
//       setDisplayedText('');
//       fullResponseRef.current = '';
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//         timeoutRef.current = null;
//       }
//     }
//   }, [response]);

//   // Clean up timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   // Function to type the next character
//   const typeNextCharacter = () => {
//     if (displayedText.length < fullResponseRef.current.length) {
//       // Type the next character
//       setDisplayedText(fullResponseRef.current.substring(0, displayedText.length + 1));
      
//       // Schedule the next character
//       timeoutRef.current = setTimeout(typeNextCharacter, typingSpeedRef.current);
//     } else {
//       timeoutRef.current = null; // Clear the timeout reference when done
//     }
//   };

//   return (
//     <>
//       {upLoading && (
//         <p
//           id="upLoading"
//           className="flex items-center justify-center w-[50%] text-center w-full text-sm md:text-lg font-semibold bg-white/50 mb-8 text-black p-5 rounded-lg"
//         >
//           Uploading Image...
//           <FaSpinner className="animate-spin ml-2" />
//         </p>
//       )}
//       {loading && !displayedText && (
//         <p
//           id="loading"
//           className="flex items-center justify-center w-[50%] text-center w-full text-sm md:text-lg font-semibold bg-white/50 mb-8 text-black p-5 rounded-lg"
//         >
//           Generating Analysis...
//           <FaSpinner className="animate-spin ml-2" />
//         </p>
//       )}
//       {error && (
//         <p
//           id="error"
//           className="text-red-500 italic text-md text-center mb-4 font-semibold"
//         >
//           {error}
//         </p>
//       )}
//       {displayedText && (
//         <div
//           id="response"
//           className="bg-white/70 text-black font-semibold text-sm md:text-md lg:text-lg mt-2 mb-8 rounded-lg p-5 w-full mdw-[80%] lg:w-[70%]"
//         >
//           <ReactMarkdown>{String(displayedText)}</ReactMarkdown>
//           {(loading || displayedText.length < fullResponseRef.current.length) && (
//             <span className="inline-block w-2 h-4 ml-1 bg-black animate-blink"></span>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageResponse;

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaSpinner } from "react-icons/fa6";

const ImageResponse = ({ response, error, loading, upLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullResponseRef = useRef('');
  const typingSpeedRef = useRef(20); // Slightly faster typing speed
  const timeoutRef = useRef(null);
  const responseContainerRef = useRef(null);

  // Update the full response reference when the response prop changes
  useEffect(() => {
    if (response) {
      fullResponseRef.current = response;
      
      // If we're not already typing, start the typing effect
      if (!timeoutRef.current && displayedText.length < fullResponseRef.current.length) {
        typeNextCharacter();
      }
    } else {
      // Reset displayed text when response is cleared
      setDisplayedText('');
      fullResponseRef.current = '';
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [response]);

  // Auto-scroll to the bottom of the response container when new content appears
  useEffect(() => {
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Function to type the next character
  const typeNextCharacter = () => {
    if (displayedText.length < fullResponseRef.current.length) {
      // Type the next character
      setDisplayedText(fullResponseRef.current.substring(0, displayedText.length + 1));
      
      // Schedule the next character with a slight randomization to the typing speed
      const randomizedDelay = typingSpeedRef.current + Math.random() * 10;
      timeoutRef.current = setTimeout(typeNextCharacter, randomizedDelay);
    } else {
      timeoutRef.current = null; // Clear the timeout reference when done
    }
  };

  return (
    <div className="w-full mt-6 mb-8">
      {/* Loading states */}
      {upLoading && (
        <div className="flex items-center justify-center w-full py-5 px-4 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaSpinner className="animate-spin text-purple-400 h-5 w-5" />
            <p className="text-white font-medium">Uploading your image...</p>
          </div>
        </div>
      )}

      {loading && !displayedText && (
        <div className="flex items-center justify-center w-full py-5 px-4 bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3">
            <FaSpinner className="animate-spin text-indigo-400 h-5 w-5" />
            <p className="text-white font-medium">SpectraAI is analyzing your image...</p>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="w-full py-4 px-5 bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-lg mb-4 shadow-lg">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Response container */}
      {(displayedText || loading) && (
        <div 
          ref={responseContainerRef}
          className="w-full max-h-[50vh] overflow-y-auto bg-white/10 backdrop-blur-md border border-purple-500/20 rounded-lg shadow-xl transition-all duration-300"
        >
          <div className="p-5">
            {displayedText && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{String(displayedText)}</ReactMarkdown>
              </div>
            )}
            
            {/* Typing cursor effect */}
            {(loading || displayedText.length < fullResponseRef.current.length) && (
              <span className="inline-block w-2 h-5 bg-purple-400 ml-1 animate-blink"></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResponse;