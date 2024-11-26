"use server"
import zod from "zod"
import { mutateData } from "../mutate-data"
import qs from "qs"
import { StrapiErrors } from "@/components/custom/forms/strapi-errors"
import { revalidatePath } from "next/cache"
import { getUserMeLoader } from "../auth/gete-user-me-loader"
import { fileDeleteService, fileUploadService } from "../file-service"
import { ZodError } from "@/components/custom/forms/zod-error"

export async function updateProfileAction(
    userId: string,
    prevState: any,
    formData: FormData
) {
    // /api/users/:id    , PUT
    // const userUpdateSchema = zod.object({
    //     firstName: zod.string().min(3).max(20, {
    //         message: "First Name must be between 3 and 20 characters",
    //     }),
    //     lastName: zod.string().min(3).max(20, {
    //         message: "Last Name must be between 3 and 20 characters",
    //     }),
    //     bio: zod.string().min(10).max(500, {
    //         message: "Bio must be between 10 and 500 characters",
    //     }),
    // })

    // const validatedFields = userUpdateSchema.safeParse({
    //     firstName: formData.get("firstName"),
    //     lastName: formData.get("lastName"),
    //     bio: formData.get("bio"),
    // })
    const rawFormData = Object.fromEntries(formData)
    const payload = {
        firstName: rawFormData.firstName,
        lastName: rawFormData.lastName,
        bio: rawFormData.bio,
    }

    // if (!validatedFields.success) {
    //     return {
    //         ...prevState,
    //         zodErrors: validatedFields.error.flatten().fieldErrors,
    //         message: "Missing Fields. Failed to Update.",
    //     }
    // }
    //mutateData("PUT", `/api/users/${prevState.data.id}`, validatedFields.data)

    const query = qs.stringify({
        populate: "*",
    })
    const responseData = await mutateData(
        "PUT",
        `/api/users/${userId}?${query}`,
        payload
    )

    if (!responseData) {
        return {
            ...prevState,
            StrapiErrors: responseData.error,
            message: "Ops! Something went wrong. Please try again.",
        }
    }
    if (responseData.error) {
        return {
            ...prevState,
            StrapiErrors: responseData.error,
            message: "Failed to Update Profile.",
        }
    }

    revalidatePath("/dashboard/account")
    // console.log("#############")
    // console.log(responseData)
    // console.log("#############")
    return {
        ...prevState,
        message: "Profile Updated",
        data: responseData,
        StrapiErrors: null,
    }
}

const MAX_FILE_SIZE = 5000000 // 5MB
const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
]

const imageSchema = zod.object({
    image: zod
        .any()
        .refine((file) => {
            if (file.size === 0 || file.name === undefined) return false
            else return true
        }, "Please update or add new image.")

        .refine(
            (file) => ALLOWED_FILE_TYPES.includes(file?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
})

export async function uploadProfileImageAction(
    imageId: string,
    prevState: any,
    formData: FormData
) {
    // GET THE LOGGET IN USER
    const user = await getUserMeLoader()

    if (!user.ok) {
        throw new Error("you are not authorized to perform this action")
    }
    const userId = user.data.id
    //CONVERT FORM DATA TO OBJECT
    const rawFormData = Object.fromEntries(formData)
    //VALIDATE THE IMAGE
    const validatedFields = imageSchema.safeParse({
        image: rawFormData.image,
    })
    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            StrapiErrors: null,
            data: null,
            message: "Invalid Image. Failed to Update.",
        }
    }
    //DELETE PREVIUS IMAGE IF EXISTS
    if (imageId) {
        try {
            await fileDeleteService(imageId)
        } catch (error) {
            return {
                ...prevState,
                StrapiErrors: null,
                ZodError: null,
                message: "Failed to Delete Previous Image",
            }
        }
    }
    //UPLOAD NEW IMAGE TO MEDIA LIBRARY
    const fileUploadResponse = await fileUploadService(rawFormData.image)
    if (!fileUploadResponse) {
        return {
            ...prevState,
            StrapiErrors: null,
            ZodError: null,
            message: "Ups. Something went wrong. Please try again.",
        }
    }
    if (fileUploadResponse.error) {
        return {
            ...prevState,
            StrapiErrors: fileUploadResponse.error,
            ZodError: null,
            message: "Failed to Upload Image",
        }
    }
    //console.log(fileUploadResponse)
    const updatedImageId = fileUploadResponse[0].id
    const payload = { image: updatedImageId }
    //UPDATE USER PROFILE WITH NEW IMAGE
    const updateImageResponse = await mutateData(
        "PUT",
        `/api/users/${userId}`,
        payload
    )
    revalidatePath("/dashboard/account")
    return {
        ...prevState,
        data: updateImageResponse,
        StrapiErrors: null,
        ZodError: null,
        message: "Image Updated",
    }
}
