import { FaSpinner } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useRef } from 'react';

const ImageResponse = ({ response, error, loading, upLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullResponseRef = useRef('');
  const typingSpeedRef = useRef(30); // milliseconds per character
  const timeoutRef = useRef(null);

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
      
      // Schedule the next character
      timeoutRef.current = setTimeout(typeNextCharacter, typingSpeedRef.current);
    } else {
      timeoutRef.current = null; // Clear the timeout reference when done
    }
  };

  return (
    <>
      {upLoading && (
        <p
          id="upLoading"
          className="flex items-center justify-center w-[50%] text-center w-full text-sm md:text-lg font-semibold bg-white/50 mb-8 text-black p-5 rounded-lg"
        >
          Uploading Image...
          <FaSpinner className="animate-spin ml-2" />
        </p>
      )}
      {loading && !displayedText && (
        <p
          id="loading"
          className="flex items-center justify-center w-[50%] text-center w-full text-sm md:text-lg font-semibold bg-white/50 mb-8 text-black p-5 rounded-lg"
        >
          Generating Analysis...
          <FaSpinner className="animate-spin ml-2" />
        </p>
      )}
      {error && (
        <p
          id="error"
          className="text-red-500 italic text-md text-center mb-4 font-semibold"
        >
          {error}
        </p>
      )}
      {displayedText && (
        <div
          id="response"
          className="bg-white/70 text-black font-semibold text-sm md:text-md lg:text-lg mt-2 mb-8 rounded-lg p-5 w-full mdw-[80%] lg:w-[70%]"
        >
          <ReactMarkdown>{String(displayedText)}</ReactMarkdown>
          {(loading || displayedText.length < fullResponseRef.current.length) && (
            <span className="inline-block w-2 h-4 ml-1 bg-black animate-blink"></span>
          )}
        </div>
      )}
    </>
  );
};

export default ImageResponse;