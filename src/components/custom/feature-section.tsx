import { Clock, Check, Cloud } from "lucide-react"
interface FeatureProps {
    id: number
    heading: string
    subHeading: string
    icon: string
}
interface FeatureSectionProps {
    id: number
    __component: string
    title: string
    description: string
    feature: FeatureProps[]
}

const getIcon = (name: string) => {
    switch (name) {
        case "CLOCK_ICON":
            return Clock
        case "CHECK_ICON":
            return Check
        case "CLOUD_ICON":
            return Cloud
        default:
            return Clock
    }
}
function FeatureSection({ data }: { readonly data: FeatureSectionProps }) {
    const { feature } = data
    //console.dir(feature, { depth: null })

    return (
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
            <ul className="grid gap-8 md:grid-cols-3">
                {data.feature.map((feature) => {
                    const Icon = getIcon(feature.icon)
                    return (
                        <li
                            className="flex flex-col items-center text-center"
                            key={feature.id}
                        >
                            <Icon className="w-12 h-12 mb-4 text-gray-900" />
                            <h2 className="mb-4 text-2xl font-bold">
                                {feature.heading}
                            </h2>
                            <p className="text-gray-500">
                                {feature.subHeading}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
export default FeatureSection
