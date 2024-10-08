const ApplyBookcase = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-sub8 text-lg font-bold">
        여러 권을 한 번에 등록하고 싶으신가요?
      </p>
      <img
        src="/bookcase2.png"
        alt="책장 등록"
        width={250}
        className="mt-6 mb-4 rounded-xl"
      />
      <p className="text-xl mb-1.5 font-bold">책장을 촬영해 보세요!</p>
      <p className="font-bold mb-6">
        AI가 책 제목을 인식해 도서 정보를 불러옵니다.
      </p>
      <p className="text-[13px] text- mb-1.5">
        <span className="text-[#FF5E5E] mr-1">!</span>책 제목이 잘 보이도록
        촬영해야 정확도가 올라갑니다!
      </p>
      <p className="text-[13px] mb-1.5">
        <span className="text-[#FF5E5E] mr-1">!</span>책등을 인식하여야 하니
        책을 똑바로 꽂아주세요!
      </p>
      <p className="text-[13px] text-center  ">
        <span className="text-[#ab831d] mr-1">?</span>책등 : 책을 책꽂이에
        꽂았을 때의 보이는, <br /> 책 제목 등이 쓰여 있는 옆면
      </p>
    </div>
  );
};

export default ApplyBookcase;
