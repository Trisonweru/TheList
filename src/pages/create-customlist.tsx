import { Button, Input } from '@mui/material';
import { useRouter } from 'next/router';
import { getSession, GetSessionParams } from 'next-auth/react';
import React, { useState } from 'react';
import { fetcher } from 'utils/fetcher';

import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';

function CustomList({ session }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleCreate = async () => {
  if(name !== ""){
      const res = await fetcher('/api/create-list', { data: name, session });
    if (res.id) {
      setName('');
      return router.back();
    }
  }
  else{
    setError(true)
  }
  };
  return (
    <>
      <Seo templateTitle='Create Custom-List'></Seo>

      <div className='flex min-h-screen w-full flex-col items-center justify-start pt-[10%]'>
        <Header disp={false} />
        <div className='mt-[50px] flex w-[80%] flex-col items-center justify-center space-y-4 rounded-md bg-[#1E1E1E] p-4 shadow-xl md:w-[30%]'>
          <h2 className='whitespace-nowrap text-xl'>Create Custom List</h2>
          <div className='flex w-full flex-col space-y-4'>
        {error && <p className="mt-2 mb-1 text-red-300 text-sm">Name is required!</p>}
            <Input
              placeholder='Custom list name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomList;

export const getServerSideProps = async (ctx: GetSessionParams | undefined) => {
  const session = await getSession(ctx);
  // const prisma = new PrismaClient();

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
    },
  };
};
