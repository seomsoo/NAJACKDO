import { cn } from "lib/utils";
import { ClipLoader } from "react-spinners";

interface ClipLoadingProps {
  className?: string;
}

const ClipLoading = ({ className }: ClipLoadingProps) => {
  return (
    <div className={cn("w-full flex items-center justify-center", className)}>
      <ClipLoader color="#5F6F52" loading={true} size={40} />
    </div>
  );
};

export default ClipLoading;
