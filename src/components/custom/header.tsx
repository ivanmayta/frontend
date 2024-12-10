import Link from "next/link"
import { Button } from "../ui/button"
import { Logo } from "./logo"
import { getUserMeLoader } from "@/services/auth/gete-user-me-loader"
import { LogoutButton } from "./forms/logout-button"
import { SummaryForm } from "./forms/summary-form"

interface HeaderProps {
    id: number
    ctaButton: {
        id: number
        text: string
        url: string
        isExternal: boolean
    }
    logoText: {
        id: number
        url: string
        text: string
        isExternal: boolean
    }
}
async function Header({ data }: { readonly data: HeaderProps }) {
    const { ctaButton, logoText } = data
    const user = await getUserMeLoader()
    //console.log(user)
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm dark:bg-background">
            <Logo text={logoText.text} />
            {user.ok && <SummaryForm />}
            <div className=" flex items-center gap-4">
                {user.ok ? (
                    <LoggedUser user={user.data} />
                ) : (
                    <Link href={ctaButton.url}>
                        <Button>{ctaButton.text}</Button>
                    </Link>
                )}
            </div>
        </header>
    )
}
export default Header
interface UserProps {
    username: string
    email: string
}
export function LoggedUser({ user }: { readonly user: UserProps }) {
    return (
        <div className="flex gap-2">
            <Link
                href="/dashboard"
                className="font-semibold hover:text-primary"
            >
                {user.username}
            </Link>
            <LogoutButton />
        </div>
    )
}
