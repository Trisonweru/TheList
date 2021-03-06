/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
interface props {
  title: string;
  Icon: any;
  url?: string;
}
const HeaderItem = ({ title, Icon, url }: props) => {
  const router = useRouter();
  return (
    <div
      onClick={url ? () => router.push(url) : null}
      className='group flex w-14 cursor-pointer flex-col items-center space-y-4 hover:text-white sm:w-20'
    >
      <Icon className='mb-1 h-6 group-hover:animate-bounce' />
      <p className='whitespace-nowrap tracking-widest opacity-0 group-hover:opacity-100 '>
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
