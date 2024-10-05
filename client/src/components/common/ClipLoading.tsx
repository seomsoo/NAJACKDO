import { ClipLoader } from "react-spinners";

const ClipLoading = () => {
  return (
    <div className="h-20 max-w-[430px] flex items-center justify-center">
      <ClipLoader color="#5F6F52" loading={true} size={40} />
    </div>
  );
};

export default ClipLoading;
