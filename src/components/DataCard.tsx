/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Button } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { fetcher } from 'utils/fetcher';

type props = {
  data: any;
  session: any;
  type: string;
  onDelete: any;
};

function DataCard({ data, session, type, onDelete }: props) {
  const [watched, setWatched] = useState(data.watched);
  const BASE_URL = 'https://image.tmdb.org/t/p/original';

  const handleDelete = async () => {
    const res = await fetcher('/api/delete', {
      data,
      session: session,
      type: type,
    });
    await onDelete(data, type);
  };

  const handleWatched = async () => {
    const res = await fetcher('/api/watched', { data, session });
    if (res.status === undefined) {
      setWatched(true);
    }
  };

  return (
    <>
      <div className='flex w-full transform flex-wrap items-center px-4 py-1 shadow-xl transition duration-200  ease-in hover:z-50 sm:hover:scale-105'>
        <div className='sm:w-1/4 '>
          <Image
            src={`${BASE_URL}${data.image}`}
            width={1080}
            height={800}
            layout='intrinsic'
            alt={data.title}
            objectFit='cover'
          />
        </div>
        <div className='flex h-full flex-1 flex-col items-start space-y-2 sm:ml-4'>
          <div>
            <h3 className='text-lg text-[#52b3da]'>{data.title}</h3>
          </div>
          <div>
            <p className='max-w-2/3 text-sm'>{data.overview}</p>
          </div>
          <div
            className={
              type === 'watchlist'
                ? 'flex w-full items-center justify-between'
                : 'flex w-full items-center justify-end'
            }
          >
            {type === 'watchlist' && (
              <button
                disabled={watched ? true : false}
                className={
                  watched
                    ? 'rounded-md bg-[#1F2933] px-6 py-1.5 text-[#316c85]'
                    : 'rounded-md bg-[#316c85] px-6 py-1.5'
                }
                onClick={handleWatched}
              >
                Watched
              </button>
            )}
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataCard;
