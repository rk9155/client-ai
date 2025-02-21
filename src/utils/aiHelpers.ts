// @ts-ignore
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
  // @ts-ignore
  const canTranslate = await ai?.translator?.capabilities();
  let translator: any;
  if (canTranslate !== "no") {
    if (canTranslate === "readily") {
      // @ts-ignore
      translator = await translation.createTranslator({
        sourceLanguage: "en",
        targetLanguage: target,
      });
    }
  }
  // @ts-ignore
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

export const generateChatContent = async (
  prompt: string,
  onChunk: (chunk: string) => void
): Promise<string> => {
  // @ts-expect-error
  const writer = await ai.languageModel.create({
    systemPrompt:
      "You are a helpful assistant that can answer questions and help with tasks, and you are also a software engineer with expertise in reactjs, typescript, and tailwindcss",
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

/**
 * Marvel: Rise of the Forgotten

Four childhood friends—Jake, Mia, Rohan, and Alex—lived ordinary lives in New York until one fateful night. During a meteor shower, they stumbled upon a crashed Kree pod hidden in Central Park. Inside, a glowing core pulsed with energy. The moment they touched it, their DNA was rewritten.

Jake gained super strength and resilience, Mia controlled light and shadows, Rohan could manipulate time in short bursts, and Alex developed technopathic abilities. Calling themselves The Forgotten, they vowed to use their powers for good.

Their first mission? Stopping a rogue AIM scientist, Dr. Vex, who was experimenting on kidnapped mutants. As they infiltrated his underground lab, they faced his cybernetic enforcers. Mia blinded the guards with a flash of pure light, Rohan slowed time, allowing Jake to smash through barriers, and Alex disabled the security with a mere thought.

But Dr. Vex had a secret—he had harnessed stolen Stark tech. A colossal mech emerged, nearly crushing them. In a desperate move, they combined their powers, creating a surge of energy that short-circuited the machine.

As the dust settled, SHIELD arrived. Nick Fury stepped forward. “Looks like we’ve got some new recruits.”

The Forgotten had just begun their journey.
 */
