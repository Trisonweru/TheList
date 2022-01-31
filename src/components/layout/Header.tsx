import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  UserIcon,
} from '@heroicons/react/outline';

import HeaderItem from './HeaderItem';

function Header() {
  return (
    <header className='m-5 flex h-auto flex-col items-center justify-between sm:flex-row'>
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
      <div className='flex items-center'>
        <h1 className='text-gray-300'>TheList</h1>
      </div>
    </header>
  );
}
export default Header;
