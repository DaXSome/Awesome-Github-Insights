import Link from "next/link";
import { ParseMDData } from "../lib/";

export default async function Home() {
  const { users, lastUpdate } = await ParseMDData();
  return (
    <main className="">
      <h1>Last updated: {lastUpdate}</h1>

      <hr />
      <br />

      {users.map((userData) => (
        <Link href={`/devs/${userData.username}`} key={userData.username}>
          <h1>Name: {userData.name}</h1>
          <h1>Username: {userData.username}</h1>
          <p>Company: {userData.company}</p>
          <p>Location: {userData.location}</p>
          <p>Total Contributions: {userData.total_contributions}</p>
          <p>Private Contributions: {userData.private_contributions}</p>
          <p>Public Contributions: {userData.public_contributions}</p>
          <hr />
          <br />
        </Link>
      ))}
    </main>
  );
}
