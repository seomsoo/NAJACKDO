import { FaUser } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoChatbubbleEllipses, IoLibrary } from 'react-icons/io5';
import { TbLocationFilled } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const location = useLocation().pathname.split('/')[1];
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setClicked(path);
    setTimeout(() => setClicked(null), 1200); // 1.2초 후 애니메이션 상태 초기화
  };

  return (
    <footer className='fixed font-medium  bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-around pb-7'>
      <Link
        to='/'
        onClick={() => handleClick('')}
        className={`flex flex-col items-center transition-transform duration-300 ${
          location === '' || clicked === '' ? 'scale-125' : ''
        }`}
      >
        <GoHomeFill
          size={25}
          color={location === '' ? '#79AC78' : '#545454'}
          className={`${clicked === '' ? 'animate-bounceTwice' : ''}`}
        />
        <span className='text-xs pt-1'>홈</span>
      </Link>
      <Link
        to='/location'
        onClick={() => handleClick('location')}
        className={`flex flex-col items-center transition-transform duration-300 ${
          location === 'location' || clicked === 'location' ? 'scale-125' : ''
        }`}
      >
        <TbLocationFilled
          size={25}
          color={location === 'location' ? '#79AC78' : '#545454'}
          className={`${clicked === 'location' ? 'animate-bounceTwice' : ''}`}
        />
        <span className='text-xs pt-1'>내 주변</span>
      </Link>
      <Link
        to='/library'
        onClick={() => handleClick('library')}
        className={`flex flex-col items-center transition-transform duration-300 ${
          location === 'library' || clicked === 'library' ? 'scale-125' : ''
        }`}
      >
        <IoLibrary
          size={25}
          color={location === 'library' ? '#79AC78' : '#545454'}
          className={`${clicked === 'library' ? 'animate-bounceTwice' : ''}`}
        />
        <span className='text-xs pt-1'>서재</span>
      </Link>
      <Link
        to='/chat'
        onClick={() => handleClick('chat')}
        className={`flex flex-col items-center transition-transform duration-300 ${
          location === 'chat' || clicked === 'chat' ? 'scale-125' : ''
        }`}
      >
        <IoChatbubbleEllipses
          size={25}
          color={location === 'chat' ? '#79AC78' : '#545454'}
          className={`${clicked === 'chat' ? 'animate-bounceTwice' : ''}`}
        />
        <span className='text-xs pt-1'>채팅</span>
      </Link>
      <Link
        to='/profile'
        onClick={() => handleClick('profile')}
        className={`flex flex-col items-center transition-transform duration-300 ${
          location === 'profile' || clicked === 'profile' ? 'scale-125' : ''
        }`}
      >
        <FaUser
          size={25}
          color={location === 'profile' ? '#79AC78' : '#545454'}
          className={`${clicked === 'profile' ? 'animate-bounceTwice' : ''}`}
        />
        <span className='text-xs pt-1'>마이</span>
      </Link>
    </footer>
  );
};

export default Footer;
