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
                hostname: "starfish-app-aw8cq.ondigitalocean.app",
            },
        ],
    },
}

export default nextConfig
