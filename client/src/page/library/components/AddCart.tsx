import { useMutation } from "@tanstack/react-query";
import { postAddCartItem } from "api/cartApi";
import { useNavigate } from "react-router-dom";

interface AddCartProps {
  ownerbookId: number
}

const AddCart = ({ ownerbookId }: AddCartProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["ownerbookId"],
    mutationFn: postAddCartItem,
    
    onSuccess: () => {
      if (confirm("장바구니에 추가되었습니다.\n 장바구니로 이동하시겠습니까?")) {
        navigate('/cart');
      } else {
        navigate(0);
      }
    } 
  })
  
  const handleAddCartItem = (ownerbookId: number) => {
    mutation.mutate(ownerbookId)

  }
  return (
    <button className="bg-[#B0A695] text-white font-bold px-8 py-2 rounded-lg mx-5"
    onClick={() => handleAddCartItem(ownerbookId)}>
      장바구니 추가
    </button>
  );
};

export default AddCart;
