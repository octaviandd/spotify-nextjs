import Head from 'next/head';
import Header from './header';
import Footer from './Footer';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-layout">
      <Head>
        <title>Spotifier</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
