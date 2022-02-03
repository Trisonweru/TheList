import React from 'react';

interface props {
  showSuccessf?: boolean;
  showSuccessw?: boolean;
  title?: string;
  showErrorf?: boolean;
  showErrorw?: boolean;
  showErrorwC?: any;
  showSuccessC?: any;
}

function Notification({
  showSuccessf,
  showSuccessw,
  title,
  showErrorf,
  showErrorw,
  showSuccessC,
  showErrorwC,
}: props) {
  return (
    <>
      {showSuccessf && (
        <div className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end'>
          <div className='flex min-h-[50px] max-w-[25%]  items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>{title} added to your list</p>
          </div>
        </div>
      )}
      {showSuccessw && (
        <div className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end'>
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center  justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>{title} added to your list</p>
          </div>
        </div>
      )}
      {showSuccessC && (
        <div className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end'>
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center  justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>{title} added to your list</p>
          </div>
        </div>
      )}
      {showErrorf && (
        <div className='absolute bottom-0 left-0 right-0 z-50  mb-4 flex w-full justify-end'>
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>Could not add to your list</p>
          </div>
        </div>
      )}
      {showErrorw && (
        <div className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end'>
          <div className='flex h-auto min-h-[50px] max-w-[50%] items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>Could not add to your list</p>
          </div>
        </div>
      )}
      {showErrorwC && (
        <div className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end'>
          <div className='flex h-auto min-h-[50px] max-w-[50%] items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p>Could not add to your list</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
