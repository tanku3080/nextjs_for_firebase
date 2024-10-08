import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrCwTntNgG_doAoN38254QUhsRtRdCzdA",
  authDomain: "my-website-for-firebase.firebaseapp.com",
  databaseURL: "https://my-website-for-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-website-for-firebase",
  storageBucket: "my-website-for-firebase.appspot.com",
  messagingSenderId: "712889021472",
  appId: "1:712889021472:web:1a64620f975ca2e18eb845"
};
// Initialize Firebase
/*他のfirebaseコンポーネントを使用する際には必要だが、現状hostingのみなのでコメントアウト */
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
