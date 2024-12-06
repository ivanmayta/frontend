import { SummaryCardForm } from "@/components/custom/forms/summary-card-form"
import { getSummaryById } from "@/services/strapi"

interface ParamsProps {
    params: {
        videoId: string
    }
}

export default async function SummaryCardRoute(props: Readonly<ParamsProps>) {
    const params = await props?.params
    const { videoId } = params
    const data = await getSummaryById(videoId)
    return <SummaryCardForm item={data.data} />
}
