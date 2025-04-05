import { Geist, Geist_Mono ,Space_Grotesk} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const font = Space_Grotesk({
  weight: ["300","400","500","600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Study Nest",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
