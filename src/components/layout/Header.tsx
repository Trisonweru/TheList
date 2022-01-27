import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline';

import HeaderItem from './HeaderItem';

export default function Header() {
  return (
    <header className='m-5 flex h-auto flex-col items-center justify-between sm:flex-row'>
      <div className='flex max-w-2xl flex-grow justify-evenly'>
        <HeaderItem title='HOME' Icon={HomeIcon} />
        <HeaderItem title='TRENDING' Icon={LightningBoltIcon} />
        <HeaderItem title='VERIFIED' Icon={BadgeCheckIcon} />
        <HeaderItem title='COLLECTIONS' Icon={CollectionIcon} />
        <HeaderItem title='SEARCH' Icon={SearchIcon} />
        <HeaderItem title='ACCOUNT' Icon={UserIcon} />
      </div>
      <div className='flex items-center'>
        <h1 className='text-gray-300'>TheList</h1>
      </div>
    </header>
  );
}
