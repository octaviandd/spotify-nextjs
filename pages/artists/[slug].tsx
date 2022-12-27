import React from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import Layout from '../../components/Layout';

type Props = {};

export default function ArtistPage({}: Props) {
  return (
    <Layout>
      <FlyInOutBottom>
        <div>ArtistPage</div>
      </FlyInOutBottom>
    </Layout>
  );
}
