import qs from "qs"

const BASE_URL = "http://localhost:1337"
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
            },
        },
    },
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
