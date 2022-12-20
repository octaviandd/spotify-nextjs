import { useSession , getSession, GetSessionParams} from 'next-auth/react';
import { useEffect } from 'react';
import LandingSectionFour from '../components/landing-page/LandingSectionFour';
import LandingSectionOne from '../components/landing-page/LandingSectionOne';
import Layout from '../components/Layout';
import MockupPage from '../components/landing-page/MockupPage';

export default function Page() {
  const { status } = useSession();

  useEffect(() => {
    console.log(status)
    if (status === 'authenticated') {
      window.location.href = '/search';
    }
    window.scrollTo(0, 0);
  }, [status]);

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

export async function getServerSideProps(context: GetSessionParams | undefined) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}