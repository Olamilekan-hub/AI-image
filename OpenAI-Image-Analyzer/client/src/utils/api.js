export const uploadImageApi = async (formData) => {
  const options = {
    method: "POST",
    body: formData,
    credentials: "include",
  };
  const response = await fetch(
    // "https://ai-image-production.up.railway.app/upload",
    "http://localhost:8000/upload", //for local testing
    options
  );
  return response.json();
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
      // "https://ai-image-production.up.railway.app/openai",
      "http://localhost:8000/openai", // for local testing
      options
    );
    
    // Check if the response is a stream
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      
      // Process the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const eventData = line.slice(5).trim();
            
            if (eventData === '[DONE]') {
              break;
            }
            
            try {
              const { content } = JSON.parse(eventData);
              if (content) {
                result += content;
                // Call the callback with the current chunk
                onChunk(result);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
      
      return result;
    } else {
      // Fallback to non-streaming response
      const text = await response.text();
      onChunk(text);
      return text;
    }
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
};