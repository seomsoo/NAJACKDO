import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import ApplyGuide from "page/bookapply/components/ApplyGuide";
import TextApply from "page/bookapply/components/TextApply";
import { IoChevronBack } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ApplyPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록</span>
      </div>
      <ApplyGuide />
      <div className="flex flex-row justify-center pt-12">
        <Popover>
          <PopoverTrigger className="bg-sub7 text-white font-bold w-[153px] h-[54px] rounded-xl mx-2">
            도서 단일 등록
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="font-bold border-2  border-sub6"
          >
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={() => navigate("/apply/isbn")}
            >
              <LuCamera size={20} className="mr-3" />
              <span>단일 도서 촬영</span>
            </div>
            <div className="border-[0.5px] border-sub6 my-1.5" />
            <TextApply />
          </PopoverContent>
        </Popover>
        <button
          className="bg-sub7 text-white font-bold w-[153px] h-[54px] rounded-xl mx-2"
          onClick={() => navigate("/apply/bookcase/upload")}
        >
          책장 등록
        </button>
      </div>
    </div>
  );
};

export default ApplyPage;
