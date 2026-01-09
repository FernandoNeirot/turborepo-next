import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { getAdminFirestore } from '../../shared/configs/firebase-admin';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});
const systemPrompt = `
  Responde ÚNICAMENTE con un objeto JSON con esta estructura:
  {
    "summary": "string",
    "flashcards": [{ "question": "string", "answer": "string" }],
    "quiz": [{ "question": "string", "options": ["string"], "correctIndex": number }]
  }
`;
export async function POST(req: Request) {
    try {
        const { text, difficulty } = await req.json();

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-nano",
            messages: [
                {
                    role: "system",
                    content: `Eres un experto en pedagogía.
                            Tu tarea es analizar el texto del usuario y
                            devolver un objeto JSON estrictamente estructurado para crear material de estudio.
                            Nivel de dificultad: ${difficulty}.`
                },
                {
                    role: "user",
                    content: `${systemPrompt}.Analiza este texto y genera: 1 resumen corto, 3 flashcards y 2 preguntas de opción múltiple: "${text}"`
                }
            ],
            response_format: { type: "json_object" },
        });

        const content = response?.choices?.[0]?.message?.content ?? "{}";

        const db = getAdminFirestore();
        const body = { text, difficulty, response: JSON.parse(content) };
        // await db.collection("consultas-open-ai").add(body);
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const id = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}_${Math.floor(Math.random() * 10)}`;
        await db.collection("consultas-open-ai").doc(id).set(body);

        return NextResponse.json(JSON.parse(content));

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}
