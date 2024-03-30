import Providers from "@/lib/Providers";
import { SocketContextProvider } from "@/socket/socket";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatsApp",
  description: "whatsapp is a simple chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <SocketContextProvider>
          <body className={inter.className}>{children}</body>
        </SocketContextProvider>
      </html>
    </Providers>
  );
}
