import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import FeaturedPlaylists from '../components/discovery-page/FeaturedPlaylists';
import FeaturedAlbums from '../components/discovery-page/FeaturedAlbums';
import FeaturedCategories from '../components/discovery-page/FeaturedCategories';
import { getSpotifyData } from '../components/utils';
import { useDispatch } from 'react-redux';
import { updateMarkets } from '../store/marketsSlice';
import ItemsCarousel from '../components/ItemsCarousel';

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
      <FeaturedPlaylists></FeaturedPlaylists>
      <FeaturedAlbums></FeaturedAlbums>
      <FeaturedCategories></FeaturedCategories>
      <ItemsCarousel endpoint='browse/categories/toplists/playlists' title="Top Playlists"></ItemsCarousel>
      <ItemsCarousel endpoint='browse/categories/0JQ5DAqbMKFQIL0AXnG5AK/playlists' title="Trending Playlists"></ItemsCarousel>
    </Layout>
  );
}
