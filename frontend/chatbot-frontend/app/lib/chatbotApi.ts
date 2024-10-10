import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { question } = req.body;

    try {
      const chatbotResponse = await fetch(
        "http://127.0.0.1:8000/api/chatbot/ask/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await chatbotResponse.json();
      return res.status(200).json({ response: data.response });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return res
        .status(500)
        .json({ response: "Error fetching chatbot response" });
    }
  }

  return res.status(405).json({ response: "Method Not Allowed" });
}
