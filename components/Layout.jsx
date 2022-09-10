import React from 'react';

import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

import Spinner from '../UI/Spinner';

import { useStateContext } from '../context/StateContext';

const Layout = ({ children }) => {
  const { isLoading, setIsLoading } = useStateContext();

  return (
    <div className="layout">
      {isLoading && <Spinner />}
      <Head>
        <title>Babz Online Stores</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
