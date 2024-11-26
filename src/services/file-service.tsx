import { getAuthToken } from "./auth/get-token"
import { getStrapiURL } from "@/lib/utils"
import { mutateData } from "./mutate-data"

export async function fileDeleteService(imageId: string) {
    const authToken = await getAuthToken()
    if (!authToken) return { ok: false, data: null, error: null }
    const data = await mutateData("DELETE", `/api/upload/files/${imageId}`)
    return data
}

export async function fileUploadService(image: any) {
    const authToken = await getAuthToken()
    if (!authToken) throw new Error("No Auth Token Found")
    const baseUrl = getStrapiURL()
    const url = new URL("/api/upload", baseUrl)
    const formData = new FormData()
    formData.append("files", image, image.name)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData,
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("File Upload Error:", error)
        throw error
    }
}
//
