import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import './styles.css';
import Header from "../components/Header"
import Footer from "../components/Footer"
import { TransitionProvider } from "../components/TransitionContext"
import TransitionLayout from "../components/TransitionLayout"


export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider refetchInterval={5 * 600} session={session}>
      <Provider store={store}>
        <TransitionProvider>
          <TransitionLayout>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </TransitionLayout>
        </TransitionProvider>
      </Provider>
    </SessionProvider>
  );
}
