import { GoogleGenAI } from '@google/genai';

import { vinamaPrompt } from './prompt';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generatePDFSummaryFromGemini = async (pdfText: string) => {
  if (!pdfText) {
    throw new Error('PDF text is require for gemini');
  }

  const prompt = `${vinamaPrompt}\n\nHere is the extracted PDF content:\n\n${pdfText}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    console.log(response.text);

    return response.text;
  } catch (error) {
    console.log('Gemini Api error : ', error);
    throw new Error('Gemini Api error');
  }
};
