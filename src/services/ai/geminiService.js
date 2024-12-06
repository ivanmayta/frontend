import { GoogleGenerativeAI } from "@google/generative-ai"
export const generateGeminiSummary = async (content, template) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Combine the template and content into a single prompt
    const prompt = `
  ${template}
  
  **text:** ${content}
    `

    try {
        const response = await model.generateContent(prompt)
        //console.dir(response, { depth: null })
        //console.log(response.response.text())
        const summary = response.response.text()
        return summary
    } catch (error) {
        console.error("Error generating summary:", error)
        return "Failed to generate summary"
    }
}
