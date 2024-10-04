import { useQuery } from "@tanstack/react-query";
import { getAutoSearchText, getSearch } from "api/searchApi";
import { IAutoArray, ISearch } from "atoms/Search.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import TextApplyResult from "page/bookapply/components/TextApplyResult";
import AutoSearch from "page/search/components/AutoSearch";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const TextApply = () => {
  const location = useLocation().pathname.split("/")[2];
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [autoSearchText, setAutoSearchText] = useState<IAutoArray>({
    list: [],
  });

  // 자동완성 검색어 조회
  const fetchAutoSearchText = async (keyword: string) => {
    try {
      const data = await getAutoSearchText(keyword);
      setAutoSearchText(data);
    } catch (error) {
      console.log("자동완성 검색어 조회에 실패했습니다.");
    }
  };

  const handleSearchText = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setAutoSearchText({ list: [] });

    // 완성된 한글인지 확인
    const isCompletedText = /^[가-힣]+$/.test(value);

    // 조합 중이 아니고 한글이 완성된 상태일 때만 검색 쿼리 전송
    if (isCompletedText) {
      fetchAutoSearchText(value);
    }
  };

  // 검색
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
    refetch,
  } = useQuery<ISearch[]>({
    queryKey: ["search", "result"],
    queryFn: () => getSearch(searchText),
    enabled: !!searchText && isClicked,
    initialData: [],
  });

  const handleClick = () => {
    setIsClicked(true);
    refetch();
  };

  useEffect(() => {
    // 자동완성 검색어 조회
    const fetchAutoSearchText = async (keyword: string) => {
      if (keyword) {
        try {
          const data = await getAutoSearchText(keyword);
          setAutoSearchText(data);
          setIsClicked(false);
        } catch (error) {
          console.log("자동완성 검색어 조회에 실패했습니다.");
        }
      } else {
        setAutoSearchText({ list: [] });
      }
    };

    const isCompletedText = /^[가-힣]+$/.test(searchText);

    if (isCompletedText) {
      fetchAutoSearchText(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    return () => {
      setAutoSearchText({ list: [] });
      setSearchText("");
    };
  }, []); // 컴포넌트 언마운트 시 초기화

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row items-center cursor-pointer">
        {location === "isbn" ? (
          <p className="bg-sub6 hover:bg-sub7 text-white font-bold w-[153px] h-[54px] rounded-xl mx-2 flex items-center justify-center">
            텍스트로 등록
          </p>
        ) : (
          <>
            <LuPencilLine size={20} className="mr-3" />
            <span>텍스트로 등록</span>
          </>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#F1ECE3] rounded-xl border-none h-3/5">
        <DialogHeader>
          <DialogTitle>도서 등록 - 텍스트</DialogTitle>
          <DialogDescription className="relative pt-3">
            <Input
              className="bg-white border-none text-black"
              placeholder="등록할 도서의 제목을 입력해주세요."
              onChange={handleSearchText}
            />
            {/* 나중에 클릭 이벤트 넣기 */}
            <div onClick={handleClick}>
              <IoIosSearch
                className="absolute top-[18px] right-2"
                size={20}
                color="black"
              />
            </div>
          </DialogDescription>
          {/* 검색 결과 리스트 */}
          <div
            className="flex-grow overflow-y-auto space-y-4"
            style={{
              height: "calc(100vh - 510px)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {!isClicked
              ? autoSearchText?.list && (
                  <AutoSearch autoSearch={autoSearchText.list} />
                )
              : searchData?.length > 0 &&
                searchData.map((bookInfo, index) => (
                  <TextApplyResult key={index} book={bookInfo} />
                ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TextApply;
