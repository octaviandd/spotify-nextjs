import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../components/utils';
import { useDispatch } from 'react-redux';
import { updateMarkets } from '../store/marketsSlice';
import ItemsCarousel from '../components/global/ItemsCarousel';

export default function Discovery() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleChange = (markets: {}[]) => {
    dispatch(updateMarkets(markets));
  };

  const getCurrentMarkets = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: 'markets',
    }).then((data: any): void => {
      let cleanData: {}[] = [];
      data.markets.map((item: string, index: number) => cleanData.push({ id: index, value: item, label: item }))
      handleChange(cleanData);
    });
  };

  useEffect(() => {
    session?.accessToken && getCurrentMarkets()
  }, [session])

  return (
    <Layout>
      <ItemsCarousel endpoint='browse/featured-playlists' title="Featured Playlists"></ItemsCarousel>
      <ItemsCarousel endpoint='browse/new-releases' title="Featured Albums"></ItemsCarousel>
      <ItemsCarousel endpoint='browse/categories' title="Featured Categories"></ItemsCarousel>
      <ItemsCarousel endpoint='browse/categories/toplists/playlists' title="Top Playlists"></ItemsCarousel>
      <ItemsCarousel endpoint='browse/categories/0JQ5DAqbMKFQIL0AXnG5AK/playlists' title="Trending Playlists"></ItemsCarousel>
    </Layout>
  );
}
