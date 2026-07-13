require("dotenv").config();

async function generateInsights(report) {

    const prompt = `
You are an AI crime analyst.

Analyze this citizen complaint.

Title: ${report.title}

Category: ${report.category}

Location: ${report.location}

Priority: ${report.priority}

Description:
${report.description}

Return ONLY in this format.

Summary:
Risk Level:
Recommended Action:
`;

    const MODEL = "gemini-2.0-flash";

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
        throw new Error(data.error?.message || "Gemini API Error");
    }

    return data.candidates[0].content.parts[0].text;
}

module.exports = generateInsights;