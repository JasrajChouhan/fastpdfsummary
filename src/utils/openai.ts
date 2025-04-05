import OpenAI from 'openai';
import { vinamaPrompt } from './prompt';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePDFSummaryFromOpenAI = async (pdfText: string) => {
  if (!pdfText) {
    throw new Error('PDF text is required');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'developer', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: ` ${vinamaPrompt}\n\nHere is the extracted PDF content:\n\n${pdfText} `,
        },
      ],
      model: 'gpt-4o',
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log(completion.choices[0]);

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    throw error;
  }
};
