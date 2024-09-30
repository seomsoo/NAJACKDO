import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const AICheckResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};

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

      <div>
        <p>찢김 상태: {resultData.count_ripped}</p>
        <p>닳음 상태: {resultData.count_wornout}</p>
        <p>책정 일일 대여료: {resultData.one_day_price}원</p>
      </div>

      <div className="w-full mt-6">
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold">
          등록 완료
        </button>
      </div>
    </div>
  );
};

export default AICheckResultPage;
