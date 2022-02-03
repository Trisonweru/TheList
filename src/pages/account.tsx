/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
// import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { getSession, GetSessionParams, signOut } from 'next-auth/react';
import React, { useState } from 'react';

import prisma from '@/lib/prisma';

import DataCard from '@/components/DataCard';
import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';

interface props {
  session: any;
  favorite: any;
  watchlist: any;
  customLists: any;
}
function Account({ session, favorite, watchlist, customLists }: props) {
  const [clickedFavorite, setClickedFavorite] = useState(false);
  const [clickedWatchList, setClickedWatchList] = useState(true);
  const [fav, setFav] = useState([...favorite]);
  const [watchlst, setWatchlst] = useState([...watchlist]);
  const [clikedList, setClickedList] = useState(false);
  const [clickedMovies, setClickedMovies] = useState([]);
  const [id, setId] = useState('');
  const handleFav = () => {
    setClickedFavorite(true);
    setClickedWatchList(false);
    setClickedList(false);
  };
  const handleWatchList = () => {
    setClickedWatchList(true);
    setClickedFavorite(false);
    setClickedList(false);
  };

  const handleListClick = (id: string, movies: any[]) => {
    setClickedList(true);
    setClickedMovies([...movies]);
    setId(id);
    setClickedWatchList(false);
    setClickedFavorite(false);
  };

  const onDeleteItem = (item: any, type: any) => {
    if (type === 'favorite') {
      fav.map((it, index) => {
        if (it.id === item.id) {
          fav.splice(index, 1);
          setFav([...fav]);
        }
      });
    }
    if (type === 'watchlist') {
      watchlst.map((it, index) => {
        if (it.id === item.id) {
          watchlst.splice(index, 1);
          setWatchlst([...watchlst]);
        }
      });
    }
  };
  const onListDeleteItem = (data: { id: any }) => {
    if (clickedMovies.length > 0) {
      clickedMovies.map((item, index) => {
        if (item.id === data.id) {
          clickedMovies.splice(index, 1);
          setClickedMovies([...clickedMovies]);
        }
      });
    }
  };
  return (
    <>
      <Seo templateTitle='Account' />
      <Header disp={true} />
      <div className='flex min-h-screen flex-col items-center justify-center sm:flex-row sm:items-start sm:pr-4 '>
        <div className='mt-10 ml-4 mr-4 flex w-[80%] flex-wrap items-center justify-between rounded-md sm:mt-0 xl:w-1/4 '>
          <div className='flex w-full flex-wrap items-center justify-between rounded-md bg-[#161B22] p-4  shadow-md'>
            <div className='flex items-center space-x-4'>
              <Image
                src={session.user.image}
                alt='google user image'
                layout='intrinsic'
                height={100}
                width={100}
                objectFit='fill'
                className='rounded-full'
              />
              <div className='flex flex-col space-y-2'>
                <h2 className='text-lg'>{session.user.name}</h2>
                <p className='text-sm'>{session.user.email}</p>
              </div>
            </div>
            <div className='flex w-full items-center justify-end sm:w-full'>
              <Button onClick={() => signOut()} className='whitespace-nowrap'>
                Sign out
              </Button>
            </div>
          </div>
          <div className='mt-10 flex h-auto max-h-[400px] w-full flex-col items-center overflow-y-scroll rounded-md bg-[#161B22] p-4 shadow-md scrollbar-hide'>
            <div className='left-0 top-0 flex w-full flex-col items-center justify-center'>
              <div className='sticky'>
                <h2 className='text-lg'>Your Lists</h2>
              </div>
              <div className='mt-4 w-full'>
                {customLists.map(
                  (item: {
                    id: string;
                    name:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal;
                    movies: any[];
                  }) => {
                    return (
                      <div
                        key={item.id}
                        className={
                          clikedList && id === item.id
                            ? 'my-1 flex w-full cursor-pointer items-center justify-start rounded-md bg-[#132b35] py-2 pl-2 text-white'
                            : 'my-1 flex w-full cursor-pointer items-center justify-start rounded-md bg-[#1F2933] py-2 pl-2 text-gray-400 hover:text-white'
                        }
                        onClick={() => handleListClick(item.id, item.movies)}
                      >
                        <p>{item.name}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        {!clikedList ? (
          <div className='mt-10 mb-10 flex w-[80%] flex-col items-center justify-between rounded-md bg-[#161B22] p-4 shadow-md sm:mt-0 sm:w-3/4 sm:flex-grow'>
            <div className='flex w-full justify-between space-x-4 p-2'>
              <div
                className={
                  clickedWatchList
                    ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
                    : 'flex w-1/2 cursor-pointer items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
                }
                onClick={handleWatchList}
              >
                Watchlist
              </div>
              <div
                className={
                  clickedFavorite
                    ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
                    : 'flex w-1/2 cursor-pointer items-center  justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
                }
                onClick={handleFav}
              >
                Favorite
              </div>
            </div>

            {(clickedWatchList && watchlst.length > 0) ||
            (clickedFavorite && fav.length > 0) ? (
              <div className='mt-6 flex w-full flex-col items-center space-y-6'>
                {clickedFavorite &&
                  fav.map((item: { id: React.Key | null | undefined }) => (
                    <DataCard
                      data={item}
                      key={item.id}
                      session={session}
                      type='favorite'
                      onDelete={onDeleteItem}
                    />
                  ))}

                {clickedWatchList &&
                  watchlst.map((item: { id: React.Key | null | undefined }) => (
                    <DataCard
                      data={item}
                      key={item.id}
                      session={session}
                      type='watchlist'
                      onDelete={onDeleteItem}
                    />
                  ))}
              </div>
            ) : (
              <div className='mt-4'>Add movies to your list.</div>
            )}
          </div>
        ) : (
          <div className='mt-10 mb-10 flex w-[80%] flex-col items-center justify-between rounded-md bg-[#161B22] p-4 shadow-md sm:mt-0 sm:w-3/4 sm:flex-grow'>
            <div className='flex w-full justify-between space-x-4 p-2'>
              <div
                className={
                  clickedWatchList
                    ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
                    : 'flex w-1/2 cursor-pointer items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
                }
                onClick={handleWatchList}
              >
                Watchlist
              </div>
              <div
                className={
                  clickedFavorite
                    ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
                    : 'flex w-1/2 cursor-pointer items-center  justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
                }
                onClick={handleFav}
              >
                Favorite
              </div>
            </div>

            {clickedMovies.length > 0 ? (
              <div className='mt-6 flex w-full flex-col items-center space-y-6'>
                {clikedList &&
                  clickedMovies.map(
                    (item: { id: React.Key | null | undefined }) => (
                      <DataCard
                        data={item}
                        key={item.id}
                        session={session}
                        type='customlist'
                        onListDeleteItem={onListDeleteItem}
                      />
                    )
                  )}
              </div>
            ) : (
              <div className='mt-4'>Add movies to your list.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Account;

export const getServerSideProps = async (ctx: GetSessionParams | undefined) => {
  const session = await getSession(ctx);
  // const prisma = new PrismaClient();
  const favorite = await prisma?.favorite.findMany({
    where: { user: session?.user },
    orderBy: { id: 'desc' },
  });
  const watchlist = await prisma?.watchList.findMany({
    where: { user: session?.user },
    orderBy: { id: 'desc' },
  });
  const lists = await prisma?.customList.findMany({
    where: { user: session.user },
    include: {
      movies: true,
    },
    orderBy: { id: 'desc' },
  });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      favorite: favorite,
      watchlist: watchlist,
      customLists: lists,
    },
  };
};
