import { IoIosLeaf } from "react-icons/io";

const ReturnComplete = () => {
  return (
    <div className="w-[200px] h-[130px] border-2 border-[#B9B7B7] rounded-xl flex flex-col items-center justify-center space-y-3">
      <div className="flex space-x-7">
        <span className="font-bold mt-2">반납 완료</span>
        <IoIosLeaf color="#79AC78" size={50} />
      </div>
      <div className="border-[0.5px] border-[#5F6F52] w-5/6" />
      <p className="text-[#5F6F52]">
        <span className="text-lg mr-2 font-bold">반납일</span> 2024.10.01
      </p>
    </div>
  );
};

export default ReturnComplete;
