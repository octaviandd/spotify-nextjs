import TransitionLayout from '../components/animations/TransitionLayout';
import store from '../store/reduxStore';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { TransitionProvider } from '../components/animations/TransitionContext';
import type { AppProps } from 'next/app';
import './styles.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider refetchInterval={5 * 600} session={session}>
      <Provider store={store}>
        <TransitionProvider>
          <TransitionLayout>
            <Component {...pageProps} />
          </TransitionLayout>
        </TransitionProvider>
      </Provider>
    </SessionProvider>
  );
}
