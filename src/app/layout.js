import localFont from "next/font/local";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://chanduka.me";
const AUTHOR = "Chanduka Lakshan";
const FULL_NAME = "H.C.L. Perera";
const TITLE = "Chanduka Lakshan | DevOps & Mobile Engineer";
const DESCRIPTION =
  "Portfolio of H.C.L. Perera (Chanduka Lakshan) — an IT undergraduate at Rajarata University of Sri Lanka (RUSL) specializing in DevOps, cloud infrastructure (Azure, Docker, Linux), and mobile application development (Flutter, Android). Based in Colombo, Sri Lanka.";
const KEYWORDS = [
  "Chanduka Lakshan",
  "DevOps Engineer",
  "Mobile Developer",
  "Flutter Developer",
  "Android Developer",
  "Cloud Engineer",
  "Azure",
  "Docker",
  "Linux",
  "Next.js",
  "Sri Lanka Developer",
  "Portfolio",
  "Software Engineer",
  "IT Undergraduate",
];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${AUTHOR}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Chanduka Lakshan",
    "H.C.L. Perera",
    "HCL Perera",
    "hclperera",
    "DevOps Engineer",
    "Mobile Developer",
    "Flutter Developer",
    "Android Developer",
    "Cloud Engineer",
    "Azure",
    "Docker",
    "Linux",
    "Next.js",
    "Sri Lanka Developer",
    "RUSL",
    "Rajarata University",
    "Portfolio",
    "Software Engineer",
    "IT Undergraduate",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: AUTHOR,

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${AUTHOR} — DevOps & Mobile Engineer`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@chanduka_dev",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // App manifest / icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // Verification (add later when you have Search Console access)
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

// JSON-LD Structured Data for search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  alternateName: AUTHOR,
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  sameAs: [
    "https://github.com/hclperera",
    "https://linkedin.com/in/chanduka-lakshan",
  ],
  jobTitle: "DevOps Engineer & Mobile Developer",
  worksFor: {
    "@type": "Organization",
    name: "Self-employed / Freelance",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Rajarata University of Sri Lanka (RUSL)",
  },
  knowsAbout: [
    "DevOps",
    "Cloud Computing",
    "Microsoft Azure",
    "Docker",
    "Linux",
    "Flutter",
    "Android Development",
    "Python",
    "Next.js",
    "CI/CD",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  email: "chandukalakshanbttdm@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
