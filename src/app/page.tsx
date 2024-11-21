import { HeroSection } from "@/components/custom/hero-section"
import { Button } from "@/components/ui/button"
import { getStrapiData } from "@/services/strapi"

export default async function Home() {
    const { data } = await getStrapiData("/api/home-page")
    const { title, description, block } = data
    const randomNumber = Math.floor(Math.random() * 100)
    return (
        <main className="">
            <h1>{title}</h1>
            <p>{description}</p>
            <Button>-</Button>
            <span>{randomNumber}</span>
            <HeroSection data={block[0]} />
        </main>
    )
}
