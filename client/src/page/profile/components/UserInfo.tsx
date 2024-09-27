interface UserInfoProps {
  userName: string;
  userLocation: string;
  userImage: string;
  mannerScore: number; // mannerScore 추가
}

const UserInfo = ({
  userName,
  userLocation,
  userImage,
  mannerScore, // mannerScore 받기
}: UserInfoProps) => {
  // mannerScore에 따른 gradeImage 설정
  let gradeImage = '/images/mannertree/씨앗.png'; // 기본값: 씨앗

  if (mannerScore >= 80) {
    gradeImage = '/images/mannertree/숲.png';
  } else if (mannerScore >= 60) {
    gradeImage = '/images/mannertree/나무.png';
  } else if (mannerScore >= 40) {
    gradeImage = '/images/mannertree/가지.png';
  } else if (mannerScore >= 20) {
    gradeImage = '/images/mannertree/새싹.png';
  }

  return (
    <div className='flex flex-row items-center'>
      <img
        src={userImage || '/basic_profile.png'}
        alt='profile'
        className='h-20 w-20 rounded-full '
      />
      <div className='ml-3'>
        <div className='flex  justify-start items-center'>
          <div className='text-lg font-semibold'>{userName}</div>
          <img src={gradeImage} alt='gradeBage' className='ml-1 w-6 h-6' />
        </div>
        <div className='text-sm text-gray-600'>{userLocation}</div>
      </div>
    </div>
  );
};

export default UserInfo;
