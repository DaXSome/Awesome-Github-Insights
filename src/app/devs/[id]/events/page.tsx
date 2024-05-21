import { GetDevProfile, GetUserEvents } from "@/lib";
import { Metadata } from "next";
import Link from "next/link";
import PublicEvents from "@/components/devs/PublicEvents";

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
    title: `${ghUserInfo?.login} | Events`,
    description: `Plublic events for ${ghUserInfo?.login}`,
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

export default async function DevEventsPage({ params }: Props) {
  const { id } = params;

  const publicEvents = await GetUserEvents(id);

  return (
    <div className="container mx-auto py-8">
      <section className="my-8">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Public Events </h1>
          <Link className="text-blue-400" href={`/devs/${id}/events`}>
            View more
          </Link>
        </div>
        {publicEvents.map((event) => (
          <PublicEvents key={event.id} event={event} />
        ))}
      </section>

      <hr className="my-8" />
    </div>
  );
}
