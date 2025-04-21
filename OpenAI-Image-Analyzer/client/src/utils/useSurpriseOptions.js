//useSurpriseOptions.js
import { useState } from "react";

const useSurpriseOptions = () => {
  const [value, setValue] = useState("");

  const surpriseOptions = [
    "What is the main object in the image?",
    "What are the color used in the image?",
    "Generate the text in the image?",
    "What is the image about?",
    "What is the image trying to convey?",
    "What is the mood of the image?",
  ];

  const surprise = () => {
    const randomPrompt =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomPrompt);
  };

  return { value, setValue, surprise };
};

export default useSurpriseOptions;
