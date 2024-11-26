import { getAuthToken } from "./auth/get-token"
import { getStrapiURL } from "@/lib/utils"
export async function mutateData(method: string, path: string, payload?: any) {
    const authToken = await getAuthToken()
    const baseUrl = getStrapiURL()
    const url = new URL(path, baseUrl)

    if (!authToken) throw new Error("No token found")

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ ...payload }),
        })
        if (method === "DELETE") {
            return response.ok
        }
        const data = await response?.json()
        return data
    } catch (error) {
        console.error("Mutate Data Error:", error)
        throw error
    }
}
