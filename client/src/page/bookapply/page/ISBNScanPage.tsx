import Scanner from "page/bookapply/components/Scanner";
import TextApply from "page/bookapply/components/TextApply";
import { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ISBNScanPage = () => {
  const navigate = useNavigate();
  const [isbn, setIsbn] = useState<number | undefined>(undefined);
  const isbnSet: number[] = [];
  const ISBN_REGEX = /[0-9]{10,13}/;

  // ISBN이 15개 이상이면 가장 많이 나온 ISBN을 찾아서 처리
  const addIsbnList = (isbn: number, isbnSet: number[]) => {
    if (isbnSet.length >= 15) {
      processResultSet(isbnSet);
    } else {
      isbnSet.push(isbn);
    }
  };

  // 가장 많이 나온 ISBN을 찾아서 반환
  const getFrequencyIsbn = (arr: number[]) => {
    const frequencyMap: { [key: number]: number } = {};
    let maxCount = 0;
    let mostFrequent: number | null = null;

    arr.forEach((item) => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
      if (frequencyMap[item] > maxCount) {
        maxCount = frequencyMap[item];
        mostFrequent = item;
      }
    });

    return mostFrequent;
  };

  // ISBN을 처리하는 함수
  const processResultSet = (isbnSet: number[]) => {
    const mostFrequentIsbn = getFrequencyIsbn(isbnSet);
    if (ISBN_REGEX.test(mostFrequentIsbn?.toString() || "")) {
      setIsbn(mostFrequentIsbn);
      // 스캔 끝
    }

    isbnSet.length = 0;
  };

  // ISBN이 인식되면 실행되는 함수
  const onDetected = (isbn: number) => {
    addIsbnList(isbn, isbnSet);
  };

  const [scan, setScan] = useState<boolean>(true);
  const [fail, setFail] = useState<boolean>(false);

  useEffect(() => {
    if (!scan && isbn === undefined) {
      setFail(true);
    }
  }, [scan, isbn]);

  const handleClick = () => {
    if (isbn) {
      navigate("/apply/book", { state: { kind: "isbn", keyword: isbn } });
    }
  };

  return (
    <div className="mx-[25px]" style={{ height: "calc(100vh - 86px)" }}>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록 - ISBN</span>
      </div>
      <p className="text-center font-bold text-2xl mb-5">BARCODE SCANNER</p>
      <div className="relative border-2 border-sub7 h-[300px] rounded-2xl flex items-center justify-center">
        <Scanner onDetected={onDetected} scan={scan} setScan={setScan} />
        {fail && (
          <p className="absolute text-white text-center">
            바코드 인식에 실패하였습니다. <br />
            제목 텍스트를 통해 등록해주세요.
          </p>
        )}
      </div>
      <div
        className="flex flex-row justify-end items-center space-x-1 mt-1 mr-2 cursor-pointer"
        onClick={() => navigate(0)}
      >
        <span className="font-bold">다시 찍기</span>
        <FaRedoAlt />
      </div>
      <p
        className={`${!fail ? "bg-sub1 text-sub3" : "bg-sub9 text-white"} font-bold m-auto mt-10 rounded-xl w-[275px] h-12 flex items-center justify-center`}
      >
        {!fail
          ? `인식된 ISBN : ${isbn !== undefined ? isbn : ""}`
          : "바코드 인식 실패"}
      </p>
      <div className="mt-8 flex flex-row justify-around">
        <p
          className={`${!fail ? "bg-sub7 hover:bg-sub7" : "bg-[#D0D0D0]"} text-white font-bold w-[153px] h-[54px] rounded-xl mx-2 flex items-center justify-center cursor-pointer`}
          onClick={handleClick}
        >
          ISBN으로 등록
        </p>
        <TextApply />
      </div>
    </div>
  );
};

export default ISBNScanPage;
