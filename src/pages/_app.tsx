/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProgressBar from '@badrap/bar-of-progress';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import PropTypes from 'prop-types';

import { darkTheme } from '../styles/theme/lightTheme';
import createEmotionCache from '../../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
import { Router } from 'next/router';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

const progress = new ProgressBar({
  size: 4,
  color: '#fff',
  className: 'bar-of-progress',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const MyApp = (props: {
  Component: any;
  emotionCache: EmotionCache | undefined;
  pageProps: any;
  session: any;
}) => {
  const {
    Component,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
