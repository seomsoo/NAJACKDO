// import useIsbn from "hooks/useIsbn";
// import useScan from "hooks/useScan";
// import Scanner from "page/bookapply/components/Scanner";
// import { useEffect } from "react";
// import { IoChevronBack } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

import Scanner from "page/bookapply/components/Scanner";
import TextApply from "page/bookapply/components/TextApply";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { LiaRedoAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const ISBNScanPage = () => {
  const navigate = useNavigate();
  const [isbn, setIsbn] = useState<string>("");
  const isbnSet = [];
  const ISBN_REGEX = /[0-9]{10,13}/;

  const addIsbnList = (isbn: string, isbnSet: string[]) => {
    if (isbnSet.length >= 15) {
      processResultSet(isbnSet);
    } else {
      isbnSet.push(isbn);
    }
  };

  const getFrequencyIsbn = (arr: string[]) => {
    const frequencyMap: { [key: string]: number } = {};
    let maxCount = 0;
    let mostFrequent: string | null = null;

    arr.forEach((item) => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
      if (frequencyMap[item] > maxCount) {
        maxCount = frequencyMap[item];
        mostFrequent = item;
      }
    });

    return mostFrequent;
  };

  const processResultSet = (isbnSet) => {
    const mostFrequentIsbn = getFrequencyIsbn(isbnSet);
    if (mostFrequentIsbn.match(ISBN_REGEX)) {
      setIsbn(mostFrequentIsbn);
      // 스캔 끝
    }

    isbnSet.length = 0;
  };

  const onDetected = (isbn) => {
    console.log("isbn ", isbn);
    addIsbnList(isbn, isbnSet);
  };

  const [scan, setScan] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScan(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-[25px]" style={{ height: "calc(100vh - 86px)" }}>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록 - ISBN</span>
      </div>
      <p className="text-center font-bold text-xl my-10">BARCODE SCANNER</p>
      <div className="relative border-2 border-[#776B5D] h-[300px] rounded-2xl flex items-center justify-center">
        <Scanner onDetected={onDetected} />
        {!scan && (
          <p className="absolute text-white text-center">
            바코드 인식에 실패하였습니다. <br />
            제목 텍스트를 통해 등록해주세요.
          </p>
        )}
      </div>
      <div
        className="flex flex-row justify-end items-center space-x-1 mt-1 mr-2"
        onClick={() => navigate(0)}
      >
        <span className="font-bold">다시 찍기</span>
        {/* <FaRedoAlt /> */}
        <LiaRedoAltSolid />
      </div>
      <p
        className={`${scan ? "bg-[#C0C78C] text-[#FEFAE0]" : "bg-[#D96363] text-white"} font-bold m-auto mt-10 rounded-xl w-[275px] h-12 flex items-center justify-center`}
      >
        {scan ? `인식된 ISBN : ${isbn}` : "바코드 인식 실패"}
      </p>
      <div className="mt-16 flex flex-row justify-around">
        <p
          className={`${scan ? "bg-[#B0A695]" : "bg-[#D0D0D0]"} text-white font-bold w-[153px] h-[54px] rounded-xl mx-2 flex items-center justify-center`}
        >
          ISBN으로 등록
        </p>
        <TextApply />
      </div>
    </div>
  );
};

export default ISBNScanPage;
