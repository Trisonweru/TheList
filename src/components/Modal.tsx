/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {
  BookmarkIcon,
  HeartIcon,
  SaveAsIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { AnimatePresence, motion } from 'framer-motion';
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
import React, { useState } from 'react';
import { fetcher } from 'utils/fetcher';

import CustomModal from './CustomModal';
import HeaderItem from './layout/HeaderItem';
import Notification from './Notification';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 2,
};
function Mod({ open, handleClose, data, customLists }: any) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  const { data: session } = useSession();
  const [showSuccessf, setShowSuccessf] = useState(false);
  const [showErrorf, setShowErrorf] = useState(false);
  const [showSuccessw, setShowSuccessw] = useState(false);
  const [showErrorw, setShowErrorw] = useState(false);
  const [customModal, setCustomModal] = useState(false);
  const [showSuccessC, setShowSuccessC] = useState(false);
  const [showErrorwC, setShowErrorC] = useState(false);

  const handleFavorite = async (e: any) => {
    e.preventDefault();
    const res = await fetcher('/api/favorite', { data, session });

    if (res.status === undefined) {
      setShowSuccessf(true);
      setTimeout(() => setShowSuccessf(false), 5000);
    } else {
      setShowErrorf(true);
      setTimeout(() => setShowErrorf(false), 5000);
    }
  };
  const handleWatchlist = async (e: any) => {
    e.preventDefault();
    const res = await fetcher('/api/watchlist', { data, session });
    if (res.status === undefined) {
      setShowSuccessw(true);
      setTimeout(() => setShowSuccessw(false), 5000);
    } else {
      setShowErrorw(true);
      setTimeout(() => setShowErrorw(false), 5000);
    }
  };
  const handleCustomList = () => setCustomModal(true);
  const handleCloseCustomList = () => setCustomModal(false);
  return (
    <>
      <AnimatePresence>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              height: '90%',
              background: 'rgba(18,18,18,0.3)',
              transform: 'inherit',
              translateY: '-50%',
              translateX: '-50%',
            }}
            animate={{
              scale: 1,
              opacity: 1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              height: '90%',
              background: 'rgba(18,18,18,0.3)',
              transform: 'inherit',
              translateY: '-50%',
              translateX: '-50%',
            }}
            transition={{
              ease: 'easeOut',
              duration: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              top: '-50%',
              left: '-50%',
            }}
            className='overflow-y-scroll scrollbar-hide '
          >
            <Box sx={style} className='overflow-y-scroll scrollbar-hide '>
              <div className='relative flex flex-wrap items-start '>
                <Notification
                  showSuccessf={showSuccessf}
                  showErrorf={showErrorf}
                  showSuccessw={showSuccessw}
                  showErrorw={showErrorw}
                  title={data.title || data.original_name}
                  showErrorwC={showErrorwC}
                  showSuccessC={showSuccessC}
                />
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
                          <span className='text-[#52b3da]'>
                            {data.release_date}
                          </span>
                        </p>
                      </div>
                    )}
                    {data.vote_count && (
                      <div className='flex  items-start'>
                        <p className='my-2 mx-2'>
                          Vote count:{' '}
                          <span className='text-[#52b3da]'>
                            {data.vote_count}
                          </span>
                        </p>
                      </div>
                    )}
                    {data.vote_count && (
                      <div className='flex items-start'>
                        <p className='my-2 mx-2'>
                          Vote average:{' '}
                          <span className='text-[#52b3da]'>
                            {data.vote_count}
                          </span>
                        </p>
                      </div>
                    )}
                    {data.popularity && (
                      <div className='flex  items-start'>
                        <p className='my-2 mx-2'>
                          Popularity:{' '}
                          <span className='text-[#52b3da]'>
                            {data.popularity}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-4 flex h-full  items-end'>
                  <div className='pl-2' onClick={handleFavorite}>
                    <HeaderItem title='Add to Favorite' Icon={HeartIcon} />
                  </div>
                  <div className='pl-2' onClick={handleWatchlist}>
                    <HeaderItem title='Add to Watchlist' Icon={BookmarkIcon} />
                  </div>
                  <div className='pl-2' onClick={handleCustomList}>
                    <HeaderItem title='Add to Custom List' Icon={SaveAsIcon} />
                  </div>
                </div>
                <div className='flex w-full'>
                  <div className='w-12 pt-2 sm:w-20'>
                    <FacebookShareButton
                      url={
                        `${BASE_URL}${
                          data.backdrop_path || data.poster_path
                        }` || `${BASE_URL}${data.poster_path}`
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
                        `${BASE_URL}${
                          data.backdrop_path || data.poster_path
                        }` || `${BASE_URL}${data.poster_path}`
                      }
                      title={data.title || data.original_name}
                    >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </div>
                  <div className='w-12 pt-2 sm:w-20'>
                    <LinkedinShareButton
                      url={
                        `${BASE_URL}${
                          data.backdrop_path || data.poster_path
                        }` || `${BASE_URL}${data.poster_path}`
                      }
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </div>
                  <div className='w-12 pt-2 sm:w-20'>
                    <EmailShareButton
                      url={
                        `${BASE_URL}${
                          data.backdrop_path || data.poster_path
                        }` || `${BASE_URL}${data.poster_path}`
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
                        `${BASE_URL}${
                          data.backdrop_path || data.poster_path
                        }` || `${BASE_URL}${data.poster_path}`
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
          </motion.div>
        </Modal>
      </AnimatePresence>
      <CustomModal
        open={customModal}
        onClose={handleCloseCustomList}
        customLists={customLists}
        data={data}
        session={session}
        setShowSuccessC={setShowSuccessC}
        setShowErrorC={setShowErrorC}
        showSuccessC={showSuccessC}
        showErrorwC={showErrorwC}
      />
    </>
  );
}
export default Mod;
