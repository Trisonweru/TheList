import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Search() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const genre = router.query.genre;
  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };
  const handleSearchBtn = () => {
    if (title !== '') {
      router.push(`/?genre=${genre}&search=${title}`);
      setTitle('');
    } else {
      setError(true);
    }
  };
  return (
    <div className='flex w-full items-center justify-center py-10'>
      <div className='flex w-[70%]  rounded-md border-2 border-gray-200'>
        <input
          type='text'
          className='focus:shadow-outline w-full rounded-l-md px-4 py-2 text-base text-gray-700 focus:border-[#132b35] focus:outline-none'
          placeholder='Search a category...'
          value={title}
          onChange={handleSearch}
        />
        <button
          className='rounded-r-md border-l bg-[#3a84a3] px-4 text-white'
          onClick={handleSearchBtn}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
