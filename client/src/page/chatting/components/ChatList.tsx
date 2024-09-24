import { useNavigate } from 'react-router-dom';

interface ChatListProps {
  roomId: number;
}

const ChatList = ({ roomId }: ChatListProps) => {
  const navigate = useNavigate();

  const goChattingRoom = () => {
    console.log('채팅방으로 이동');
    navigate(`/chat/${roomId}`);
  };

  return (
    <div
      className='border-b-[1px] flex flex-row justify-between items-center px-3 py-5'
      onClick={goChattingRoom}
    >
      <div className='flex flex-row items-center'>
        <img
          src='하니.png'
          alt='프로필 사진'
          className='rounded-full w-12 h-12 mr-4'
        />
        <div className='flex flex-col'>
          <div className='flex flex-row font-bold items-center'>
            <span className='mr-2'>하니</span>
            <span className='text-black/60 text-sm'>장덕동 · 2분 전</span>
          </div>
          <span className='mt-1'>책 대여 신청합니다.</span>
        </div>
      </div>
      <img
        src='chemistry.png'
        alt='책 찍은 사진'
        className='w-14 h-14 rounded-lg'
      />
    </div>
  );
};

export default ChatList;
