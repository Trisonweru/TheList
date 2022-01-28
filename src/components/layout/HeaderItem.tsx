interface props {
  title: string;
  Icon: any;
}
const HeaderItem = ({ title, Icon }: props) => {
  return (
    <div className='group flex w-12 cursor-pointer flex-col items-center hover:text-white sm:w-20'>
      <Icon className='mb-1 h-6 group-hover:animate-bounce' />
      <p className='whitespace-nowrap tracking-widest opacity-0 group-hover:opacity-100 '>
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
