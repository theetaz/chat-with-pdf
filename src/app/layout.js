"use client";

import Head from "next/head";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AuthProvider from "./context/AuthContext";

// export const metadata = {
//   title: "Smart AI Doc",
//   description:
//     "Your smart AI document reader & analyzer - similar to ChatGPT but for PDFs, CSVs, Excel, and PowerPoint documents. Summarize and respond to questions intelligently",
//   metadataBase: new URL(process.env.VERCEL_URL),
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
