import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import {
  IoHeart,
  IoHeartOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import {
  getOtherBookCase,
  postInterestBookCase,
  deleteInterestBookCase,
} from 'api/bookcaseApi';
import { useState, useEffect } from 'react';
import OtherBookGrid from '../components/OtherBookGrid';

const OtherBookCasePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const userIdAsNumber = parseInt(userId, 10);

  // 다른 사용자의 책장 정보 조회
  const {
    data: bookcase,
    isLoading: isBookcaseLoading,
    isError: isBookcaseError,
  } = useQuery({
    queryKey: ['otherBookCase', userIdAsNumber],
    queryFn: () => getOtherBookCase(userIdAsNumber),
  });

  // bookcase 데이터가 로드된 후 하트 상태를 설정
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (bookcase?.follow !== undefined) {
      setIsFollowed(bookcase.follow);
    }
  }, [bookcase]);

  // 책 선택 상태를 관리하는 state
  const [checked, setChecked] = useState<boolean[]>(
    new Array(bookcase?.displayBooks.length || 0).fill(false)
  );

  const handleCheck = (index: number) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked]; // 기존 상태 복사
      newChecked[index] = !newChecked[index]; // 선택된 책 상태 토글
      return newChecked; // 업데이트된 배열 반환
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // 관심 책장 등록/해제 기능
  const handleFollowToggle = async () => {
    try {
      if (isFollowed) {
        await deleteInterestBookCase(bookcase.userId); // 관심 해제
      } else {
        await postInterestBookCase(bookcase.userId); // 관심 등록
      }
      setIsFollowed(!isFollowed); // 상태 변경
    } catch (error) {
      console.error('관심 책장 등록/해제 중 오류 발생:', error);
    }
  };

  if (isBookcaseLoading) {
    return <div>로딩 중...</div>;
  }

  if (isBookcaseError) {
    return <div>에러가 발생했습니다.</div>;
  }

  const handleProfileClick = () => {
    navigate(`/profile/${bookcase.nickname}`); // 책 클릭 시 해당 책 상세 페이지로 이동
  };

  return (
    <div>
      <header className="sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4">
        <div className="items-center flex gap-2">
          <button onClick={goBack} className="text-2xl">
            <IoIosArrowBack />
          </button>
        </div>
        <div className="flex items-center gap-5">
          {/* 관심 등록/해제 하트 버튼 */}
          <div onClick={handleFollowToggle}>
            {isFollowed ? (
              <IoHeart size={30} color="#D96363" />
            ) : (
              <IoHeartOutline size={30} color="#D96363" />
            )}
          </div>
          <div className=" text-3xl text-[#545454]">
            <Link to="/alarm">
              <IoNotificationsOutline />
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6">
        <article className="flex items-center w-full justify-between font-extrabold text-2xl mb-5">
          <div className="flex items-center">
            <span>
              <span className="hakgyo text-3xl text-[#5F6F52]">
                {bookcase.nickname}
              </span>
              님의 책장
            </span>
          </div>
          <button onClick={handleProfileClick}>
            <img
              src={bookcase?.profileImage || '/basic_profile.png'} // 기본 이미지 처리
              alt="profile"
              className="rounded-full w-16 h-16  "
            />
          </button>
        </article>

        {/* 다른 사용자의 책장을 보여주는 BookGrid */}
        <section className="flex flex-col items-center text-center mt-12 gap-6">
          {bookcase.displayBooks?.length > 0 ? (
            <OtherBookGrid
              books={bookcase.displayBooks}
              checked={checked} // 체크 상태 전달
              onCheck={handleCheck} // 체크 핸들러 전달
              setChecked={setChecked}
            />
          ) : (
            <div className="flex flex-col items-center mt-16">
              <img src="/book_icon.png" alt="book" className="w-40 h-40 mb-6" />
              <p className="text-lg font-semibold">책장이 텅 비었어요.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default OtherBookCasePage;
