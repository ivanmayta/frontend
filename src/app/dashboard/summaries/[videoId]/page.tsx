import { SummaryCardForm } from "@/components/custom/forms/summary-card-form"
import { fetchData, getSummaryById } from "@/services/strapi"
import { getStrapiURL } from "@/lib/utils"

type Params = Promise<{ videoId: string }>

export default async function SummaryCardRoute(props: { params: Params }) {
    const { videoId } = await props?.params

    //const data = await getSummaryById(videoId)
    return (
        <>
            {/**<SummaryCardForm item={data.data} />**/}
            <div>aqui estoy</div>
        </>
    )
}

// async function getSummaryById(summaryId: string) {
//     const BASE_URL = getStrapiURL()
//     return fetchData(`${BASE_URL}/api/summaries/${summaryId}`)
// }
