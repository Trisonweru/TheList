/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import PropTypes from 'prop-types';

import { ModalProvider } from '../context/ModalContext';
import { darkTheme } from '../styles/theme/lightTheme';
import createEmotionCache from '../../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

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
        <ModalProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ModalProvider>
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
