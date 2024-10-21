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
      <script src="https://owbird.site/api/cdn/js/credit.js"></script>
    </main>
  );
}
