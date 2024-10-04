import { useState } from "react";
import { IoIosArrowBack, IoIosLeaf } from "react-icons/io";

import { useNavigate } from "react-router-dom";

const LeafChargePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [charge, setcharge] = useState(0);
  const selectAmount = (amount: number) => {
    setcharge(amount);
  };

  return (
    <div className="mx-[25px] mt-6">
      <button onClick={goBack}>
        <IoIosArrowBack />
      </button>
      <div className="flex flex-row justify-start my-5">
        <p className="text-xl font-semibold  text-sub8">책잎&nbsp;</p>
        <p className="text-xl font-semibold ">충전하기</p>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <IoIosLeaf size={30} color="#79AC78" />
          <p className="text-[25px] text-sub7 font-semibold">책잎 충전</p>
        </div>
      </div>

      <div className="w-full h-[40px] mx-auto my-6 px-2 bg-white/50 rounded-lg  font-medium flex flex-row justify-end items-center">
        {charge.toLocaleString()}&nbsp;책잎
      </div>
      <div className="flex flex-row justify-around">
        <button
          onClick={() => selectAmount(5000)}
          className="w-[90px] h-[33px] bg-sub6 rounded-lg  font-medium text-white"
        >
          5,000원
        </button>
        <button
          onClick={() => selectAmount(10000)}
          className="w-[90px] h-[33px] bg-sub6 rounded-lg  font-medium text-white"
        >
          10,000원
        </button>
        <button
          onClick={() => selectAmount(20000)}
          className="w-[90px] h-[33px] bg-sub6 rounded-lg  font-medium text-white"
        >
          20,000원
        </button>
      </div>
      <button className="w-full h-[40px] mx-auto my-6 bg-sub7 rounded-lg  font-medium text-white">
        충전하기
      </button>
    </div>
  );
};

export default LeafChargePage;
