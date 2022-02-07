import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence>
      {showSuccessf && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex min-h-[50px] max-w-[25%]  items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>{title} added to your list</p>
          </div>
        </motion.div>
      )}
      {showSuccessw && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center  justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>{title} added to your list</p>
          </div>
        </motion.div>
      )}
      {showSuccessC && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center  justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>{title} added to your list</p>
          </div>
        </motion.div>
      )}
      {showErrorf && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50  mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex h-auto min-h-[50px] max-w-[50%]  items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>Could not add to your list</p>
          </div>
        </motion.div>
      )}
      {showErrorw && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex h-auto min-h-[50px] max-w-[50%] items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>Could not add to your list</p>
          </div>
        </motion.div>
      )}
      {showErrorwC && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          exit={{ y: '100%', opacity: 0 }}
          className='absolute bottom-0 left-0 right-0 z-50 mb-4 flex w-full justify-end shadow-md'
        >
          <div className='flex h-auto min-h-[50px] max-w-[50%] items-center justify-between bg-green-500 px-3 shadow-xl sm:max-w-[25%]'>
            <p className='text-center'>Could not add to your list</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
