import useTime from "hooks/useTime";
import { IoIosLeaf } from "react-icons/io";
import { IoChatbubbleEllipses, IoHeart } from "react-icons/io5";
import { TbArrowBack } from "react-icons/tb";
interface AlarmProps {
  content: string;
  title: string;
  createAt: string;
  type: string;
}

// BOOK_RENTAL_REQUEST, BOOK_RETURN_REMINDER, CHAT
const iconSettings: { [key: string]: { icon: JSX.Element; color: string } } = {
  BOOK_RENTAL_REQUEST: {
    icon: <IoIosLeaf size={24} color="#79AC78" className="mt-1" />,
    color: "#79AC78",
  },
  CHAT: {
    icon: <IoChatbubbleEllipses size={24} color="#5F6F52" className="mt-1" />,
    color: "#5F6F52",
  },
  좋아요: {
    icon: <IoHeart size={24} color="#D96363" className="mt-1" />,
    color: "#D96363",
  },
  BOOK_RETURN_REMINDER: {
    icon: <TbArrowBack size={24} color="#EBCA52" className="mt-1" />,
    color: "#DFAE00",
  },
};

const Alarm = ({ content, title, createAt, type }: AlarmProps) => {
  const { icon, color } = iconSettings[type] || iconSettings["CHAT"];
  const receivedTime = useTime(createAt);

  return (
    <div className="mx-[25px] border-b py-4 flex flex-row">
      {icon}
      <div className="flex flex-col space-y-1 ml-3">
        <p className=" col-span-2 font-semibold" style={{ color: color }}>
          {title}
        </p>
        <p className="row-span-2 font-medium col-span-2 text-xs">{content}</p>
        <p className="col-span-2 text-[10px] text-gray-500">
          {receivedTime}
        </p>{" "}
      </div>
    </div>
  );
};

export default Alarm;
