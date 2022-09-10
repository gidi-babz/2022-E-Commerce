import React, { useState } from 'react';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import Spinner from '../UI/Spinner';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return (
    <StateContext>
      <Layout>
        {isLoading && <Spinner />}
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
