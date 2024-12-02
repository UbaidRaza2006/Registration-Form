import { Inter, Oswald, Rubik_Bubbles } from "next/font/google";
import "./globals.css";
import { PasswordProvider } from "../context";
import { ToastContainer } from "./nexttoast";
import "react-toastify/dist/ReactToastify.css";

// Load Google Fonts
const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["200", "400", "700"] });
const rubikBubbles = Rubik_Bubbles({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Registration Website",
  description: "Courses by Sir Rizwan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${oswald.variable} ${rubikBubbles.variable}`}>
        {/* Context Provider */}
        <PasswordProvider>
          <main>
            {children}
          </main>
          {/* Toast Notifications */}
          <ToastContainer />
        </PasswordProvider>
      </body>
    </html>
  );
}
