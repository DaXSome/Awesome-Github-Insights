import ContributionsCalender from "@/components/devs/ContributionsCalender";
import { GetDevProfile } from "@/lib";
import { Metadata } from "next";
import { Star, GitBranch } from "lucide-react";
import { format } from "timeago.js";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const data = await GetDevProfile(id);

  if (!data) {
    return {
      metadataBase: new URL("https://ghana-devs.vercel.app"),
      title: "Oops! | 404",
      description: "No user found",
    };
  }

  const { ghUserInfo } = data;

  const titleNDesc = {
    title: `${ghUserInfo?.name ?? "No name"} | ${ghUserInfo?.login}`,
    description: `Catch all the amazing stuff ${ghUserInfo?.login} is building.`,
  };

  return {
    metadataBase: new URL("https://ghana-devs.vercel.app"),
    openGraph: {
      images: [ghUserInfo?.avatar_url!],
      ...titleNDesc,
    },
    twitter: {
      images: [ghUserInfo?.avatar_url!],
      ...titleNDesc,
    },
    ...titleNDesc,
  };
}

export default async function DevPage({ params }: Props) {
  const { id } = params;

  const data = await GetDevProfile(id);

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        No user Found
      </div>
    );
  }

  const { ghUserInfo, yearsOnGithub, ossContrib, publicEvents } = data;

  const renderPublicEvent = (event: GhPublicEvent) => {
    switch (event.type) {
      case "PushEvent":
        return (
          <div
            key={event.payload.push_id}
            className="bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <p>
              Made {event.payload.commits.length} commits to{" "}
              <Link
                className="text-blue-400"
                target="_blank"
                href={`https://github.com/${event.repo.name}/tree/${event.payload.ref.replaceAll("refs/heads/", "")}`}
              >
                {event.payload.ref.replaceAll("refs/heads/", "")}
              </Link>{" "}
              at{" "}
              <Link
                className="text-blue-400"
                target="_blank"
                href={`https://github.com/${event.repo.name}`}
              >
                {event.repo.name}
              </Link>
            </p>

            <div className="mt-4 mb-4">
              {event.payload.commits.map((commit) => (
                <div key={commit.sha}>
                  <p>
                    {commit.message}

                    <Link
                      className="text-blue-400"
                      target="_blank"
                      href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                    >
                      {" "}
                      ({commit.sha.slice(0, 7)})
                    </Link>
                  </p>
                </div>
              ))}
            </div>

            <span className="text-gray-400">{format(event.created_at)}</span>
          </div>
        );

      case "WatchEvent":
        return (
          <div key={event.repo.name} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p>
              Starred{" "}
              <Link
                className="text-blue-400"
                target="_blank"
                href={`https://github.com/${event.repo.name}`}
              >
                {event.repo.name}
              </Link>
            </p>

            <div className="mt-4 mb-4"></div>

            <span className="text-gray-400">{format(event.created_at)}</span>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center gap-4">
          <img
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
            <a
              href={`https://github.com/${ghUserInfo.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Trophies</h1>
        <div className="flex justify-center">
          <img
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
          <img
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
          <img
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
          <img
            src={`https://github-readme-streak-stats.herokuapp.com?user=${ghUserInfo.login}`}
            alt="Streak"
            width={400}
            height={200}
          />
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">30 Day contribution trend</h1>

        <div className="flex flex-col justify-center">
          <img
            src={`https://github-commits-counter.vercel.app/?user=${ghUserInfo.login}`}
            alt="Streak"
            width={400}
            height={200}
          />

          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${ghUserInfo.login}`}
            alt="Streak"
            width={1000}
            height={200}
          />
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Open Source Contributions</h1>
        {ossContrib.length == 0 && <p> No contributions </p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {ossContrib.map((repo) => (
            <div
              key={repo.node.url}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <a
                target="_blank"
                href={repo.node.url}
                className="text-blue-600 hover:underline font-semibold"
              >
                {repo.node.nameWithOwner}
              </a>

              <div className="flex items-center mt-2">
                <Star size={18} className="text-yellow-400 mr-1" />
                <p className="text-gray-600">
                  {repo.node.stargazerCount} stars
                </p>
              </div>

              <div className="flex items-center">
                <GitBranch size={18} className="text-green-400 mr-1" />
                <p className="text-gray-600">{repo.node.forkCount} forks</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8" />

      <section className="my-8">
        <h1 className="text-2xl font-bold">Recent Public Events</h1>

        {publicEvents.map((event) => renderPublicEvent(event))}
      </section>

      <hr className="my-8" />

      <p>Years on Github: {yearsOnGithub.length}</p>
      <ContributionsCalender
        username={ghUserInfo.login}
        years={yearsOnGithub}
      />
    </div>
  );
}
