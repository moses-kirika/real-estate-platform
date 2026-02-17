import { config } from 'dotenv';
import path from 'path';

// Load .env from project root
config({ path: path.resolve(process.cwd(), '../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'generated.vusercontent.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
