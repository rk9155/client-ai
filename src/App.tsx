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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "20px",
          }}
        >
          {activeTab === "translator" && (
            <img
              src="../src/assets/translator.png"
              alt="Translator"
              style={{ width: "300px", height: "auto" }}
            />
          )}
          {activeTab === "summarizer" && (
            <img
              src="../src/assets/summarizer.png"
              alt="Summarizer"
              style={{ width: "300px", height: "auto" }}
            />
          )}
          {activeTab === "email" && (
            <img
              src="../src/assets/email.png"
              alt="Email"
              style={{ width: "300px", height: "auto" }}
            />
          )}
          {activeTab === "chatbot" && (
            <img
              src="../src/assets/chat.png"
              alt="Chatbot"
              style={{ width: "300px", height: "auto" }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <p>
          Made with ❤️ by <a href="https://github.com/rk9155">Rakesh Kumar</a>
        </p>
      </div>
    </>
  );
}

export default App;
