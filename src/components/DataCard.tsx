/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { fetcher } from 'utils/fetcher';

type props = {
  data: any;
  session?: any;
  type?: string;
  onDelete?: any;
  onListDeleteItem?: any;
};

function DataCard({ data, session, type, onDelete, onListDeleteItem }: props) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  const [wcthd, setWcthd] = useState(data.watched);

  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetcher('/api/delete', {
      data,
      session: session,
      type: type,
    });
    await onDelete(data, type);
  };

  const handleListDeleteItem = async () => {
    const res = await fetcher('/api/listdelete', { data, session: session });
    if (res.id) {
      await onListDeleteItem(data);
    }
  };

  const handleWatched = async () => {
    const res = await fetcher('/api/watched', { data, session, type });
    if (res.status === undefined) {
      setWcthd(true);
      router.reload();
    }
  };
  const handleListItemWatched = async () => {
    const res = await fetcher('/api/customwatched', { data, session });
    if (res.status === undefined) {
      setWcthd(true);
      router.reload();
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
              type === 'watchlist' || type === 'customlist'
                ? 'flex w-full items-center justify-between'
                : 'flex w-full items-center justify-end'
            }
          >
            {type === 'watchlist' && (
              <button
                disabled={wcthd ? true : false}
                className={
                  wcthd
                    ? 'rounded-md bg-[#1F2933] px-6 py-1.5 text-[#316c85]'
                    : 'rounded-md bg-[#316c85] px-6 py-1.5'
                }
                onClick={handleWatched}
              >
                Watched
              </button>
            )}

            {type === 'customlist' && (
              <button
                disabled={wcthd ? true : false}
                className={
                  wcthd
                    ? 'rounded-md bg-[#1F2933] px-6 py-1.5 text-[#316c85]'
                    : 'rounded-md bg-[#316c85] px-6 py-1.5'
                }
                onClick={handleListItemWatched}
              >
                Watched
              </button>
            )}
            {type === 'shared' && (
              <button
                disabled={true}
                className='rounded-md bg-[#1F2933] px-6 py-1.5 text-[#316c85]'
                onClick={handleListItemWatched}
              >
                {wcthd ? 'Watched' : 'Not watched'}
              </button>
            )}
            {type === 'watchlist' || type === 'favorite' ? (
              <div>
                <Button onClick={handleDelete}>Delete</Button>
              </div>
            ) : (
              ''
            )}
            {type === 'customlist' && (
              <div>
                <Button onClick={handleListDeleteItem}>Delete</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DataCard;
