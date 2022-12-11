import Footer from './Footer';
import Header from './Header';
import SongModal from './search-page/SongModal';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-rows-layout">
      <Header />
      <main className="">{children}</main>
      <SongModal></SongModal>
      <Footer />
    </div>
  );
}
