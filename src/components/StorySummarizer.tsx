import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { processSummary } from "../utils/aiHelpers";

interface SummarySettings {
  type: "Key Points" | "Paragraph" | "Bullets";
  length: "Short" | "Medium" | "Long";
  format: "Plain Text" | "Markdown" | "HTML";
}

const StorySummarizer = () => {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [settings, setSettings] = useState<SummarySettings>({
    type: "Key Points",
    length: "Short",
    format: "Markdown",
  });

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPrompt(text);
    setCharCount(text.length);
  };

  const handleSummarize = async () => {
    if (prompt.trim()) {
      setIsLoading(true);
      setSummary("");
      try {
        await processSummary(prompt, (chunk) => {
          setSummary(chunk);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error summarizing:", error);
      }
    }
  };

  const renderSummaryContent = () => {
    if (!summary) {
      return <div className="placeholder">Summary will appear here...</div>;
    }

    switch (settings.format) {
      case "Markdown":
        return (
          <div className="markdown-content">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        );
      case "HTML":
        return (
          <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        );
      default:
        return <div className="plain-text">{summary}</div>;
    }
  };

  return (
    <div className="summarizer-container">
      <h1>Summarization API Playground</h1>

      <div className="prompt-section">
        <label>Prompt</label>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter text to summarize..."
          className="input-textarea"
        />
        <div className="char-count">Character Count: {charCount}</div>
      </div>

      <div className="settings-section">
        <h3>Settings</h3>
        <div className="settings-grid">
          <div className="setting-item">
            <label>Summary Type:</label>
            <select
              value={settings.type}
              onChange={(e) =>
                setSettings({ ...settings, type: e.target.value as any })
              }
            >
              <option>Key Points</option>
              <option>Paragraph</option>
              <option>Bullets</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Length:</label>
            <select
              value={settings.length}
              onChange={(e) =>
                setSettings({ ...settings, length: e.target.value as any })
              }
            >
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Format:</label>
            <select
              value={settings.format}
              onChange={(e) =>
                setSettings({ ...settings, format: e.target.value as any })
              }
            >
              <option>Markdown</option>
              <option>Plain Text</option>
              <option>HTML</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSummarize}
        className="summarize-button"
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>

      <div className="summary-section">
        <h3>Summary</h3>
        {renderSummaryContent()}
      </div>
    </div>
  );
};

export default StorySummarizer;
