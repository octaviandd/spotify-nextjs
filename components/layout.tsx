import Footer from "./Footer"
import Header from "./header"

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
