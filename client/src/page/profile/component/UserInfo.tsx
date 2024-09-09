import React from 'react';

// const App = ({ message }: AppProps) => <div>{message}</div>;
// const App<AppProps> = ({ message }) => <div>{message}</div>;

interface UserInfoProps {
  userName: string;
  userLocation: string;
  userImage: string;
  gradeImage: string;
}

const UserInfo = ({ userName, userLocation, userImage, gradeImage }: UserInfoProps) => {
  return (
    <div className="flex flex-row items-center ml-6">
      <img src={userImage} alt="profile" className="h-68 w-68 rounded-full " />
      <div className='ml-3'>
        <div className='flex flex-row justify-start'>
          <div className="text-lg font-semibold">{userName}</div>
          <img src={gradeImage} alt="gradeBage" className="ml-1 h-21 w-21" />
        </div>
        <div className="text-sm text-gray-600">{userLocation}</div>
      </div>
    </div>
  );
};

export default UserInfo;
