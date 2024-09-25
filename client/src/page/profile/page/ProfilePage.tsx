import { getUserInfo } from 'api/profileApi';
import { IProfile } from 'atoms/Profile.type';
import LogoutButton from 'page/profile/components/LogoutButton';
import MannerTree from 'page/profile/components/MannerTree';
import MyLeaf from 'page/profile/components/MyLeaf';
import { useQuery } from '@tanstack/react-query';
import UserInfo from '../components/UserInfo';

const ProfilePage = () => {
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: async () => await getUserInfo(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) return <div>오류가 발생했습니다.</div>;

  if (profileInfo) {
    console.log('유저 정보', profileInfo);
  }

  // mannerScore에 따른 gradeImage 설정
  let gradeImage = '/images/mannertree/씨앗.png'; // 기본값: 씨앗

  if (profileInfo.mannerScore >= 80) {
    gradeImage = '/images/mannertree/숲.png';
  } else if (profileInfo.mannerScore >= 60) {
    gradeImage = '/images/mannertree/나무.png';
  } else if (profileInfo.mannerScore >= 40) {
    gradeImage = '/images/mannertree/가지.png';
  } else if (profileInfo.mannerScore >= 20) {
    gradeImage = '/images/mannertree/새싹.png';
  }

  return (
    <div className='mx-6 my-4'>
      {/* 유저 정보 */}
      <p className='text-3xl font-extrabold tracking-wider mb-10'>프로필</p>
      <UserInfo
        userName={profileInfo.nickname}
        userLocation={profileInfo.locationName}
        userImage={profileInfo.profileImage}
        gradeImage={gradeImage} // 점수에 따른 이미지 전달
      />
      {/* 신뢰 나무 */}
      <MannerTree />

      {/* 나의 책잎 */}
      <MyLeaf leaf={profileInfo.cash} />
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;
