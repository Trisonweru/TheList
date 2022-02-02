/* eslint-disable @next/next/link-passhref */

import React from 'react';

import Thumbnail from './Thumbnail';

function Results({ results, customLists }: any) {
  return (
    <div className='my-10 flex-wrap justify-center px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex'>
      {results.map((item: any) => {
        return (
          <Thumbnail result={item} key={item.id} customLists={customLists} />
        );
      })}
    </div>
  );
}

export default Results;
