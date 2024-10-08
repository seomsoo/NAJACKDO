import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import Loading from "components/common/Loading";
import LeafBarGraph from "page/profile/components/LeafBarGraph";
import { IoIosArrowForward, IoIosLeaf } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MyLeaf = () => {
  const navigate = useNavigate();

  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserInfo,
  });

  if (isLoading) {
    return <Loading />;
  }

  const leaf = profileInfo?.cash;
  const userName = profileInfo?.nickname;

  const goToLeaf = () => {
    navigate("/profile/my-leaf", { state: { leaf, userName } });
  };

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const saveCash = profileInfo?.saveCash || 0; // 절약 책잎
  const earnCash = profileInfo?.earnCash || 0; // 모은 책잎

  const totalCash = Math.max(earnCash, saveCash); // 비교 기준

  return (
    <div
      onClick={goToLeaf}
      className="my-6 bg-[#FAF9F7] cursor-pointer shadow rounded-lg p-4"
    >
      <div className="flex flex-row items-center mb-2">
        <p className="font-bold">나의 책잎</p>
        <IoIosArrowForward size={15} color="black" />
      </div>
      <div className="flex flex-row items-center">
        <IoIosLeaf size={20} color="#A6B37D" />
        <p className="text-2xl ml-1 text-sub7">
          {profileInfo.cash?.toLocaleString()}
        </p>
      </div>

      {/* LeafBarGraph에 API로 받은 saveCash와 earnCash 전달 */}
      <LeafBarGraph
        ratio={totalCash ? saveCash / totalCash : 0}
        value={saveCash}
        label={"절약 책잎"}
      />
      <LeafBarGraph
        ratio={totalCash ? earnCash / totalCash : 0}
        value={earnCash}
        label={"모은 책잎"}
      />
    </div>
  );
};

export default MyLeaf;
