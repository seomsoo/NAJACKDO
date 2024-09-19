import Grade from "page/profile/components/Grade";
import MannerBarGraph from "page/profile/components/MannerBarGraph";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MannerTree = () => {
  const navigate = useNavigate();

  const goToGrade = () => {
    navigate("/profile/my-grade");
  };

  return (
    <div onClick={goToGrade} className="my-6 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row items-center mb-2">
        <p className="text-[15px] font-medium ">신뢰 나무</p>
        <IoIosArrowForward size={15} color="black" />
      </div>
      <Grade degree={60} color={"#79ac78"} />
      <div className="pt-9">
        <p className="text-[15px] font-medium ">받은 매너 평가</p>
        <MannerBarGraph ratio={22 / 22} value={22} label={"good"} />
        <MannerBarGraph ratio={2 / 22} value={2} label={"bad"} />
      </div>
    </div>
  );
};

export default MannerTree;
