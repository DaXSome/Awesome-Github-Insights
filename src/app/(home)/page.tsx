import SearchUserInput from "@/components/home/SearchUserInput";

export default async function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center mx-auto px-4 py-16">
      <h1>Awesome Github Insights</h1>
      <SearchUserInput />
    </main>
  );
}
