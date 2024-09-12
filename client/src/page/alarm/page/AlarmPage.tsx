import Alarm from "../components/Alarm";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const AlarmPage = () => {
  const alarmHistoryArray = [
    {type: "대출 신청", message: "김도영님이 ‘당신이 누군가를 죽였다’ 책에 대출을 신청했습니다.", time: new Date()},
    {type: "대출 신청", message: "김도영님이 ‘당신이 누군가를 죽였다’ 책에 대출을 신청했습니다.", time: "2024-09-10T09:30:00"},
    {type: "대출 가능", message: "예약하신 ‘당신이 누군가를 죽였다’ 책이 대출 가능합니다.", time: "2024-09-10T07:30:00"},
    {type: "좋아요", message: "김도영님이 회원님의 책장을 좋아합니다. ", time: "2024-09-09T14:30:00"},
    {type: "반납 7일전", message: "대출하신 ‘당신이 누군가를 죽였다’ 외 3권의 반납 7일 전 입니다.", time: "2024-09-09T08:30:00"},
    {type: "반납 3일전", message: "대출하신 ‘당신이 누군가를 죽였다’ 외 3권의 반납 3일 전 입니다.", time: "2024-07-09T08:30:00"},
    {type: "반납 1일전", message: "대출하신 ‘당신이 누군가를 죽였다’ 외 3권의 반납 1일 전 입니다.", time: "2023-09-08T09:30:00"},
  ]

  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
    };

  return (
    <div>
      <div className="flex flex-row mx-[25px] mb-6">
        <button onClick={goBack}>
          <IoIosArrowBack />
        </button>
        <p className="text-[20px] font-extrabold ml-2">알림</p>

      </div>
      

       {alarmHistoryArray.map((item, index) => {
          return <Alarm key={index} type={item.type} message={item.message} time={new Date(item.time)}  />
        })}
    </div>
  );
};

export default AlarmPage;
