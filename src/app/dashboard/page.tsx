import { LogoutButton } from "@/components/custom/forms/logout-button"
import { PaginationComponent } from "@/components/custom/pagination-component";
export default function DashboardRoute() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1>Dashboard</h1>
            <LogoutButton />
        </div>
    )
}
