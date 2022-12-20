import React, { useEffect, useState } from 'react';
import FadeInOut from '../components/FadeInOut';
import Layout from '../components/Layout';
import { getSpotifyData } from '../components/utils';
import { useSession } from 'next-auth/react';
import FeaturedPlaylists from '../components/discovery-page/FeaturedPlaylists';
import FeaturedAlbums from '../components/discovery-page/FeaturedAlbums';

export default function Discovery() {
  const { data: session } = useSession();

  return (
    <Layout>
      <FeaturedPlaylists></FeaturedPlaylists>
      <FeaturedAlbums></FeaturedAlbums>
      {/* <FadeInOut>
      </FadeInOut> */}
    </Layout>
  );
}
