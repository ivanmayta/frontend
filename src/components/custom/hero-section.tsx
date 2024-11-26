import Link from "next/link"
import StrapiImage from "./strapi-image"
import { getUserMeLoader } from "@/services/auth/gete-user-me-loader"

interface ImageProps {
    id: number
    documentId: string
    url: string
    alternativeText: string | null
}
interface LinkProps {
    id: number
    text: string
    url: string
    isExternal: boolean
}
interface HeroSectionProps {
    id: number
    __component: string
    heading: string
    subHeading: string
    image: ImageProps
    link: LinkProps
}

async function HeroSection({ data }: { readonly data: HeroSectionProps }) {
    const { heading, subHeading, link, image } = data
    const user = await getUserMeLoader()
    const isLogged = user?.ok
    const linkUrl = isLogged ? "/dashboard" : link.url
    return (
        <header className="relative h-[600px] overflow-hidden">
            <StrapiImage
                src={image.url}
                alt="Background"
                height={1080}
                width={1920}
                className="absolute inset-0 object-cover w-full h-full aspect/16:9"
            />
            {/* 
            <img
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full"
                height={1080}
                src={`${STRAPI_URL}${image.url}`}
                style={{
                    aspectRatio: "1920/1080",
                    objectFit: "cover",
                }}
                width={1920}
            />  
            */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                    {heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                    {subHeading}
                </p>

                <Link
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
                    href={linkUrl}
                >
                    {isLogged ? "Dashboard" : link.text}
                </Link>
            </div>
        </header>
    )
}
export default HeroSection
