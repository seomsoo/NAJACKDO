import { IoIosArrowBack } from "react-icons/io";
import Review from "../components/Review";

import { useNavigate } from 'react-router-dom';

const GradePage = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
      };
    const reviewArray = [
    {count : 1, comment : "시간 약속을 안 지켜요."},
    {count : 22, comment : "시간 약속을 안 지켜요."},
    {count : 3, comment : "시간 약속을 안 지켜요."},
  ]

  return (
    <div className='px-[24px]'>
      <button onClick={goBack}>
        <IoIosArrowBack />
      </button>
      <div className="flex flex-row justify-start">
        <p className="text-xl font-semibold font-['Pretendard']">{"서민수"}님의&nbsp;</p>
        <p className="text-xl font-semibold font-['Pretendard'] text-[#79AC78]">신뢰 나무</p>
      </div>

      {/* 신뢰 나무 */}
      <div className="mt-7 flex justify-center">
        <div className="w-[167px] h-[167px] rounded-full bg-[#ebe3d5]/30 flex items-center justify-center">
          <img className="rounded-full" src="https://placehold.co/120x120" alt="grade-bg" />
        </div>
      </div>
      <p className="mt-3 mb-3 text-center text-xl font-medium font-['Pretendard']">{"55점"}</p>

      <div className="mt-3 flex justify-center">
        <div className="w-[340px] p-3 rounded-lg bg-[#79AC78]/20">
          <p className="text-[15px] font-medium font-['Pretendard']">받은 매너 칭찬</p>
          {reviewArray.map((item, index) => {
            return <Review key={index} count={item.count} comment={item.comment}/>
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <div className="w-[340px] p-3 rounded-lg bg-[#B99470]/20">
          <p className="text-[15px] font-medium font-['Pretendard']">받은 비매너</p>
          {reviewArray.map((item, index) => {
            return <Review key={index} count={item.count} comment={item.comment}/>
          })}
        </div>
      </div>
      

    </div>
  );
};

export default GradePage;
