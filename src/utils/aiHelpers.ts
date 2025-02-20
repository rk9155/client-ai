export const processSummary = async (
  content: string,
  onChunk: (chunk: string) => void
): Promise<any> => {
  // @ts-expect-error
  const canSummarize = await ai.languageModel.capabilities();
  let summarizer: any;
  if (canSummarize.available === "readily") {
    // @ts-expect-error
    summarizer = await ai.languageModel.create({
      systemPrompt: "This article is intended for a tech-savvy audience.",
    });

    try {
      const stream = await summarizer.promptStreaming(content);
      let result = "";
      let previousChunk = "";

      for await (const chunk of stream) {
        const newChunk = chunk.startsWith(previousChunk)
          ? chunk.slice(previousChunk.length)
          : chunk;
        result += newChunk;
        onChunk(result); // Send current state to UI
        previousChunk = chunk;
      }

      summarizer.destroy();
      return result;
    } catch (error) {
      console.error("Error in streaming:", error);
      summarizer.destroy();
      return "";
    }
  }
  return "";
};

export const processCaptionLanguageChange = async (
  text: string,
  target: string
): Promise<string> => {
  // @ts-expect-error
  const canTranslate = await ai?.translator?.capabilities();
  let translator: any;
  if (canTranslate !== "no") {
    if (canTranslate === "readily") {
      // @ts-expect-error
      translator = await translation.createTranslator({
        sourceLanguage: "en",
        targetLanguage: target,
      });
    }
  }
  // @ts-expect-error
  translator = await translation.createTranslator({
    sourceLanguage: "en",
    targetLanguage: target,
  });

  return await translator.translate(text);
};

export const detectLanguage = async (text: string): Promise<any> => {
  const languageDetectorCapabilities =
    // @ts-expect-error
    await ai.languageDetector.capabilities();
  const canDetect = languageDetectorCapabilities.capabilities;
  let detector;
  if (canDetect === "no") {
    console.log("The language detector isn't usable.");
  }
  if (canDetect === "readily") {
    // @ts-expect-error
    detector = await ai.languageDetector.create();
  } else {
    // @ts-expect-error
    detector = await ai.languageDetector.create({
      monitor(m: any) {
        m.addEventListener("downloadprogress", (e: any) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    await detector.ready;
    const results = await detector.detect(text);
    for (const result of results) {
      console.log(result.detectedLanguage, result.confidence);
    }
  }
};

export const generateEmailContent = async (
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<string> => {
  // @ts-expect-error
  const writer = await ai.languageModel.create({
    systemPrompt:
      "You are an email writing assistant. Generate professional emails based on the given prompt.",
  });
  const stream = await writer.promptStreaming(prompt);
  let result = "";
  for await (const chunk of stream) {
    result += chunk;
    onChunk(result);
  }
  writer.destroy();
  return result;
};
