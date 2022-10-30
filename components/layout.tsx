import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-rows-layout">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  )
}
