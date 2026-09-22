import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chanduka Lakshan | Mobile & DevOps Engineer",
  description: "Portfolio of Chanduka Lakshan, Mobile Developer & DevOps Engineer based in Colombo, Sri Lanka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
