import { useNavigate } from "react-router-dom";



interface BaseProfileProps { 
  userImage?: string;
  width?: string;
  height?: string;
  userNickname?: string;
  }

const BaseProfile = ({userImage, width, height, userNickname }: BaseProfileProps) => {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate(`/profile/${userNickname}`); 
  };
  
  return (
    <img
      onClick={handleProfileClick}
      src={userImage || '/basic_profile.png'}
      alt='profile'
      className={`h-${height} w-${width} rounded-full`}
      />
  );
};

export default BaseProfile;
