"use client";

import Head from "next/head";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AuthProvider from "./context/AuthContext";


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
