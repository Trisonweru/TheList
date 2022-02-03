/* eslint-disable @typescript-eslint/no-explicit-any */
import { XIcon } from '@heroicons/react/outline';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';
import { fetcher } from 'utils/fetcher';

interface props {
  open: boolean;
  onClose: () => void;
  customLists: any;
  data: any;
  session: any;
  setShowSuccessC?: any;
  setShowErrorC?: any;
  showErrorwC?: any;
  showSuccessC?: any;
}

const style = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 2,
};

function CustomModal({
  open,
  data,
  onClose,
  customLists,
  setShowSuccessC,
  setShowErrorC,
}: props) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCustomCreate = async (id: any) => {
    const res = await fetcher('/api/customcreate', { data, session, type: id });
    if (res.id) {
      onClose();
      setShowSuccessC(true);
      setTimeout(() => setShowSuccessC(false), 5000);
    } else {
      setShowErrorC(true);
      setTimeout(() => setShowErrorC(false), 5000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={style}
        className='absolute top-[50%] left-[50%] flex h-auto max-h-[60%] w-[60%] translate-y-[-50%] translate-x-[-50%] transform flex-col items-end justify-start overflow-y-scroll bg-[rgba(0,0,0,1)] px-2 pt-2  pb-2  shadow-xl scrollbar-hide lg:w-[25%]'
      >
        <div className='relative flex flex-wrap items-start '>
          <div className='sticky left-0 top-0 flex w-full items-center justify-between bg-[#1E1E1E] py-1 px-1 shadow-md'>
            <XIcon
              className='h-7 cursor-pointer hover:text-[#52b3da] active:text-red-500'
              onClick={onClose}
            />

            <Button onClick={() => router.push('/create-customlist')}>
              Create new
            </Button>
          </div>
          <div className='mt-4 flex w-full flex-col items-center justify-center space-y-1'>
            {session ? (
              customLists.map(
                (item: {
                  id: React.Key;
                  name:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal;
                }) => {
                  return (
                    <div
                      key={item.id}
                      className='flex w-full cursor-pointer items-center justify-center bg-[#1E1E1E] py-2 hover:bg-[#1F2933]'
                      onClick={() => handleCustomCreate(item.id)}
                    >
                      {item.name}
                    </div>
                  );
                }
              )
            ) : (
              <div className='mt-4 flex items-center justify-center'>
                <Button onClick={() => router.push('/login')}>
                  You need to login to your account.
                </Button>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default CustomModal;
