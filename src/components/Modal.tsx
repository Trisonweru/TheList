/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { BookmarkIcon, HeartIcon, XIcon } from '@heroicons/react/outline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import React from 'react';
import { fetcher } from 'utils/fetcher';

import HeaderItem from './layout/HeaderItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 2,
};
function Mod({ open, handleClose, data }: any) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  const { data: session } = useSession();

  const handleFavorite = async () => {
    const res = await fetcher('/api/favorite', { data, session });
    console.log(res);
  };
  const handleWatchlist = async () => {
    const res = await fetcher('/api/watchlist', { data, session });
    console.log(res);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='overflow-y-scroll scrollbar-hide '>
        <div className='relative flex flex-wrap items-start '>
          <div className='sticky top-0 left-0 right-0 z-50 m-3 flex w-full justify-end'>
            <XIcon
              className='h-8 cursor-pointer hover:text-[#52b3da] active:text-red-500'
              onClick={handleClose}
            />
          </div>
          <div className='w-3/4 flex-grow'>
            <Image
              layout='responsive'
              src={
                `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                `${BASE_URL}${data.poster_path}`
              }
              height={1080}
              width={1920}
              objectFit='contain'
              alt={data.title || data.original_name}
            />
          </div>
          <div className='flex flex-col pr-2 sm:max-w-4xl '>
            <h1 className='text-xlg my-2 text-[#52b3da]'>
              {data.title || data.original_name}
            </h1>
            <p className='my-2'>{data.overview}</p>
            <div className='my-4 flex-wrap whitespace-nowrap border border-[#52b3da] sm:flex sm:items-center sm:justify-evenly sm:space-x-10 '>
              {data.release_date && (
                <div className='flex items-start'>
                  <p className='my-2 mx-2'>
                    Released:{' '}
                    <span className='text-[#52b3da]'>{data.release_date}</span>
                  </p>
                </div>
              )}
              {data.vote_count && (
                <div className='flex  items-start'>
                  <p className='my-2 mx-2'>
                    Vote count:{' '}
                    <span className='text-[#52b3da]'>{data.vote_count}</span>
                  </p>
                </div>
              )}
              {data.vote_count && (
                <div className='flex items-start'>
                  <p className='my-2 mx-2'>
                    Vote average:{' '}
                    <span className='text-[#52b3da]'>{data.vote_count}</span>
                  </p>
                </div>
              )}
              {data.popularity && (
                <div className='flex  items-start'>
                  <p className='my-2 mx-2'>
                    Popularity:{' '}
                    <span className='text-[#52b3da]'>{data.popularity}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='mt-4 flex h-full  items-end'>
            <div className='pl-2' onClick={handleFavorite}>
              <HeaderItem title='Favorite' Icon={HeartIcon} url='' />
            </div>
            <div className='pl-2' onClick={handleWatchlist}>
              <HeaderItem title='Add to watchlist' Icon={BookmarkIcon} url='' />
            </div>
          </div>
          <div className='flex w-full'>
            <div className='w-12 pt-2 sm:w-20'>
              <FacebookShareButton
                url={
                  `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                  `${BASE_URL}${data.poster_path}`
                }
                quote={data.title || data.original_name}
                hashtag={`#${data.title || data.original_name}`}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            <div className='w-12 pt-2 sm:w-20'>
              <RedditShareButton
                url={
                  `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                  `${BASE_URL}${data.poster_path}`
                }
                title={data.title || data.original_name}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
            <div className='w-12 pt-2 sm:w-20'>
              <LinkedinShareButton
                url={
                  `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                  `${BASE_URL}${data.poster_path}`
                }
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
            <div className='w-12 pt-2 sm:w-20'>
              <EmailShareButton
                url={
                  `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                  `${BASE_URL}${data.poster_path}`
                }
                subject={data.title || data.original_name}
                body={data.overview}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <div className='w-12 pt-2 sm:w-20'>
              <WhatsappShareButton
                url={
                  `${BASE_URL}${data.backdrop_path || data.poster_path}` ||
                  `${BASE_URL}${data.poster_path}`
                }
                title={data.title || data.original_name}
                separator=':: '
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Mod;
