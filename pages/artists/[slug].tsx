import React, { useState } from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import Layout from '../../components/Layout';

type Props = {};

export default function ArtistPage({ }: Props) {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <Layout><div className="h-[100vh] w-full bg-black"></div>;</Layout>
  }

  return (
    <Layout>
      <FlyInOutBottom>
        <div>ArtistPage</div>
      </FlyInOutBottom>
    </Layout>
  );
}
