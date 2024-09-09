import React from 'react';
import UserInfo from '../component/UserInfo';
import Grade from '../component/Grade';
import BarGraph from '../component/BarGraph';

import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const goToGrade = () => {
    navigate('/profile/grade');
  };
  const goToLeaf = () => {
    navigate('/profile/leaf');
  };

  return (
    <div>
      {/* 유저 인포 */}
      <p className="pl-6 pt-20 text-[32px] font-extrabold tracking-wider font-['Pretendard']">프로필</p>
      <UserInfo userName={"서민수"} userLocation={"수완동"} userImage="https://placehold.co/68x68" gradeImage='https://placehold.co/21x21' />
      <div className='grid place-items-center'>
        {/* 신뢰 나무 */}
        <div onClick={goToGrade}  className="w-[340px] bg-white/30 shadow rounded-lg p-4 m-4">
          <h2 className="text-[15px] font-medium font-['Pretendard'] mb-2">신뢰 나무</h2>
          <Grade degree={55} color={"#79ac78"} />
        </div>
        {/* 나의 책잎 */}
        <div onClick={goToLeaf} className="w-[340px] bg-[#FAF9F7] shadow rounded-lg p-4 m-4">
          <h2 className="text-[15px] font-medium font-['Pretendard'] mb-2">나의 책잎</h2>
          <BarGraph ratio= {1500/1800} value={1500} label={"절약 책잎"} image='https://placehold.co/14x14' />
          <BarGraph ratio= {1800/1800} value={1800} label={"모은 책잎"} image='https://placehold.co/14x14' />
        </div>
        {/* 좋아요 버튼 */}
        <button className="w-[340px] bg-[#FAF9F7] shadow rounded-lg p-4 m-4 text-start">
          좋아요 표시한 책장
        </button>
        
      </div>

    </div>
  );
};

export default ProfilePage;
