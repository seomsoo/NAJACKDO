const DetectionInfo = () => {
  const detection = [
    {
      title: "베임",
      count: 2,
    },
    {
      title: "찢김",
      count: 0,
    },
    {
      title: "얼룩",
      count: 1,
    },
    {
      title: "태그",
      count: 0,
    },
    {
      title: "닳음",
      count: 4,
    },
  ];

  return (
    <div>
      <div className="flex flex-row mt-10 mb-3">
        <span className="font-bold">도서 손상도</span>
        <span className="bg-[#5F6F52] text-white rounded-full px-1.5 ms-1.5">중</span>
      </div>
      <div className="flex flex-row justify-around">
        {detection.map((detect, index) => {
          return (
            <div key={index} className="flex flex-col items-center border border-[#5F6F52] rounded-xl px-3 py-1.5">
              <span>{detect.title}</span>
              <span className="maplestory">{detect.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetectionInfo;
