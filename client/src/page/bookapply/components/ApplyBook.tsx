const ApplyBook = () => {
  return (
    <div className="flex flex-col items-center justify-center font-bold">
      <p className="text-center text-sub8 text-lg font-bold">
        도서 한 권만 등록하고 싶으신가요?
      </p>
      <img
        src="/barcode.png"
        alt="도서 한 권 등록"
        width={200}
        className="mt-6 mb-6"
      />
      <p className="text-xl mb-3 ">
        도서의 <span className="text-sub8">바코드</span>를 촬영해 보세요!
      </p>
      <p className="text-sm">AI가 바코드를 인식해 도서의 정보를 불러옵니다</p>
    </div>
  );
};

export default ApplyBook;
