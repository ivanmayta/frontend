const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**/*",
            },

            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/djpp5zuhc/image/upload/**/*",
            },
        ],
    },
}

export default nextConfig
