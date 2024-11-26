import qs from "qs"
import { getStrapiURL } from "@/lib/utils"

const BASE_URL = getStrapiURL()
const homePageQuery = qs.stringify({
    populate: {
        block: {
            on: {
                "layout.hero-section": {
                    populate: {
                        image: {
                            fields: ["url", "alternativeText"],
                        },
                        link: {
                            populate: true,
                        },
                    },
                },
                "layout.feature-section": {
                    populate: {
                        feature: {
                            populate: true,
                        },
                    },
                },
            },
        },
    },
})

const globalQuery = qs.stringify({
    populate: [
        "header.logoText",
        "header.ctaButton",
        "footer.logoText",
        "footer.socialLink",
    ],
})

export const Query = async (query: string) => {
    const res = await fetch(`${BASE_URL}/api/${query}`)
    const data = await res.json()
    return data
}

export async function getStrapiData(path: string) {
    const url = new URL(path, BASE_URL)
    url.search = homePageQuery
    try {
        const res = await fetch(url.href)
        const data = await res.json()
        //console.dir(data, { depth: null })
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

async function fetchData(ulr: string) {
    const TOKEN = null
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
        },
    }

    const res = await fetch(ulr, TOKEN ? headers : {})

    try {
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getHomePageData() {
    //throw new Error("Test error")
    const url = new URL("/api/home-page", BASE_URL)
    url.search = homePageQuery
    return await fetchData(url.href)
}

export async function getGlobalData() {
    const url = new URL("/api/global", BASE_URL)
    url.search = globalQuery
    return await fetchData(url.href)
}
export async function getGlobalMetaData() {
    const url = new URL("/api/global", BASE_URL)
    const metadataQuery = qs.stringify({
        fields: ["title", "description"],
    })
    url.search = metadataQuery
    return await fetchData(url.href)
}
