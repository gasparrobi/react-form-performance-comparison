import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "@next/font/google";

import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-inter`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
