import { useMutation } from "@tanstack/react-query";
import { postUpdateRentalCost } from "api/bookApi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface UpdatePriceProps {
  userBookId: number;
  price: number;
}

const UpdatePrice = ({ userBookId, price }: UpdatePriceProps) => {
  const [updatePrice, setUpdatePrice] = useState(price);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["RentalCostData"],
    mutationFn: postUpdateRentalCost,

    onSuccess: () => {
      navigate(0);
    },
  });

  const handleUpdateRentalCost = () => {
    mutation.mutate({
      userBookId: userBookId,
      updateRentalCost: updatePrice,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <p className="bg-sub7 text-white font-bold px-32 py-2 rounded-lg">
          대여 가격 수정
        </p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start text-base mx-2">
            대여 가격을 입력해주세요.
          </DrawerTitle>
          <DrawerDescription className="mt-5 flex flex-row justify-center items-center">
            <IoIosLeaf color="#A6B37D" size={40} className="mr-2" />
            <input
              type="number"
              placeholder={String(price)}
              className="bg-transparent focus:outline-none pretendard text-3xl w-16"
              onChange={(e) => setUpdatePrice(Number(e.target.value))}
            />
            <span className="text-xl text-[#949494] pt-1">/ 일</span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row items-center justify-center space-x-11">
          <DrawerClose className="bg-sub7 text-white font-bold px-4 py-2 rounded-lg mx-5">
            <p
              onClick={handleUpdateRentalCost}
              className="bg-sub7 text-white font-bold rounded-lg px-20"
            >
              대여 가격 수정
            </p>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdatePrice;
