import { SummaryCardForm } from "@/components/custom/forms/summary-card-form"
import { getSummaryById } from "@/services/strapi"

type Params = Promise<{ videoId: string }>

export default async function SummaryCardRoute(props: { params: Params }) {
    const { videoId } = await props.params
    const data = await getSummaryById(videoId)
    return <SummaryCardForm item={data.data} />
}
