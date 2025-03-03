export const uploadImageApi = async (formData) => {
  const options = {
    method: "POST",
    body: formData,
    credentials: "include",
  };
  const response = await fetch(
    "https://ai-image-production.up.railway.app/upload",
    // "http://localhost:8000/upload", //for local testing
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
      "https://ai-image-production.up.railway.app/openai",
      // "http://localhost:8000/openai", //for local testing
      options
    );
    
    // Handle streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const text = decoder.decode(value);
      const lines = text.split('\n\n');
      
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.replace('data:', '').trim();
          
          if (data === '[DONE]') {
            break;
          }
          
          try {
            const parsedData = JSON.parse(data);
            if (parsedData.content) {
              fullResponse += parsedData.content;
              // Call the callback with the new chunk and the full response so far
              onChunk(parsedData.content, fullResponse);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
    
    return fullResponse;
  } catch (error) {
    console.error('Streaming error:', error);
    throw error;
  }
};