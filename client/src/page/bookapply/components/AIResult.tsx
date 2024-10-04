const AIResult = () => {
  const detection = [
    {
      title: "찢김",
      count: 0,
    },

    {
      title: "닳음",
      count: 4,
    },
  ];

  return (
    <div className="flex flex-col items-center font-bold">
      <div className="flex flex-row mt-6 mb-5">
        <p className="font-bold text-2xl text-center">손상도 분석 결과</p>
        <p className="bg-main text-white rounded-full px-2.5 ml-2 pt-1">중</p>
      </div>
      <div className="border-[1px] border-sub7 rounded-xl w-[330px] h-[400px] flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center space-x-4">
          <div className="w-[116px] h-52 bg-gray-300">책 앞면 사진</div>
          <div className="w-[116px] h-40  bg-gray-300">책 뒷면 사진</div>
        </div>
        <div className="flex flex-row space-x-6 my-6">
          {detection.slice(0, 3).map((detect, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center border border-main rounded-xl px-4 py-1.5"
              >
                <span>{detect.title}</span>
                <span className="maplestory">{detect.count}</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row space-x-6 ">
          {detection.slice(3, 5).map((detect, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center border border-main rounded-xl px-4 py-1.5"
              >
                <span>{detect.title}</span>
                <span className="maplestory">{detect.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIResult;
