import { getSession } from "@/lib/getSession";
import { Link } from "@heroui/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh_-_48px)]">
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          className="flex items-center gap-1 text-current"
          href="/"
          title="homepage"
        >
          <span className="text-default-600">پشتیبانی شده توسط</span>
          <p className="text-primary">AHST</p>
        </Link>
      </footer>
    </div>
  );
}
