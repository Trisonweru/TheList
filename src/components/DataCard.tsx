/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { fetcher } from 'utils/fetcher';
type props = {
  data: any;
  session: any;
  type: string;
  onDelete: any;
};

function DataCard({ data, session, type, onDelete }: props) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';

  const handleDelete = async () => {
    const res = await fetcher('/api/delete', {
      data,
      session: session,
      type: type,
    });
    console.log(res);
    await onDelete(data, type);
  };

  return (
    <>
    
        <div className='flex w-full flex-wrap items-center px-2 py-1 shadow-xl'>
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
              <p>{data.overview}</p>
            </div>
            <div className='flex w-full items-center justify-end'>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      
       
      
    </>
  );
}

export default DataCard;
