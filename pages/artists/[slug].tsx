import React from 'react';
import FlyInOutBottom from '../../components/animations/FlyInOutBottom';
import Layout from '../../components/Layout';
import AccessDenied from '../../components/AccessDenied';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyData } from '../../components/utils';

type Props = {
  accessToken: string
};

export default function ArtistPage({accessToken}: Props) {
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
        <div>ArtistPage</div>
      </FlyInOutBottom>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  // const data = await getSpotifyData({
  //   token: session?.accessToken as string,
  //   searchParams: undefined,
  //   queryLink: 'markets',
  // });

  // let cleanData: {}[] = [];
  // data.markets?.map((item: string, index: number) => cleanData.push({ id: index, value: item, label: item }));

  if (session) {
    return {
      props: {
        accessToken: session?.accessToken,
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

