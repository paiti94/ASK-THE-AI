// src/app/api/openai/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
    // Parse the request body to extract the query property
    const requestBody = await request.json();
    const query = requestBody.query;

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "gpt-3.5-turbo",
      });

      return NextResponse.json({response : completion.choices[0].message.content});
  }  