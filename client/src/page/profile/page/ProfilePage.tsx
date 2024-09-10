import React from 'react';
import UserInfo from '../components/UserInfo';
import Grade from '../components/Grade';
import BarGraph from '../components/BarGraph';
import { IoIosArrowForward, IoIosLeaf } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

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
        <Grade degree={55} color={"#79ac78"} />
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
        <BarGraph ratio= {1500/1800} value={1500} label={"절약 책잎"} image='https://placehold.co/14x14' />
        <BarGraph ratio= {1800/1800} value={1800} label={"모은 책잎"} image='https://placehold.co/14x14' />
      </div>

      <button className='w-full h-[40px] mx-auto my-6 bg-[#776B5D] shadow rounded-lg  font-medium text-white'>로그아웃</button>
    </div>
  );
};

export default ProfilePage;
