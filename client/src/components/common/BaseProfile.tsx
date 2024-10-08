import { useLocation, useNavigate } from "react-router-dom";

interface BaseProfileProps {
  userImage?: string;
  width?: string;
  height?: string;
  userNickname?: string;
}

const BaseProfile = ({
  userImage,
  width,
  height,
  userNickname,
}: BaseProfileProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleProfileClick = () => {
    if (userNickname) {
      navigate(`/profile/${userNickname}`);
    }
  };

  const isRentalPage =
    location.pathname.includes("/book/") &&
    location.pathname.includes("/rental");

  return (
    <img
      onClick={isRentalPage ? handleProfileClick : undefined}
      src={userImage || "/basic_profile2.png"}
      alt="profile"
      className={`h-${height} w-${width} rounded-full`}
      style={{ cursor: isRentalPage ? "pointer" : "default" }}
    />
  );
};

export default BaseProfile;
