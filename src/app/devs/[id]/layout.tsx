import TopBar from "@/components/TopBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <TopBar />
      {children}
    </main>
  );
}
