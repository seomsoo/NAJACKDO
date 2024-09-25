import React from 'react';

// const App = ({ message }: AppProps) => <div>{message}</div>;
// const App<AppProps> = ({ message }) => <div>{message}</div>;

interface UserInfoProps {
  userName: string;
  userLocation: string;
  userImage: string;
  gradeImage: string;
}

const UserInfo = ({
  userName,
  userLocation,
  userImage,
  gradeImage,
}: UserInfoProps) => {
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
