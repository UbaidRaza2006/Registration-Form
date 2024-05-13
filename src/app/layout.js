
import { Inter } from "next/font/google";
import "./globals.css";
import { PasswordProvider } from "../context";
import { ToastContainer } from "./nexttoast";
import 'react-toastify/dist/ReactToastify.css';
// import GlobalState from "../context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Registration Website",
  description: "Courses by Sir Rizwan",
};

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

<PasswordProvider>
  <main>
    {children}
  </main>
  <ToastContainer/>
</PasswordProvider>

      </body>
    </html>
  )
}