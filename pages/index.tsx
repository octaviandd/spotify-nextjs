import LandingSectionFour from '../components/landing-page/LandingSectionFour';
import LandingSectionOne from '../components/landing-page/LandingSectionOne';
import Layout from '../components/Layout';
import MockupPage from '../components/landing-page/MockupPage';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useEffect } from 'react';

export default function Page({ accessToken }: { accessToken: string }) {
  useEffect(() => {
    // if (accessToken) window.location.href = '/search';
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-hero grid-rows-hero relative" id="starter">
        <MockupPage></MockupPage>
        <LandingSectionOne></LandingSectionOne>
        <LandingSectionFour></LandingSectionFour>
      </div>
      <div className="grid grid-cols-hero2 grid-rows-hero2 relative"></div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  //@ts-ignore
  const session = await unstable_getServerSession(req, res, authOptions);
  return {
    props: {
      accessToken: session?.accessToken || null,
    },
  };
}
