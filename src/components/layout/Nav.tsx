import { useRouter } from 'next/router';
import request from 'utils/request';
const Nav = () => {
  const router = useRouter();
  return (
    <nav className='relative'>
      <div className=' flex space-x-10  overflow-x-scroll whitespace-nowrap px-10 scrollbar-hide sm:space-x-20 sm:px-20'>
        {Object.entries(request).map(([key, { title }], index) => {
          return (
            <h2
              key={index}
              onClick={() => router.push(`/?genre=${key.toString()}`)}
              className='transform cursor-pointer text-base transition duration-100  last:pr-24  hover:scale-125 hover:text-white active:text-red-500'
            >
              {title}
            </h2>
          );
        })}
      </div>
      <div className='absolute top-0 right-0 h-10 w-1/12 bg-gradient-to-l from-[#121212]' />
    </nav>
  );
};

export default Nav;
