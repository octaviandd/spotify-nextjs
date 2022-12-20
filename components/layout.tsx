import Head from 'next/head';
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-rows-layout">
      <Head>
        <title>Spotifier</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main>{children}</main>
    </div>
  );
}
