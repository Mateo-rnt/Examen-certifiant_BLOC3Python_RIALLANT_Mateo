import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Examen Studi JO",
  description: "Examen-certifiant_BLOC3Python_RIALLANT_Mateo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mb-10">
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
