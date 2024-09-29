import AIResult from 'page/bookapply/components/AIResult';
import { IoChevronBack } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

const AICheckResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {}; // 업로드 후 받은 결과 데이터를 상태로 전달받음

  if (!resultData) {
    return <p>결과를 불러오는 중 오류가 발생했습니다.</p>;
  }
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - AI 인증</span>
      </div>
      {/* <AIResult /> */}
      <div>
      <h2>AI 도서 인증 결과</h2>

      <div>
        <p>업로드된 파일 정보:</p>
        {resultData.uploaded_files.map((file: any, index: number) => (
          <div key={index}>
            <p>파일 이름: {file.filename}</p>
            <p>파일 유형: {file.content_type}</p>
          </div>
        ))}
      </div>

      {/* 필요한 정보에 따라 추가적으로 데이터를 표시할 수 있습니다. */}
      <p>AI 인증 결과: 도서가 양호합니다.</p>
    </div>
      <div className="font-bold my-5 flex flex-col items-center">
        <div className="flex flex-row justify-center items-end">
          <span className="text-xl">책정 일일 대여료 : 150 </span>
          <span className="text-[#868686] ml-1">/ 일</span>
        </div>
        <span className="text-[#656565] text-xs">
          (추후 대여 상세 페이지에서 수정 가능)
        </span>
      </div>
      <div className="px-6">
        <p className="text-center bg-[#776B5D] w-full  mt-10 rounded-xl text-white font-bold py-3 ">
          등록 완료
        </p>
      </div>
    </div>
  );
};

export default AICheckResultPage;
