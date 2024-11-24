import Navbar from "@/components/Navbar";
import "../styles/globals.css";
export const metadata = {
  title: "CMS",
  description: "Content Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
