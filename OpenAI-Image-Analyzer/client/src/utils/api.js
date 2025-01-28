export const uploadImageApi = async (formData) => {
  const options = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(
    "https://ai-image-production.up.railway.app/upload",
    options
  );
  return response.json();
};

export const analyzeImageApi = async (message, filePath) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ message, filePath }),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "https://ai-image-production.up.railway.app/openai",
    options
  );
  return response.text();
};