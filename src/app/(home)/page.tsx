import Hero from "@/components/home/Hero";
import { ParseMDData } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { users, lastUpdate } = await ParseMDData();

  const userKeys = Object.keys(users).sort();

  return (
    <main className="container mx-auto px-4 py-16">
      <Hero lastUpdate={lastUpdate} />

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {userKeys.map((key) => (
          <Link href={`#${key}`} key={key} className="m-5">
            {key}
          </Link>
        ))}
      </div>

      {userKeys.map((key) => {
        return (
          <div id={key} key={key}>
            <h2 className="text-xl font-bold text-gray-800 m-10">{key}</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users[key].map((userData) => (
                <Link
                  href={`/devs/${userData.username}`}
                  key={userData.username}
                  className="rounded-lg shadow-md bg-white overflow-hidden p-4 hover:shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={userData.avatar}
                      alt={`${userData.name} Avatar`}
                      width={64}
                      height={64}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {userData.name}
                      </h2>
                      <p className="text-gray-600 mt-2">@{userData.username}</p>
                    </div>
                  </div>
                  <ul className="list-disc mt-4 text-gray-600">
                    <li>Company: {userData.company}</li>
                    <li>Location: {userData.location}</li>
                    <li>Total Contributions: {userData.total_contributions}</li>
                    <li>
                      Private Contributions: {userData.private_contributions}
                    </li>
                    <li>
                      Public Contributions: {userData.public_contributions}
                    </li>
                  </ul>
                </Link>
              ))}
            </section>
          </div>
        );
      })}
    </main>
  );
}
