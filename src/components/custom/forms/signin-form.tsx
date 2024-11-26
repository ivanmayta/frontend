"use client"

import Link from "next/link"

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { loginUserAction } from "@/services/actions/auth-actions"
import { ZodError } from "./zod-error"
import { StrapiErrors } from "./strapi-errors"
export function SigninForm() {
    const INITIAL_STATE = {
        zodErrors: null,
        strapiErrors: null,
        data: null,
        message: null,
    }
    const [formState, formAction] = useActionState(
        loginUserAction,
        INITIAL_STATE
    )
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">
                            Sign In
                        </CardTitle>
                        <CardDescription>
                            Enter your details to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder="username or email"
                            />
                            <ZodError
                                errors={formState?.zodErrors?.identifier}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <ZodError errors={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <button className="w-full">Sign In</button>
                        <StrapiErrors error={formState.strapiErrors} />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link className="underline ml-2" href="signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}
