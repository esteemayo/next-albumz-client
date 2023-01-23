import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store} from '@/app/store';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';

import '@/styles/dark.scss';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <ScrollToTop />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
