import { useState } from "react";
import { detectLanguage } from "../utils/aiHelpers";

const LanguageDetector = () => {
  const [inputText, setInputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");

  const handleDetection = async () => {
    if (inputText.trim()) {
      const result = await detectLanguage(inputText);
      setDetectedLanguage(result);
    }
  };

  return (
    <div className="language-detector-container">
      <h2>Language Detector</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to detect language..."
        className="input-textarea"
      />
      <button onClick={handleDetection} className="detect-button">
        Detect Language
      </button>
      {detectedLanguage && (
        <div className="result-container">
          Detected Language: <strong>{detectedLanguage}</strong>
        </div>
      )}
    </div>
  );
};

export default LanguageDetector;
