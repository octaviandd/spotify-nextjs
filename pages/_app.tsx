import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { TransitionProvider } from '../components/animations/TransitionContext';
import TransitionLayout from '../components/animations/TransitionLayout';
import store from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { AppProps } from 'next/app';
import './styles.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
