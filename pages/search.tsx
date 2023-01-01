import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import SongsContainer from '../components/search-page/SongsContainer';
import FadeInOut from '../components/animations/FadeInOut';
import SongModal from '../components/search-page/SongModal';
import Search from '../components/search-page/Search';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import { RootState } from '../store/reduxStore';
import { useSelector } from 'react-redux';

const selectSong = (state: RootState) => state.song.currentSong;

export default function Page({ accessToken }: { accessToken: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const song = useSelector(selectSong);

  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={
          isModalOpen
            ? 'bg-[#000000] flex lg:grid grid-cols-search grid-rows-search pt-10 opacity-50 pointer-events-none relative'
            : 'bg-[#000000] flex lg:grid grid-cols-search grid-rows-search pt-10 relative'
        }
      >
        <Search accessToken={accessToken}/>
        <FadeInOut>
          <SongsContainer accessToken={accessToken}></SongsContainer>
        </FadeInOut>
      </div>
      {song?.id && window.location.href.includes('search') && (
        <SongModal updateBackground={(value: boolean) => setIsModalOpen(value)}></SongModal>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  //@ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);
  return session
    ? {
        props: {
          accessToken: session?.accessToken,
        },
      }
    : { props: { accessToken: null } };
}
