import ContributionsCalender from "@/components/devs/ContributionsCalender";
import { GetDevProfile, GetUserFromMD } from "@/lib";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const user = await GetUserFromMD(id);

  return {
    metadataBase: new URL(
      (process.env.VERCEL_URL as string) || "http://localhost:3000",
    ),
    title: `Ghana Devs | ${user?.name} | ${user?.username}`,
    description: `Profile analytics for ${user?.name}`,
    openGraph: {
      title: `Ghana Devs | ${user?.name} | ${user?.username}`,
      description: `Profile analytics for ${user?.name}`,
      images: [user?.avatar!],
    },
    twitter: {
      title: `Ghana Devs | ${user?.name} | ${user?.username}`,
      description: `Profile analytics for ${user?.name}`,
      images: [user?.avatar!],
    },
  };
}

export default async function DevPage({ params }: Props) {
  const { id } = params;

  const { ghUserInfo, mdUserInfo, yearsOnGithub, contributionsPerYear } =
    await GetDevProfile(id);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <Image
            src={ghUserInfo.avatar_url}
            className="rounded-full"
            alt="User Avatar"
            width={96}
            height={96}
          />
          <div>
            <h1 className="text-3xl font-bold">
              {ghUserInfo.name || ghUserInfo.login}
            </h1>
            <p className="text-gray-600">{ghUserInfo.bio}</p>
            <p className="text-gray-600">
              {ghUserInfo.company || "No Company"}
            </p>
            <p className="text-gray-600">{ghUserInfo.location}</p>
            <p className="text-gray-600">
              Followers: {ghUserInfo.followers} || Following:{" "}
              {ghUserInfo.following}
            </p>
            <p className="text-gray-600">
              Public contributions: {mdUserInfo?.public_contributions}
            </p>
            <p className="text-gray-600">
              Private contributions: {mdUserInfo?.private_contributions}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Trophies</h1>
        <div className="flex justify-center">
          <Image
            src={`https://github-profile-trophy.vercel.app/?username=${ghUserInfo.login}`}
            alt="Trophies"
            width={800}
            height={800}
          />
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Stats</h1>
        <div className="flex justify-center">
          <Image
            src={`https://github-readme-stats.vercel.app/api?username=${ghUserInfo.login}`}
            alt="Stats"
            width={400}
            height={200}
          />
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Top Languages</h1>
        <div className="flex justify-center">
          <Image
            src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=${ghUserInfo.login}`}
            alt="Top Languages"
            width={400}
            height={200}
          />
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Streak</h1>
        <div className="flex justify-center">
          <Image
            src={`https://github-readme-streak-stats.herokuapp.com?user=${ghUserInfo.login}`}
            alt="Streak"
            width={400}
            height={200}
          />
        </div>
      </section>

      <hr className="my-8" />

      <p>Years on Github: {yearsOnGithub}</p>
      <ContributionsCalender
        username={ghUserInfo.login}
        years={contributionsPerYear}
      />
    </div>
  );
}
