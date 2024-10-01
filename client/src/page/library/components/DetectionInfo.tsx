interface DetectionInfoProps {
  ripped: number;
  wornout: number;
}

const DetectionInfo = ({ ripped, wornout }: DetectionInfoProps) => {
  return (
    <div>
      <div className="flex flex-row mt-10 mb-3">
        <span className="font-bold">도서 손상도</span>
        <span className="bg-[#5F6F52] text-white rounded-full px-1.5 ms-1.5">중</span>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center border border-[#5F6F52] rounded-xl px-3 py-1.5 w-1/5">
          <span>찢김</span>
          <span className="maplestory">{ripped}</span>
        </div>
        <div className="flex flex-col items-center border border-[#5F6F52] rounded-xl px-3 py-1.5 w-1/5">
          <span>닳음</span>
          <span className="maplestory">{wornout}</span>
        </div>
      </div>
    </div>
  );
};

export default DetectionInfo;
