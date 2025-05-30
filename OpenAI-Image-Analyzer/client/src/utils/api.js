// api.js
export const uploadImageApi = async (formData) => {
  try {
    console.log("Starting file upload...");
    
    const options = {
      method: "POST",
      body: formData,
      credentials: "include",
      // Skip timeout in the fetch options
    };
    
    // Add cache-busting parameter
    const timestamp = Date.now();
    const url = `https://ai-image-production.up.railway.app/upload?t=${timestamp}`;
    
    console.log(`Sending request to ${url}`);
    
    // Set up an AbortController for timeout control
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Try to get error info from the response
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Upload successful, received data:", data);
      return data;
    } catch (fetchError) {
      // Clear the timeout if fetch failed
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error("Upload API error:", error);
    return { error: error.message || "Network error occurred" };
  }
};

export const analyzeImageApi = async (message, filePath, fileId, onChunk) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ message, filePath, fileId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  
  try {
    const response = await fetch(
      "https://ai-image-production.up.railway.app/openai",
      // "http://localhost:8000/openai", //for local testing,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the text response
    const text = await response.text();
    console.log("Received text response:", text); // Debug
    return text;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// export const uploadImageApi = async (formData) => {
//   const options = {
//     method: "POST",
//     body: formData,
//     credentials: "include",
//   };
//   const response = await fetch(
//     "https://ai-image-production.up.railway.app/upload",
//     // "http://localhost:8000/upload", //for local testing
//     options
//   );
//   return response.json();
// };

// export const analyzeImageApi = async (message, filePath, fileId, onChunk) => {
//   const options = {
//     method: "POST",
//     body: JSON.stringify({ message, filePath, fileId }),
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//   };
  
//   try {
//     const response = await fetch(
//       "https://ai-image-production.up.railway.app/openai",
//       // "http://localhost:8000/openai", //for local testing
//       options
//     );
    
//     // Handle streaming response
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let fullResponse = '';
    
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
      
//       const text = decoder.decode(value);
//       const lines = text.split('\n\n');
      
//       for (const line of lines) {
//         if (line.startsWith('data:')) {
//           const data = line.replace('data:', '').trim();
          
//           if (data === '[DONE]') {
//             break;
//           }
          
//           try {
//             const parsedData = JSON.parse(data);
//             if (parsedData.content) {
//               fullResponse += parsedData.content;
//               // Call the callback with the new chunk
//               onChunk(parsedData.content);
//             }
//           } catch (e) {
//             console.error('Error parsing SSE data:', e);
//           }
//         }
//       }
//     }
    
//     return fullResponse;
//   } catch (error) {
//     console.error('Streaming error:', error);
//     throw error;
//   }
// };

// // New function to clear conversation history
// export const clearConversationApi = async () => {
//   const options = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//   };
  
//   const response = await fetch(
//     "https://ai-image-production.up.railway.app/clear-conversation",
//     // "http://localhost:8000/clear-conversation", //for local testing
//     options
//   );
  
//   return response.json();
// };