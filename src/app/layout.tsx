import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { getGlobalData, getGlobalMetaData } from "@/services/strapi"
import Header from "@/components/custom/header"
import Footer from "@/components/custom/footer"
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getGlobalMetaData()

    return {
        title: metadata?.data?.title ?? "Next.js and Strapi course",
        description: metadata?.data?.description ?? "Next.js and Strapi course",
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const globalData = await getGlobalData()
    const { data } = globalData
    const { header, footer } = data
    //console.dir(globalMetaData, { depth: null })
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Toaster position="bottom-center" />
                <Header data={header} />

                {children}
                <Footer data={footer} />
            </body>
        </html>
    )
}
