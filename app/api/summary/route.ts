import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  let language: "english" | "hindi" = "english";

  try {
    const body = await req.json();
    const content = body.content;
    language = body.language || "english";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      language === "hindi"
        ? `
        निम्नलिखित ब्लॉग कंटेंट को 4-5 लाइनों में सारांशित करें।
        इसे सरल और स्पष्ट रखें। सारांश केवल हिंदी में प्रदान करें।
        मुख्य बिंदुओं को शामिल करें और जानकारीपूर्ण बनाएं।
        
        कंटेंट:
        ${content}
      `
        : `
        Summarize the following blog content in 4-5 lines. 
        Keep it simple and clear. Provide summary in English only.
        Focus on the main points and make it informative.
        
        Content:
        ${content}
      `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return NextResponse.json({
      summary: summary.trim(),
      language,
    });
  } catch (error) {
    console.error("Summary API Error:", error);
    return NextResponse.json(
      {
        error:
          language === "hindi"
            ? "सारांश जेनरेट करने में असफल"
            : "Failed to generate summary",
      },
      { status: 500 }
    );
  }
}
