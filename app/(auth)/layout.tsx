import { Link } from "@heroui/link";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
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
