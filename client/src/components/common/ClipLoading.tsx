import { cn } from "lib/utils";
import { ClipLoader } from "react-spinners";

interface ClipLoadingProps {
  height?: number;
}

const ClipLoading = ({ height }: ClipLoadingProps) => {
  return (
    <div className={cn("w-full flex items-center justify-center", height)}>
      <ClipLoader color="#5F6F52" loading={true} size={40} />
    </div>
  );
};

export default ClipLoading;
