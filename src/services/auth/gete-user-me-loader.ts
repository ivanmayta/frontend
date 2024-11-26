import qs from "qs"
import { getStrapiURL } from "@/lib/utils"
import { getAuthToken } from "./get-token"

export async function getUserMeLoader() {
    const query = qs.stringify({
        populate: {
            image: {
                fields: ["url", "alternativeText"],
            },
        },
    })

    const BASE_URL = getStrapiURL()
    const url = new URL("/api/users/me", BASE_URL)
    url.search = query
    const authToken = await getAuthToken()
    if (!authToken) return { ok: false, data: null, error: null }

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: {
                contentType: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })

        const data = await response.json()
        if (data.error) {
            return { ok: false, data: null, error: data.error }
        }
        //console.log(data)
        return { ok: true, data: data, error: null }
    } catch (error) {
        console.error("Get User Me Loader Error:", error)
        return { ok: false, data: null, error: error }
    }
}
