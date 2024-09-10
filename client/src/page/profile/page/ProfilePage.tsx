import React from 'react';
import UserInfo from '../components/UserInfo';
import Grade from '../components/Grade';
import LeafBarGraph from '../components/LeafBarGraph';
import { IoIosArrowForward, IoIosLeaf } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import MannerBarGraph from '../components/MannerBarGraph';

const ProfilePage = () => {
  const navigate = useNavigate();
  const goToGrade = () => {
    navigate('/profile/my-grade');
  };
  const goToLeaf = () => {
    navigate('/profile/my-leaf');
  };
  const user = {
    username: "서민수",
    userlocation: "수완동",
    userImage: "https://placehold.co/68x68",
    myLeaf: 12000
  }

  return (
    <div className='mx-[25px] mt-6'>
      {/* 유저 인포 */}
      <p className="text-[32px] font-extrabold tracking-wider mb-6">프로필</p>
      <UserInfo userName={user.username} userLocation={user.userlocation} userImage={user.userImage} gradeImage='https://placehold.co/21x21' />
      {/* 신뢰 나무 */}
      <div onClick={goToGrade}  className="w-[340px] mx-auto my-6 bg-white/30 shadow rounded-lg p-4">
        <div className='flex flex-row items-center mb-2'>
          <p className="text-[15px] font-medium ">신뢰 나무</p>
          <IoIosArrowForward size={15}  color='black' />
        </div>
        <Grade degree={75} color={"#79ac78"} />
        <div className='pt-9'>
          <p className="text-[15px] font-medium ">받은 매너 평가</p>
          <MannerBarGraph ratio={22/22} value={22} label={"good"} />
          <MannerBarGraph ratio={2/22} value={2} label={"bad"} />
        </div>
      </div>
      {/* 나의 책잎 */}
      <div onClick={goToLeaf} className="w-[340px] mx-auto my-6 bg-[#FAF9F7] shadow rounded-lg p-4">
        <div className='flex flex-row items-center mb-2'>
          <p className="text-[15px] font-medium ">나의 책잎</p>
          <IoIosArrowForward size={15}  color='black' />
        </div>
        <div className="flex flex-row items-center">
          <IoIosLeaf size={20} color="#A6B37D" />
          <p className="text-[20px] text-[#776B5D]">{user.myLeaf.toLocaleString()}</p>
        </div>
        <LeafBarGraph ratio= {1500/1800} value={1500} label={"절약 책잎"} />
        <LeafBarGraph ratio= {1800/1800} value={1800} label={"모은 책잎"} />
      </div>

      <button className='w-full h-[40px] mx-auto my-6 bg-[#776B5D] rounded-lg  font-medium text-white'>로그아웃</button>
    </div>
  );
};

export default ProfilePage;
