import LandingSectionFour from '../components/landing-page/LandingSectionFour';
import LandingSectionOne from '../components/landing-page/LandingSectionOne';
import Layout from '../components/Layout';
import MockupPage from '../components/landing-page/MockupPage';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useEffect } from 'react';
import LandingSectionThree from '../components/landing-page/LandingSectionThree';
import LandingSectionTwo from '../components/landing-page/LandingSectionTwo';

export default function Page({ accessToken }: { accessToken: string }) {
  useEffect(() => {
    if (accessToken) window.location.href = '/search';
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className='px-6 lg:px-20'>
        <LandingSectionOne></LandingSectionOne>
      </div>
      <div className="flex lg:grid grid-cols-hero grid-rows-hero relative" id="starter">
        <div>
          <LandingSectionTwo></LandingSectionTwo>
          <LandingSectionThree></LandingSectionThree>
          <LandingSectionFour></LandingSectionFour>
        </div>
        <MockupPage></MockupPage>
      </div>
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
