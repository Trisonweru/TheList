/* eslint-disable @typescript-eslint/no-explicit-any */
import { DotsVerticalIcon, PlusCircleIcon } from '@heroicons/react/outline';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Modal,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
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
  sharedLists: any;
}
function Account({
  session,
  favorite,
  watchlist,
  customLists,
  sharedLists,
}: props) {
  const [clickedFavorite, setClickedFavorite] = useState(false);
  const [clickedWatchList, setClickedWatchList] = useState(true);
  const [fav, setFav] = useState([...favorite]);
  const [watchlst, setWatchlst] = useState([...watchlist]);
  const [clikedList, setClickedList] = useState(false);
  const [clickedMovies, setClickedMovies] = useState([]);
  const [id, setId] = useState('');
  const [listId, setListId] = useState('');
  const [sharedListId, setSharedListId] = useState('');
  const [cLists, setCLists] = useState([...customLists]);
  const [shared, setShared] = useState([...sharedLists]);
  const [sharedMovies, setSharedMovies] = useState([]);
  const [clName, setCLName] = useState('');

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
    setSharedClicked(false);
  };

  const handleListClick = (id: string, name: string, movies: any[]) => {
    setClickedList(true);
    setClickedMovies([...movies]);
    setId(id);
    setCLName(name);
    setClickedWatchList(false);
    setClickedFavorite(false);
    setSharedClicked(false);
  };
  const [sharedClicked, setSharedClicked] = useState(false);
  const [csName, setCSName] = useState('');
  const handleSharedListClick = (id: string, name: string, movies: any[]) => {
    setCSName(name);
    setSharedMovies([...movies]);
    setSharedClicked(true);
    setClickedWatchList(false);
    setClickedFavorite(false);
    setClickedList(false);
    setSharedListId(id);
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

  // Modal item
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [openModal, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [to, setTo] = useState('');
  const [errorTo, setErrorTo] = useState(false);
  const [sameError, setSameError] = useState(false);

  const handleCreate = async () => {
    if (to !== '') {
      const res = await fetcher('/api/shared-list', {
        data: {
          listId: listId,
          to: to,
        },
        session,
      });
      if (res.id) {
        setTo('');
        handleModalClose();
      }
    } else {
      setErrorTo(true);
      setTimeout(() => setErrorTo(false), 5000);
    }
    if (session.user.email === to) {
      setSameError(true);
      setTimeout(() => setSameError(false), 5000);
    }
  };
  //list items popover
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setListId(id);
  };
  const [anchorElFw, setAnchorElFw] = React.useState<null | HTMLElement>(null);
  const openfw = Boolean(anchorElFw);
  const handleFWClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFw(event.currentTarget);
  };
  const [anchorElS, setAnchorElS] = React.useState<null | HTMLElement>(null);
  const openS = Boolean(anchorElS);
  const handleSClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElS(event.currentTarget);
  };
  const handleClose = async (id: string, option: string) => {
    if (option === 'Delete') {
      const res = await fetcher('/api/deletelist', { data: id, session });
      if (res.id) {
        cLists.map((item, index) => {
          if (item.id === res.id) {
            cLists.splice(index, 1);
            setCLists([...cLists]);
          }
        });
      }
    }
    if (option === 'Share') {
      handleModalOpen();
    }
    setAnchorEl(null);
  };
  const handleFWClose = async (option) => {
    if (option === 'Watchlist') {
      handleWatchList();
    }
    if (option === 'Favorite') {
      handleFav();
    }
    setAnchorElFw(null);
  };
  const handleSClose = async (option) => {
    if (option === 'Watchlist') {
      handleWatchList();
    }
    if (option === 'Favorite') {
      handleFav();
    }
    setAnchorElS(null);
  };
  const options = ['Share', 'Delete'];
  const option2 = ['Watchlist', 'Favorite'];

  const ITEM_HEIGHT = 48;
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
          <div className='mt-10 flex h-auto max-h-[250px] w-full flex-col items-center  overflow-y-scroll rounded-md bg-[#161B22] shadow-md scrollbar-hide'>
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
                <div className='mt-1 mb-2 w-full px-3'>
                  {cLists.map(
                    (item: { id: string; name: string; movies: any[] }) => {
                      return (
                        <div
                          key={item.id}
                          className='flex w-full items-center justify-between'
                        >
                          <div
                            onClick={() =>
                              handleListClick(
                                item.id,
                                item.name,
                                item.movies.reverse()
                              )
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
                          <IconButton
                            aria-label='more'
                            id='long-button'
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup='true'
                            onClick={(e) => handleClick(e, item.id)}
                          >
                            <DotsVerticalIcon className='h-5' />
                          </IconButton>
                          <Menu
                            id='long-menu'
                            MenuListProps={{
                              'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '10ch',
                              },
                            }}
                          >
                            {options.map((option) => (
                              <MenuItem
                                key={option}
                                onClick={() => handleClose(item.id, option)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className='flex items-center justify-center py-2 text-sm'>
                  <p>Create your custom list</p>
                </div>
              )}
            </div>
          </div>
          <div className='mt-10 flex h-auto max-h-[250px] w-full flex-col items-center  overflow-y-scroll rounded-md bg-[#161B22] shadow-md scrollbar-hide'>
            <div className='relative flex w-full flex-col items-center justify-center'>
              <div className='sticky left-0 top-0 z-50 flex w-full items-center justify-between bg-[#161B22] px-2 py-2 shadow-md '>
                <h2 className='text-lg'>Shared Lists</h2>
              </div>
              {shared.length > 0 ? (
                <div className='mt-1 mb-2 w-full px-3'>
                  {shared.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className='flex w-full items-center justify-between'
                      >
                        <div
                          onClick={() =>
                            handleSharedListClick(
                              item.id,
                              item.list.name,
                              item.list.movies
                            )
                          }
                          className={
                            sharedClicked && sharedListId === item.id
                              ? 'relative my-1 flex h-[50px] w-full flex-grow cursor-pointer items-center justify-between rounded-l-md bg-[#132b35] py-2 pl-2 text-white'
                              : 'relative my-1 flex h-[50px] w-full cursor-pointer items-center justify-between rounded-l-md bg-[#1F2933] py-2 pl-2 text-gray-400 hover:bg-[#132b35] hover:text-white'
                          }
                        >
                          <div className='flex flex-grow  items-center justify-start space-x-2'>
                            <div>
                              <Avatar
                                alt={item.list.user.name}
                                src={item.list.user.image}
                                sx={{ width: 40, height: 40 }}
                              />
                            </div>
                            <div>
                              <p className='text-base font-bold'>{item.from}</p>
                              <p className='text-base'> ~ {item.list.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='flex items-center justify-center py-2 text-sm'>
                  <p>No shared lists at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {clickedWatchList || clickedFavorite ? (
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
        ) : sharedClicked ? (
          <div className='mt-10 mb-10 flex w-[80%] flex-col items-center justify-between rounded-md bg-[#161B22] p-4 shadow-md sm:mt-0 sm:w-3/4 sm:flex-grow'>
            <div className='flex w-full justify-between space-x-4 p-2'>
              <div>
                <h2 className='text-md'>List : {csName}</h2>
              </div>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={openS ? 'long-menu' : undefined}
                aria-expanded={openS ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleSClick}
              >
                <DotsVerticalIcon className='h-5' />
              </IconButton>
            </div>
            <Menu
              id='long-menu'
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorElS}
              open={openS}
              onClose={handleSClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '10ch',
                },
              }}
            >
              {option2.map((option) => (
                <MenuItem key={option} onClick={() => handleSClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {sharedMovies.length > 0 ? (
              <div className='mt-6 flex w-full flex-col items-center space-y-6'>
                {sharedClicked &&
                  sharedMovies.map(
                    (item: { id: React.Key | null | undefined }) => (
                      <DataCard
                        data={item}
                        key={item.id}
                        session={session}
                        type='shared'
                        onListDeleteItem={onListDeleteItem}
                      />
                    )
                  )}
              </div>
            ) : (
              <div className='mt-4'>No shared movies.</div>
            )}
          </div>
        ) : clikedList ? (
          <div className='mt-10 mb-10 flex w-[80%] flex-col items-center justify-between rounded-md bg-[#161B22] p-4 shadow-md sm:mt-0 sm:w-3/4 sm:flex-grow'>
            <div className='flex w-full justify-between space-x-4 p-2'>
              <div>
                <h2 className='text-md'>List : {clName}</h2>
              </div>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={openfw ? 'long-menu' : undefined}
                aria-expanded={openfw ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleFWClick}
              >
                <DotsVerticalIcon className='h-5' />
              </IconButton>
            </div>
            <Menu
              id='long-menu'
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorElFw}
              open={openfw}
              onClose={handleFWClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '10ch',
                },
              }}
            >
              {option2.map((option) => (
                <MenuItem key={option} onClick={() => handleFWClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>

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
        ) : (
          ''
        )}
      </div>
      <div>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <AnimatePresence>
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',

                background: 'rgba(18,18,18,0.3)',
                transform: 'inherit',
                translateY: '-50%',
                translateX: '-50%',
              }}
              animate={{
                scale: 1,
                opacity: 1,
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '30%',
                height: '90%',
                background: 'rgba(18,18,18,0.1)',
                transform: 'inherit',
                translateY: '-50%',
                translateX: '-50%',
              }}
              transition={{
                ease: 'easeOut',
                duration: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                top: '-50%',
                left: '-50%',
              }}
              className='overflow-y-scroll scrollbar-hide '
            >
              <Box sx={style}>
                <div className='items center flex flex-col justify-center space-y-4'>
                  {errorTo && (
                    <p
                      className='mt-2 text-sm text-red-300
        '
                    >
                      Receiving email is required!
                    </p>
                  )}
                  {sameError && (
                    <p
                      className='mt-2 text-sm text-red-300
        '
                    >
                      Cannot send to your email!
                    </p>
                  )}
                  <div className='flex flex-col'>
                    <FormLabel>Send to</FormLabel>
                    <Input
                      placeholder='Email to receive'
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleCreate}>Share</Button>
                </div>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Modal>
      </div>
    </>
  );
}
export default Account;
export const getServerSideProps = async (ctx: GetSessionParams | undefined) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
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

  const shared = await prisma?.sharedList.findMany({
    where: {
      to: session.user.email,
    },
    include: {
      list: {
        include: {
          movies: true,
          user: true,
        },
      },
    },
    orderBy: { id: 'desc' },
  });

  return {
    props: {
      session,
      favorite: favorite,
      watchlist: watchlist,
      customLists: lists,
      sharedLists: shared,
    },
  };
};

//  <div
//               className={
//                 clickedWatchList
//                   ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
//                   : 'flex w-1/2 cursor-pointer items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
//               }
//               onClick={handleWatchList}
//             >
//               Watchlist
//             </div>
//             <div
//               className={
//                 clickedFavorite
//                   ? 'flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#1F2933] p-2 text-white '
//                   : 'flex w-1/2 cursor-pointer items-center  justify-center rounded-md p-2 text-gray-400 hover:bg-[#1F2933] active:bg-[#132b35] '
//               }
//               onClick={handleFav}
//             >
//               Favorite
//             </div>

//{
/* <div
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
              </div> */
// }
