import BaseProfile from "components/common/BaseProfile";

interface UserInfoProps {
  userName: string;
  userLocation: string;
  userImage: string;
  mannerScore: number;
}

const UserInfo = ({
  userName,
  userLocation,
  userImage,
  mannerScore,
}: UserInfoProps) => {
  // mannerScore에 따른 gradeImage 설정
  let gradeImage = "/images/mannertree/씨앗.png"; // 기본값: 씨앗

  if (mannerScore >= 80) {
    gradeImage = "/images/mannertree/숲.png";
  } else if (mannerScore >= 60) {
    gradeImage = "/images/mannertree/나무.png";
  } else if (mannerScore >= 40) {
    gradeImage = "/images/mannertree/가지.png";
  } else if (mannerScore >= 20) {
    gradeImage = "/images/mannertree/새싹.png";
  }

  return (
    <div className="flex flex-row items-center">
      <BaseProfile userImage={userImage} width="20" height="20" />
      <div className="ml-3">
        <div className="flex  justify-start items-center">
          <div className="text-lg font-semibold">{userName}</div>
          <img src={gradeImage} alt="gradeBage" className="ml-1 w-6 h-6" />
        </div>
        <div className="text-sm text-gray-600">{userLocation}</div>
      </div>
    </div>
  );
};

export default UserInfo;
