import Header from "./header"
import Footer from "./footer"

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
