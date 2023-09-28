import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import '../assets/fonticon/iconfont.css'

//import '../../node_modules/antd/dist/antd.css'; // 如果没有此antd.css就用下面的reset.css
import '../../node_modules/antd/dist/reset.css'

import VscodeLayout from '../components/Layout/VscodeLayout';



function MyApp({ Component, pageProps }: AppProps) {
  return (
      <VscodeLayout>
        <Component {...pageProps} />
      </VscodeLayout>
  );
}

export default MyApp;
