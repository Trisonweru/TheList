import { getSession, GetSessionParams } from 'next-auth/react';
import React from 'react';

import GoogleButton from '@/components/googlebutton/googlebutton';
import Seo from '@/components/Seo';

function login() {
  return (
    <>
      <Seo templateTitle='Sign in' />
      <GoogleButton />
    </>
  );
}

export default login;

export const getServerSideProps = async (ctx: GetSessionParams | undefined) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
