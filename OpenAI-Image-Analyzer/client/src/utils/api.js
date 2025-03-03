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

export const analyzeImageApi = async (message, filePath, fileId) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ message, filePath, fileId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  const response = await fetch(
    // "https://ai-image-production.up.railway.app/openai",
    "http://localhost:8000/openai", //for local testing
    options
  );
  return response.text();
};