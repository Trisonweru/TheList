/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import request from 'utils/request';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Nav from '@/components/layout/Nav';
import Results from '@/components/Results';
import Search from '@/components/search/Search';
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

export default function HomePage({ results, search }: any) {
  return (
    <Layout>
      <Seo templateTitle='TheList' />
      <Header />
      <Search />
      <Nav />

      <Results results={search.length > 0 ? search : results} />
    </Layout>
  );
}

export async function getServerSideProps(context: {
  query: { genre: string; search: string };
}) {
  const genre: string = context.query.genre;
  const search: string = context.query.search;
  const requests = await fetch(
    `https://api.themoviedb.org/3${
      request[genre]?.url || request.fetchTreding.url
    }`
  );
  const Capitalize = (mySentence: string) => {
    const words = mySentence.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
  };
  const searchedObj: any = [];
  const results = await requests.json();
  if (search) {
    results.results.filter((item: { title: string }) => {
      if (item.title === Capitalize(search)) {
        searchedObj.push(item);
        return item;
      }
    });
  }

  return {
    props: {
      results: results.results,
      search: searchedObj,
    },
  };
}
