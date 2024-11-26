import { ProfileForm } from "@/components/custom/forms/profile-form"
import { ProfileImageForm } from "@/components/custom/forms/profile-image-form"
import { getUserMeLoader } from "@/services/auth/gete-user-me-loader"
// import { ProfileForm } from "@/components/forms/profile-form";
// import { ProfileImageForm } from "@/components/forms/profile-image-form";

export default async function AccountRoute() {
    const user = await getUserMeLoader()
    const userData = user.data
    //console.log(userData)
    const userImage = userData?.image
    //console.log(userImage, "userImage")

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
            <ProfileForm data={userData} className="col-span-3" />
            <ProfileImageForm data={userImage} className="col-span-2" />
        </div>
    )
}
