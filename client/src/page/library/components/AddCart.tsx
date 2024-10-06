import { useMutation } from "@tanstack/react-query";
import { postAddCartItem } from "api/cartApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "components/common/ConfirmModal";


interface AddCartProps {
  ownerbookId: number;
}

const AddCart = ({ ownerbookId }: AddCartProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const mutation = useMutation({
    mutationKey: ["ownerbookId"],
    mutationFn: postAddCartItem,

    onSuccess: () => {
      setOpen(true);

    },
  });

  const handleAddCartItem = (ownerbookId: number) => {
    mutation.mutate(ownerbookId);
  };
  
  return (
    <div>
      <button
        className="bg-sub7 text-white font-bold px-8 w-[350px] py-2 rounded-lg mx-5"
        onClick={() => handleAddCartItem(ownerbookId)}
      >
        장바구니 추가
      </button>
      <ConfirmModal
          content="장바구니에 추가되었습니다."
          open={open}
          setOpen={setOpen}
          urlPath="/cart"
        />
    </div>
    
  );
};

export default AddCart;
