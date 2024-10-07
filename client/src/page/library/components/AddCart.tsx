import { useMutation } from "@tanstack/react-query";
import { postAddCartItem } from "api/cartApi";
import AlertModal from "components/common/AlertModal";
import ConfirmModal from "components/common/ConfirmModal";
import { useState } from "react";

interface AddCartProps {
  ownerbookId: number;
}

const AddCart = ({ ownerbookId }: AddCartProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const mutation = useMutation({
    mutationKey: ["ownerbookId"],
    mutationFn: postAddCartItem,

    onSuccess: () => {
      setStatus("confirm");
      setContent("장바구니에 추가되었습니다.");
      setOpen(true);
    },

    onError: (error) => {
      setStatus("alert");
      setContent("이미 장바구니에 담긴 책입니다.");
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
      {status === "alert" ? (
        <AlertModal content={content} open={open} setOpen={setOpen} />
      ) : (
        <ConfirmModal
          content={content}
          open={open}
          setOpen={setOpen}
          urlPath="/cart"
        />
      )}
    </div>
  );
};

export default AddCart;
