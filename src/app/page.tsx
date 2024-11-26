import FeatureSection from "@/components/custom/feature-section"
import HeroSection from "@/components/custom/hero-section"
import { getHomePageData } from "@/services/strapi"

export default async function Home() {
    const strapiData = await getHomePageData()
    // 3s de delay
    //await new Promise((resolve) => setTimeout(resolve, 3000))
    //console.dir(globalData, { depth: null })
    const { block } = strapiData?.data || []

    return (
        <main className="">
            {block.map(blockRenderer)}
            {/* <HeroSection data={block[0]} />
            <FeatureSection data={block[1]} /> */}
        </main>
    )
}
const blockComponents = {
    "layout.hero-section": HeroSection,
    "layout.feature-section": FeatureSection,
}

const blockRenderer = (block: any) => {
    const Component =
        blockComponents[block.__component as keyof typeof blockComponents]
    return Component ? <Component key={block.id} data={block} /> : null
}
