import { postAiCheckBook } from 'api/bookApi';
import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const AICheckUploadPage = () => {
  const navigate = useNavigate();
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0); // 현재 슬라이드에 표시할 이미지 인덱스

  // 앞면 이미지 업로드 핸들러
  const handleFrontImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
      setFrontImagePreview(URL.createObjectURL(file)); // 미리보기 설정
    }
  };

  // 뒷면 이미지 업로드 핸들러
  const handleBackImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackImage(file);
      setBackImagePreview(URL.createObjectURL(file)); // 미리보기 설정
    }
  };

  // 슬라이드 버튼 핸들러
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % 2); // 0에서 1, 1에서 0으로 슬라이드 전환
  };

  const handlePreviousImage = () => {
    setCurrentImage((prev) => (prev - 1 + 2) % 2); // 슬라이드를 역방향으로 전환
  };

  // 업로드 버튼 클릭 시 서버로 이동
  const handleSubmit = async () => {
    if (frontImage && backImage) {
      const formData = new FormData();
      formData.append('files', frontImage);
      formData.append('files', backImage);
      formData.append('user_id', '1'); // 유저 ID 예시
      formData.append('user_book_id', '8'); // 도서 ID 예시

      try {
        const response = await postAiCheckBook(formData); // API 호출
        // 서버에서 응답받은 데이터를 결과 페이지로 전달
        navigate('/ai-check/result', {
          state: {
            resultData: response,
          },
        });
      } catch (error) {
        console.error('AI 인증 실패:', error);
        alert('AI 인증에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('이미지를 모두 업로드해주세요.');
    }
  };

  return (
    <div>
      <div onClick={() => navigate(-1)} className="cursor-pointer p-6 py-4 flex flex-row items-center">
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - AI 인증</span>
      </div>

      <h2 className="text-center text-xl font-bold mt-4">도서 이미지 업로드</h2>

      <div className="flex flex-col items-center justify-center mt-4">
        {/* 앞면 이미지 업로드 */}
        <label className="cursor-pointer bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
          도서 앞면 선택
          <input type="file" accept="image/*" onChange={handleFrontImageUpload} className="hidden" />
        </label>

        {/* 뒷면 이미지 업로드 */}
        <label className="cursor-pointer bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mt-4">
          도서 뒷면 선택
          <input type="file" accept="image/*" onChange={handleBackImageUpload} className="hidden" />
        </label>
      </div>

      {/* 이미지 미리보기 및 슬라이드 */}
      <div className="flex flex-col items-center mt-6">
        {frontImagePreview || backImagePreview ? (
          <div className="relative">
            {/* 이전 이미지 버튼 */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full"
            >
              이전
            </button>

            {/* 현재 이미지 미리보기 */}
            <img
              src={currentImage === 0 ? frontImagePreview : backImagePreview}
              alt="미리보기"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />

            {/* 다음 이미지 버튼 */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full"
            >
              다음
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">이미지를 업로드하세요</p>
        )}
      </div>

      <div className="px-6">
        <button
          onClick={handleSubmit}
          className="bg-[#776B5D] w-full mt-10 rounded-xl text-white font-bold py-3"
        >
          AI 인증 요청
        </button>
      </div>
    </div>
  );
};

export default AICheckUploadPage;