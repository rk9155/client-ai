import { useState } from "react";
import "./App.css";
import TranslatorDemo from "./components/TranslatorDemo";
import LanguageDetector from "./components/LanguageDetector";
import ChatBot from "./components/ChatBot";
import EmailWriter from "./components/EmailWriter";
import StorySummarizer from "./components/StorySummarizer";

function App() {
  const [activeTab, setActiveTab] = useState("translator");

  return (
    <div className="app-container">
      <h1>Client-Side AI Demo</h1>

      <div className="tab-buttons">
        <button
          className={activeTab === "translator" ? "active" : ""}
          onClick={() => setActiveTab("translator")}
        >
          Live Caption Translator
        </button>
        <button
          className={activeTab === "detector" ? "active" : ""}
          onClick={() => setActiveTab("detector")}
        >
          Language Detector
        </button>
        <button
          className={activeTab === "summarizer" ? "active" : ""}
          onClick={() => setActiveTab("summarizer")}
        >
          Story Summarizer
        </button>
        <button
          className={activeTab === "email" ? "active" : ""}
          onClick={() => setActiveTab("email")}
        >
          Email Writer
        </button>
        <button
          className={activeTab === "chatbot" ? "active" : ""}
          onClick={() => setActiveTab("chatbot")}
        >
          ChatBot
        </button>
      </div>

      <div className="content-container">
        {activeTab === "translator" && <TranslatorDemo />}
        {activeTab === "detector" && <LanguageDetector />}
        {activeTab === "summarizer" && <StorySummarizer />}
        {activeTab === "email" && <EmailWriter />}
        {activeTab === "chatbot" && <ChatBot />}
      </div>
    </div>
  );
}

export default App;
