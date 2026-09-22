import localFont from "next/font/local";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const determination = localFont({
  src: "./fonts/determination.ttf",
  variable: "--font-determination",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chanduka Lakshan | Mobile & DevOps Engineer",
  description: "Portfolio of Chanduka Lakshan, Mobile Developer & DevOps Engineer based in Colombo, Sri Lanka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${determination.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
