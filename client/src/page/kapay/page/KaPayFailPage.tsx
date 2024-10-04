import { Button } from "components/ui/button";
import { IoIosLeaf } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const KaPayFailPage = () => {
  const navigate = useNavigate();
  const canCloseWindow = window.opener !== null && !window.opener.closed;
  const bottonStyle = "bg-sub6 hover:bg-sub7";

  const handleRedirect = () => {
    navigate("/profile");
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 86px)" }}
    >
      <span className="maplestory text-4xl text-sub9">책잎 결제 실패</span>
      <div className="flex flex-row items-center my-10">
        <IoIosLeaf color="#79AC78" size={29} className="mx-1" />
        <p className="font-bold">
          <span className="text-sub2 text-xl maplestory mr-1">책잎</span>
          결제 처리 중 오류가 발생하였습니다.
        </p>
      </div>
      {canCloseWindow ? (
        <Button className={bottonStyle} onClick={() => window.close()}>
          닫기
        </Button>
      ) : (
        <Button className={bottonStyle} onClick={handleRedirect}>
          마이 페이지로!
        </Button>
      )}
    </div>
  );
};

export default KaPayFailPage;
