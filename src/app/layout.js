import { Inter } from "next/font/google";
import "./globals.css";
import "./css/styles.css"
const inter = Inter({ subsets: ["latin"] });
export const dynamic = 'force-static'
export const metadata = {
  title: "Bullet Journal",
  description: "A digital bullet journal to organize your life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
