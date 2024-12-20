import qs from "qs"
import { getStrapiURL } from "@/lib/utils"
import { getAuthToken } from "./auth/get-token"

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

export async function fetchData(ulr: string) {
    const authToken = await getAuthToken()
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
        },
    }

    const res = await fetch(ulr, authToken ? headers : {})

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

export async function getSummaries(queryString: string, currentPage: number) {
    const PAGE_SIZE = 4

    const query = qs.stringify({
        sort: ["createdAt:desc"],
        filters: {
            $or: [
                { title: { $containsi: queryString } },
                { summary: { $containsi: queryString } },
            ],
        },
        pagination: {
            pageSize: PAGE_SIZE,
            page: currentPage,
        },
    })
    const url = new URL("/api/summaries", BASE_URL)
    url.search = query
    return fetchData(url.href)
}
export async function getSummaryById(summaryId: string) {
    const url = new URL(`/api/summaries/${summaryId}`, BASE_URL)
    return fetchData(url.href)
}
