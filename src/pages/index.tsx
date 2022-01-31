import * as React from 'react';
import request from 'utils/request';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Nav from '@/components/layout/Nav';
import Results from '@/components/Results';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage({ results }: any) {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='TheList' />
      <Header />
      <Nav />

      <Results results={results} />
    </Layout>
  );
}

export async function getServerSideProps(context: { query: { genre: any } }) {
  const genre: string = context.query.genre;
  const requests = await fetch(
    `https://api.themoviedb.org/3${
      request[genre]?.url || request.fetchTreding.url
    }`
  );
  const results = await requests.json();
  return {
    props: {
      results: results.results,
    },
  };
}
