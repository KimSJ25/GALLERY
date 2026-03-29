/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // 에러 로그에 찍힌 Cloudflare R2 호스트네임을 정확히 등록합니다.
        hostname: "gallery-photos.7b6b8f65e45030d203a0c672752ab1a3.r2.cloudflarestorage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
