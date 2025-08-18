import { Header } from "@/components/header/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col p-4">{children}</div>
    </>
  );
}
