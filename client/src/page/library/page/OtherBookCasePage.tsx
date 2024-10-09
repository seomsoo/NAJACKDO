import { useQuery } from "@tanstack/react-query";
import {
  deleteInterestBookCase,
  getOtherBookCase,
  postInterestBookCase,
} from "api/bookcaseApi";
import BaseProfile from "components/common/BaseProfile";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import OtherBookGrid from "../components/OtherBookGrid";

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
    queryKey: ["otherBookCase", userIdAsNumber],
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
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // 관심 책장 등록/해제 기능
  const handleFollowToggle = async () => {
    try {
      if (isFollowed) {
        await deleteInterestBookCase(bookcase.userId);
      } else {
        await postInterestBookCase(bookcase.userId);
      }
      setIsFollowed(!isFollowed);
    } catch (error) {}
  };

  if (isBookcaseLoading) {
    return <Loading />;
  }

  if (isBookcaseError) {
    return <Error />;
  }

  const handleProfileClick = () => {
    navigate(`/profile/${bookcase.nickname}`); // 책 클릭 시 해당 책 상세 페이지로 이동
  };

  return (
    <div>
      <header className="top-0 z-10 flex items-center justify-between px-4 py-3">
        <div className="items-center flex  ">
          <button onClick={goBack} className="text-2xl mr-2">
            <IoIosArrowBack />
          </button>
          <span className="hakgyo text-3xl text-main">{bookcase.nickname}</span>
          <span className="font-extrabold text-2xl">님의 책장</span>
          <button className="pl-2" onClick={handleProfileClick}>
            <BaseProfile
              userImage={bookcase?.profileImage}
              width="14"
              height="14"
            />
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
        </div>
      </header>

      <main className="px-6">
        {/* 다른 사용자의 책장을 보여주는 BookGrid */}
        <section className="flex flex-col items-center text-center">
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
