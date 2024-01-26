import type { Metadata } from "next";
import "./globals.css";
import {UserContextProvider }from "./_contexts/_userContext";


export const metadata: Metadata = {
  title: "Scrible Edit",
  description: "Colloborative Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="font-Ubuntu">
      <UserContextProvider>
      <body className="">{children}</body>

      </UserContextProvider>
    </html>
  );
}
