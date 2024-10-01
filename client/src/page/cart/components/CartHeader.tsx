import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CartHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-row gap-1">
      <button onClick={goBack}>
        <IoIosArrowBack className="text-xl" />
      </button>
      <p className="text-2xl font-bold ">장바구니</p>
    </div>
  );
};

export default CartHeader;
