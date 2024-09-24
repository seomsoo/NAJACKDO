import LeafBarGraph from "page/profile/components/LeafBarGraph";
import { IoIosArrowForward, IoIosLeaf } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface MyLeafProps {
  leaf: number;
}

const MyLeaf = ({ leaf }: MyLeafProps) => {
  const navigate = useNavigate();

  const goToLeaf = () => {
    navigate("/profile/my-leaf");
  };

  return (
    <div onClick={goToLeaf} className="my-6 bg-[#FAF9F7] shadow rounded-lg p-4">
      <div className="flex flex-row items-center mb-2">
        <p className="text-[15px] font-medium ">나의 책잎</p>
        <IoIosArrowForward size={15} color="black" />
      </div>
      <div className="flex flex-row items-center">
        <IoIosLeaf size={20} color="#A6B37D" />
        <p className="text-[20px] text-[#776B5D]">{leaf.toLocaleString()}</p>
      </div>
      <LeafBarGraph ratio={1500 / 1800} value={1500} label={"절약 책잎"} />
      <LeafBarGraph ratio={1800 / 1800} value={1800} label={"모은 책잎"} />
    </div>
  );
};

export default MyLeaf;
