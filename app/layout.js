import "./globals.css";
import Navbar from "@/components/Navbar"; // Correct import path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
