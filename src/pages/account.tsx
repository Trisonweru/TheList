/* eslint-disable @typescript-eslint/no-explicit-any */
import { DotsVerticalIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession, GetSessionParams, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { fetcher } from 'utils/fetcher';

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
  const [did, setDid] = useState('');
  const [activeDots, setActiveDots] = useState(false);
  const [cLists, setCLists] = useState([...customLists]);

  const router = useRouter();

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
    if (activeDots) {
      setActiveDots(false);
    }
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
  const handleDots = (id: string, movies: any[]) => {
    setDid(id);
    setActiveDots(true);
    handleListClick(id, movies);
  };
  const deleteList = async (id: string) => {
    const res = await fetcher('/api/deletelist', { data: id, session });
    if (res.id) {
      cLists.map((item, index) => {
        if (item.id === res.id) {
          cLists.splice(index, 1);
          setCLists([...cLists]);
        }
      });
    }
  };
  return (
    <>
      <Seo templateTitle='Account' />
      <Header disp={true} />
      <div
        onClick={() => {
          if (activeDots) {
            setActiveDots(false);
          }
        }}
        className='flex min-h-screen flex-col items-center justify-center sm:flex-row sm:items-start sm:pr-4 '
      >
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
          <div className='mt-10 flex h-auto max-h-[250px] min-h-[150px] w-full flex-col items-center  overflow-y-scroll rounded-md bg-[#161B22] shadow-md scrollbar-hide'>
            <div className='relative flex w-full flex-col items-center justify-center'>
              <div className='sticky left-0 top-0 z-50 flex w-full items-center justify-between bg-[#161B22] px-2 py-2 shadow-md '>
                <h2 className='text-lg'>Your Lists</h2>
                <div
                  className='cursor-pointer'
                  onClick={() => router.push('/create-customlist')}
                >
                  <PlusCircleIcon className='h-6 text-[#316C85] hover:text-white' />
                </div>
              </div>
              {cLists.length > 0 ? (
                <div
                  className='mt-1 mb-2 w-full px-3'
                  onClick={() => {
                    if (activeDots) {
                      setActiveDots(false);
                    }
                  }}
                >
                  {cLists.map(
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
                          className='flex w-full items-center justify-between'
                          onClick={() => {
                            if (activeDots) {
                              setActiveDots(false);
                            }
                          }}
                        >
                          <div
                            onClick={() =>
                              handleListClick(item.id, item.movies)
                            }
                            className={
                              clikedList && id === item.id
                                ? 'relative my-1 flex h-[30px] w-full flex-grow cursor-pointer items-center justify-between rounded-l-md bg-[#132b35] py-2 pl-2 text-white'
                                : 'relative my-1 flex h-[30px] w-full cursor-pointer items-center justify-between rounded-l-md bg-[#1F2933] py-2 pl-2 text-gray-400 hover:bg-[#132b35] hover:text-white'
                            }
                          >
                            <div className='flex flex-grow items-center justify-start'>
                              <p className='text-base'>{item.name}</p>
                            </div>
                          </div>

                          <div
                            className='relative flex h-[30px] w-1/12 cursor-pointer items-center justify-between rounded-r-md bg-[#132b35] py-3 pl-2 text-white'
                            onClick={() => handleDots(item.id, item.movies)}
                          >
                            <DotsVerticalIcon className='h-5' />
                            {activeDots && item.id === did ? (
                              <div className='absolute top-0 right-0 z-50 m-1 mt-3 mr-4 h-fit space-y-1 rounded-md bg-[#333f4b] py-2 px-2 shadow-md '>
                                <div className='w-full px-1 py-1 hover:bg-[#202830]'>
                                  <p>Share</p>
                                </div>
                                <div className='border-2'></div>
                                <div
                                  className='w-full  px-1 py-1 hover:bg-[#202830]'
                                  onClick={() => deleteList(item.id)}
                                >
                                  <p>Delete</p>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className='flex items-center justify-center py-2 text-sm'>
                  <p>Create your custom lists</p>
                </div>
              )}
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
