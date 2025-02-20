import { useState } from "react";
import { generateEmailContent } from "../utils/aiHelpers";

const EmailWriter = () => {
  const [prompt, setPrompt] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (prompt.trim()) {
      setIsGenerating(true);
      try {
        await generateEmailContent(prompt, (chunk) => {
          setEmailContent(formatEmailContent(chunk));
          setIsGenerating(false);
        });
      } catch (error) {
        console.error("Error generating email:", error);
        setIsGenerating(false);
      }
    }
  };

  const formatEmailContent = (content: string) => {
    // Split the content by common email parts
    const parts = content.split(/##|Dear/);
    if (parts.length > 1) {
      const subject = parts[1].trim();
      const body = parts[2] ? `Dear${parts[2]}` : "";

      return `
        <div class="email-format">
          <div class="email-subject">
            <strong>Subject:</strong> ${subject}
          </div>
          <div class="email-body">
            ${body
              .split("\n")
              .map((line) => `<p>${line.trim()}</p>`)
              .join("")}
          </div>
        </div>
      `;
    }
    return content;
  };

  return (
    <div className="email-writer-container">
      <h2>Email Writer</h2>
      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what kind of email you want to generate..."
          className="input-textarea"
        />
        <button
          onClick={handleGenerate}
          className="generate-button"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Email"}
        </button>
      </div>
      {emailContent && (
        <div className="email-preview">
          <h3>Generated Email:</h3>
          <div
            className="email-content"
            dangerouslySetInnerHTML={{ __html: emailContent }}
          />
        </div>
      )}
    </div>
  );
};

export default EmailWriter;
