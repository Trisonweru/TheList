/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { motion } from 'framer-motion';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { Capitalize } from 'utils/Capitalize';
import request from 'utils/request';

import prisma from '@/lib/prisma';

import Footer from '@/components/layout/footer';
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

export default function HomePage({ results, search, customLists }: any) {
  return (
    <Layout>
      <Seo templateTitle='TheList' />
      <div className="relative flex h-[500px] w-[100%]  flex-col items-center justify-center bg-[url('/images/hero.jpg')]">
        <div className='flex h-full w-full flex-col  items-center justify-center bg-gradient-to-t from-[rgba(18,18,18)] to-[rgba(18,18,18,0.6)] '>
          <div className='w-full'>
            <Header disp={true} />
          </div>
          <div className='flex h-full w-full flex-1 flex-col items-center justify-center px-4 '>
            <div className='flex'>
              <motion.h1
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ease: 'easeOut',
                  duration: 2,
                }}
                className='max-w-3xl text-center text-3xl sm:text-5xl'
              >
                <motion.span className='text-[#3a84a3]  '>Create </motion.span>{' '}
                and <span className='text-[#3a84a3] '>share</span> your{' '}
                <span className='text-[#3a84a3] '>watchlists </span>
                with your friends.{' '}
                <span className='text-[#3a84a3] '>Keep record </span> of what
                you watch.
              </motion.h1>
            </div>
            <Search />
          </div>
        </div>
      </div>
      <Nav />

      <Results
        results={search.length > 0 ? search : results}
        customLists={customLists}
      />
      <Footer />
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const genre: string = context.query.genre;
  const search: string = context.query.search;
  const requests = await fetch(
    `https://api.themoviedb.org/3${
      request[genre]?.url || request.fetchTreding.url
    }`
  );
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
  const lists = [];
  if (session) {
    const user = await prisma?.user.findFirst({
      where: { email: session.user.email },
    });
    const customList = await prisma?.customList.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    customList.map((item: { id: string; name: string; userId: string }) =>
      lists.push(item)
    );
  }
  return {
    props: {
      results: results.results,
      search: searchedObj,
      customLists: lists,
    },
  };
}
