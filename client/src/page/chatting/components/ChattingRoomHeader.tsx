import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

interface ChattingRoomHeaderProps {
  ownerName: string;
  customerName: string;
}

const ChattingRoomHeader = ({
  ownerName,
  customerName,
}: ChattingRoomHeaderProps) => {
  const navigate = useNavigate();
  const nickname = useUserStore().nickname;
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer py-4 mx-[25px] flex flex-row items-center justify-between"
    >
      <IoChevronBack size={25} color="#545454" />
      <span className="font-bold text-xl text-center">
        {nickname === ownerName ? customerName : ownerName}
      </span>
      <div />
    </div>
  );
};

export default ChattingRoomHeader;
