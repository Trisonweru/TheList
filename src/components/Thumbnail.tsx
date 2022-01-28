/* eslint-disable jsx-a11y/alt-text */
import { ThumbUpIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';

import Mod from './Modal';

const Thumbnail = React.forwardRef(({ result }: any, ref) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      onClick={handleOpen}
      className='group transform cursor-pointer p-2 transition duration-200 ease-in hover:z-50 sm:hover:scale-105'
    >
      <Image
        layout='responsive'
        src={
          `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
          `${BASE_URL}${result.poster_path}`
        }
        height={1080}
        width={1920}
      />
      <div className='p-2'>
        <p className='max-w-md truncate'>{result.overview}</p>
        <h2 className='mt-1 text-xl text-white transition-all duration-100 ease-in-out group-hover:font-bold'>
          {result.title || result.original_name}
        </h2>
        <div className='my-2 flex items-center justify-between'>
          <p className='flex items-center opacity-0 group-hover:opacity-100'>
            {result.media_type && `${result.media_type}`}{' '}
            {result.release_date || result.first_air_date}
            {'  '}
            <ThumbUpIcon className='mx-2 h-5' />
            {result.vote_count}
          </p>
        </div>
      </div>
      <Mod open={open} handleClose={handleClose} data={result} />
    </div>
  );
});

export default Thumbnail;
