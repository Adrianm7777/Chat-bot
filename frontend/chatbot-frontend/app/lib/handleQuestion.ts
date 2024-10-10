export const handleQuestion = async (question: string) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/chatbot/ask/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error connecting to chatbot API:", error);
    return { error: "Something went wrong" };
  }
};
