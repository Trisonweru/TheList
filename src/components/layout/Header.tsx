import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  UserIcon,
} from '@heroicons/react/outline';

import HeaderItem from './HeaderItem';
type props = {
  disp?: boolean;
};
function Header({ disp }: props) {
  return (
    <header className=' flex h-auto flex-col items-center justify-between pt-5 pb-5 sm:flex-row'>
      <div className='flex max-w-2xl flex-grow justify-evenly'>
        <HeaderItem title='HOME' Icon={HomeIcon} url='/' />
        <HeaderItem
          title='TRENDING'
          Icon={LightningBoltIcon}
          url='/?genre=fetchTreding'
        />
        <HeaderItem title='VERIFIED' Icon={BadgeCheckIcon} url='/' />
        <HeaderItem title='COLLECTIONS' Icon={CollectionIcon} url='/' />

        <HeaderItem title='ACCOUNT' Icon={UserIcon} url='/account' />
      </div>
      {disp && (
        <div className='bg mr-4 flex items-center border py-0 px-2 shadow-md backdrop-blur-md backdrop-brightness-50 backdrop-grayscale backdrop-filter  '>
          <h1 className='text-gray-300'>TheList</h1>
        </div>
      )}
    </header>
  );
}
export default Header;
