import { useState, useEffect } from "react";
import { processCaptionLanguageChange } from "../utils/aiHelpers";

const TranslatorDemo = () => {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      if (inputText) {
        const result = await processCaptionLanguageChange(
          inputText,
          targetLanguage
        );
        setTranslatedText(result);
      }
    };

    const debounceTimer = setTimeout(translateText, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputText, targetLanguage]);

  return (
    <div className="translator-container">
      <h2>Live Caption Translator</h2>
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />

      <div className="translated-text">
        {translatedText || "Translation will appear here..."}
      </div>
    </div>
  );
};

export default TranslatorDemo;
