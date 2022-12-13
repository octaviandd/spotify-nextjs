import SongModal from './search-page/SongModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-rows-layout">
      <main className="">{children}</main>
      <SongModal></SongModal>
    </div>
  );
}
