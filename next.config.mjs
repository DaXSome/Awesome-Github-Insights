/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "avatars.githubusercontent.com",
      "github-profile-trophy.vercel.app",
      "github-readme-stats.vercel.app",
      "github-readme-streak-stats.herokuapp.com",
      "github-readme-stats-git-masterrstaa-rickstaa.vercel.app",
    ],
  },
};

export default nextConfig;
