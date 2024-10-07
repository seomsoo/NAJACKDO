import { cn } from "lib/utils";
import { useNavigate } from "react-router-dom";

interface SmallErrorProps {
  className?: string;
}

const SmallError = ({ className }: SmallErrorProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-28",
        className
      )}
    >
      <span className="mb-2">정보를 불러오는 데 실패하였습니다.</span>
      <button
        className="border-[1.5px] border-sub6 text-sub7 font-bold hover:border-sub7 hover:bg-sub7 hover:text-white rounded-xl px-3 py-2"
        onClick={() => navigate(0)}
      >
        다시 시도
      </button>
    </div>
  );
};

export default SmallError;
