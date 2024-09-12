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
import { useEffect, useState } from "react";
import { IoIosLeaf } from "react-icons/io";

interface UpdatePriceProps {
  price: number;
}

const UpdatePrice = ({ price }: UpdatePriceProps) => {
  const [updatePrice, setUpdatePrice] = useState(price);

  useEffect(() => {
    console.log(updatePrice);
  }, [updatePrice]);

  return (
    <Drawer>
      <DrawerTrigger>
        <p className="bg-[#776B5D] text-white font-bold px-32 py-2 rounded-lg">
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
              type="text"
              placeholder={String(price)}
              className="bg-transparent focus:outline-none pretendard text-3xl w-16"
              onChange={(e) => setUpdatePrice(Number(e.target.value))}
            />
            <span className="text-xl text-[#949494] pt-1">/ 일</span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row items-center justify-center space-x-11">
          <DrawerClose className="bg-[#776B5D] text-white font-bold px-8 py-2 rounded-lg mx-5">
            <p className="bg-[#776B5D] text-white font-bold rounded-lg px-20">
              대여 가격 수정
            </p>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdatePrice;
