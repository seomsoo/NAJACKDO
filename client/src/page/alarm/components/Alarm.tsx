import { IoIosLeaf } from 'react-icons/io';
import { TbBellRingingFilled } from 'react-icons/tb';
import { IoHeart } from 'react-icons/io5';
import { TbArrowBack } from 'react-icons/tb';
import useTime from 'hooks/useTime';
interface AlarmProps {
  userId: number;
  content: string;
  title: string;
  createAt: string;
  updateAt: string;
  type: string;
}

// BOOK_RENTAL_REQUEST, BOOK_RETURN_REMINDER, CHAT
const iconSettings: { [key: string]: { icon: JSX.Element; color: string } } = {
  'BOOK_RENTAL_REQUEST': {
    icon: <IoIosLeaf size={24} color='#79AC78' />,
    color: '#79AC78',
  },
  'CHAT': {
    icon: <TbBellRingingFilled size={24} color='#5F6F52' />,
    color: '#5F6F52',
  },
  좋아요: { 
    icon: <IoHeart size={24} color='#D96363' />, 
    color: '#D96363' 
  },
  BOOK_RETURN_REMINDER: { 
    icon: <TbArrowBack size={24} color='#EBCA52' />, 
    color: '#DFAE00' 
  },
};



const Alarm = ({ userId, content, title, createAt, updateAt, type }: AlarmProps) => {
  const { icon, color } = iconSettings[type] || iconSettings['CHAT'];
  const receivedTime = useTime(createAt);

  return (
    <div className='mx-6 border-b py-4 flex flex-row'>
      {icon}&nbsp;
      <div className='flex flex-col gap-1'>
        <p className=' col-span-2 font-semibold' style={{ color: color }}>
          {title}
        </p>
        <p className='row-span-2 font-medium col-span-2 text-xs'>{content}</p>
        <p className='col-span-2  text-[10px]'>{receivedTime}</p>{' '}
      </div>
    </div>
  );
};

export default Alarm;
