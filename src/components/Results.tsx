import FlipMove from 'react-flip-move';

import Thumbnail from './Thumbnail';

function Results({ results }: any) {
  return (
    <FlipMove className='my-10 flex-wrap justify-center px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex'>
      {results.map((item: any) => {
        return <Thumbnail key={item.id} result={item} />;
      })}
    </FlipMove>
  );
}

export default Results;
