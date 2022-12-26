import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../components/utils';
import { useDispatch } from 'react-redux';
import { updateMarkets } from '../store/marketsSlice';
import ItemsCarousel from '../components/global/ItemsCarousel';
import FlyInOutBottom from '../components/animations/FlyInOutBottom';

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
      data.markets.map((item: string, index: number) => cleanData.push({ id: index, value: item, label: item }));
      handleChange(cleanData);
    });
  };

  useEffect(() => {
    session?.accessToken && getCurrentMarkets();
  }, [session]);

  return (
    <FlyInOutBottom>
      <Layout>
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
      </Layout>
    </FlyInOutBottom>
  );
}
