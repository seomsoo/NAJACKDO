import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface ChattingRoomHeaderProps {
  roomId: number;
}

const ChattingRoomHeader = ({ roomId }: ChattingRoomHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer py-4 mx-[25px] flex flex-row items-center justify-between"
    >
      <IoChevronBack size={25} color="#545454" />
      <span className="font-bold text-xl ml-2 text-center">
        {roomId} 채팅방
      </span>
      <div />
    </div>
  );
};

export default ChattingRoomHeader;
