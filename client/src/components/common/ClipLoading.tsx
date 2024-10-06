import { ClipLoader } from "react-spinners";

const ClipLoading = () => {
  return (
    <div className="h-24 w-full flex items-center justify-center">
      <ClipLoader color="#5F6F52" loading={true} size={40} />
    </div>
  );
};

export default ClipLoading;
