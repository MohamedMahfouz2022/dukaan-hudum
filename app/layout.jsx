import { Cairo } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { Toaster } from "react-hot-toast"

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
})

export const metadata = {
  title: "دوكان هدوم | أزياء عصرية للرجل المعاصر",
  description: "اختبر الحرفية العالية والأناقة الخالدة مع دوكان هدوم.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '0px',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.1em'
            }
          }}
        />
      </body>
    </html>
  )
}
