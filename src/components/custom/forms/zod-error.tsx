export function ZodError({ errors }: { errors: string[] }) {
    if (!errors) return null

    return errors.map((error, key) => {
        return (
            <div key={key} className="text-pink-500 text-xs italic mt-1 py-2">
                {error}
            </div>
        )
    })
}
