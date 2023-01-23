import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from '@/components/Layout';
import { persistor, store} from '@/app/store';
import ScrollToTop from '@/components/ScrollToTop';

import '@/styles/dark.scss';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <ScrollToTop />
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
