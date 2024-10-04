const ApplyBookcase = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-sub8 font-bold">
        여러 권을 한 번에 등록하고 싶으신가요?
      </p>
      <img
        src="/bookcase.png"
        alt="도서 한 권 등록"
        width={200}
        className="mt-4 mb-8"
      />
      <p className="text-sm mb-1.5 font-bold">책장을 촬영해보세요!</p>
      <p className="text-sm font-bold mb-8">
        AI가 책 제목을 인식해 도서 정보를 불러옵니다!
      </p>
      <p className="text-xs mb-1.5">
        <span className="text-[#FF5E5E] mr-1">!</span>책 제목이 잘 보이도록
        촬영해야 정확도가 올라갑니다!
      </p>
      <p className="text-xs mb-1.5">
        <span className="text-[#FF5E5E] mr-1">!</span>책등을 인식하여야 하니
        책을 똑바로 꽂아주세요!
      </p>
    </div>
  );
};

export default ApplyBookcase;
