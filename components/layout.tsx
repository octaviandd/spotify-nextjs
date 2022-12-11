import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Footer from './Footer';
import Header from './Header';
import SongModal from './search-page/SongModal';
interface LayoutProps {
  children: React.ReactNode;
}

const selectSong = (state: RootState) => state.song.currentSong;

export default function Layout({ children }: LayoutProps) {
  const song = useSelector(selectSong);

  return (
    <div className="grid grid-rows-layout">
      <Header />
      <main className="">{children}</main>
      {song.id && <SongModal></SongModal>}
      <Footer />
    </div>
  );
}
