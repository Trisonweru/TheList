import { signIn } from 'next-auth/react';
import React from 'react';

function GoogleButton() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div
        className='flex cursor-pointer flex-row rounded-xl border bg-[#121212] p-4 shadow-xl'
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </div>
    </div>
  );
}

export default GoogleButton;
