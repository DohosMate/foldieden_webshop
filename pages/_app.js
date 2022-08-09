
import React from 'react'
import '../styles/globals.css'
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (

    <StateContext>
      <Layout>
        <Toaster />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
