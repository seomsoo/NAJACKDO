interface DetectionInfoProps {
  ripped: number;
  wornout: number;
}

const DetectionInfo = ({ ripped, wornout }: DetectionInfoProps) => {
  return (
    <div>
      <div className="flex flex-row items-center mt-10 mb-3">
        <span className="font-bold text-xl">도서 손상도</span>
        <span className="bg-main text-white text-lg rounded-full px-2 ms-1.5">
          중
        </span>
      </div>
      <div className="flex text-xl justify-around items-center  rounded-lg border-main border py-3">
        <div className="flex flex-col items-center pl-5 gap-2 py-1">
          <span>찢김</span>
          <span className="text-2xl text-[#c5c028] maplestory">{ripped}</span>
        </div>

        <div className="border-l h-8  border-gray-400"></div>

        <div className="flex flex-col items-center gap-2 pr-5 py-1">
          <span>닳음</span>
          <span className="text-2xl text-[#e93838] maplestory">{wornout}</span>
        </div>
      </div>
    </div>
  );
};

export default DetectionInfo;
