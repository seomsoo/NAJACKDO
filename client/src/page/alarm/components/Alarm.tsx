import { IoIosLeaf } from 'react-icons/io';
import { TbBellRingingFilled } from 'react-icons/tb';
import { IoHeart } from 'react-icons/io5';
import { TbArrowBack } from 'react-icons/tb';

interface AlarmProps {
  type: string;
  message: string;
  time: Date;
}

const iconSettings: { [key: string]: { icon: JSX.Element; color: string } } = {
  '대출 신청': {
    icon: <IoIosLeaf size={24} color='#79AC78' />,
    color: '#79AC78',
  },
  '대출 가능': {
    icon: <TbBellRingingFilled size={24} color='#5F6F52' />,
    color: '#5F6F52',
  },
  좋아요: { icon: <IoHeart size={24} color='#D96363' />, color: '#D96363' },
  반납: { icon: <TbArrowBack size={24} color='#EBCA52' />, color: '#DFAE00' },
};

// 시간 차이
const getTimeDifference = (time: Date): string => {
  const now = new Date();

  const diffYears = now.getFullYear() - time.getFullYear();
  const diffMonths = now.getMonth() - time.getMonth();
  const diffDays = now.getDate() - time.getDate();
  if (diffYears > 0) {
    return `${diffYears}년 전`;
  } else if (diffMonths > 0) {
    return `${diffMonths}달 전`;
  } else if (diffDays > 0) {
    return `${diffDays}일 전`;
  }

  const diffMs = now.getTime() - new Date(time).getTime(); // 시간 차
  const diffSeconds = Math.floor(diffMs / 1000); // 초
  const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 분
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간

  if (diffSeconds < 60) {
    return '1분 전'; // 1분 이내면 1분 전으로 통일
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    return `${diffDays}일 전`;
  }
};

const Alarm = ({ type, message, time }: AlarmProps) => {
  const { icon, color } = iconSettings[type] || iconSettings['반납'];
  const timeDifference = getTimeDifference(time); // 시간 차이 계산

  return (
    <div className='mx-6 border-b py-4 flex flex-row'>
      {icon}&nbsp;
      <div className='flex flex-col gap-1'>
        <p className=' col-span-2 font-semibold' style={{ color: color }}>
          {type}
        </p>
        <p className='row-span-2 font-medium col-span-2 text-xs'>{message}</p>
        <p className='col-span-2  text-[10px]'>{timeDifference}</p>{' '}
        {/* 시간 차이 표시 */}
      </div>
    </div>
  );
};

export default Alarm;
