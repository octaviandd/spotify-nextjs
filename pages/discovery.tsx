import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ItemsCarousel from '../components/global/ItemsCarousel';
import FlyInOutBottom from '../components/animations/FlyInOutBottom';
import AccessDenied from '../components/AccessDenied';
import { getSpotifyData } from '../components/utils';
import { useDispatch } from 'react-redux';
import { updateMarkets } from '../store/marketsSlice';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default function Discovery({ markets, accessToken }: { markets: string[]; accessToken: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMarkets(markets));
  }, []);

  if (!accessToken) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <FlyInOutBottom>
        <ItemsCarousel
          endpoint="browse/featured-playlists"
          title="Featured Playlists"
          redirect="playlists"
        ></ItemsCarousel>
        <ItemsCarousel endpoint="browse/new-releases" title="Featured Albums" redirect="albums"></ItemsCarousel>
        <ItemsCarousel endpoint="browse/categories" title="Featured Categories" redirect="categories"></ItemsCarousel>
        <ItemsCarousel
          endpoint="browse/categories/toplists/playlists"
          title="Top Playlists"
          redirect="playlists"
        ></ItemsCarousel>
        <ItemsCarousel
          endpoint="browse/categories/0JQ5DAqbMKFQIL0AXnG5AK/playlists"
          title="Trending Playlists"
          redirect="playlists"
        ></ItemsCarousel>
      </FlyInOutBottom>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const data = await getSpotifyData({
    token: session?.accessToken as string,
    searchParams: undefined,
    queryLink: 'markets',
  });

  let cleanData: {}[] = [];
  data.markets?.map((item: string, index: number) => cleanData.push({ id: index, value: item, label: item }));

  if (session) {
    return {
      props: {
        accessToken: session?.accessToken,
        markets: cleanData,
      },
    };
  } else {
    return {
      props: {
        accessToken: null,
      },
    };
  }
}
