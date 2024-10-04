interface BaseProfileProps { 
  userImage?: string;
  width?: string;
  height?: string;
 }

const BaseProfile = ({userImage, width, height }: BaseProfileProps) => {
  return (
    <img
      src={userImage || '/basic_profile.png'}
      alt='profile'
      className={`h-${height} w-${width} rounded-full`}
      />
  );
};

export default BaseProfile;
