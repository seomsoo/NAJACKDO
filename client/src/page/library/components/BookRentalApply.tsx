import { Slider } from "components/ui/slider";

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

interface BookRentalApplyProps {
  dayPrice: number;
  triggerClassName?: string;
}

const BookRentalApply = ({ dayPrice, triggerClassName}: BookRentalApplyProps) => {
  const [date, setDate] = useState<number[]>([14]);
  const [sale, setSale] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (date[0] < 30) {
      setSale(null);
    } else if (date[0] < 45) {
      setSale(10);
    } else if (date[0] < 60) {
      setSale(15);
    } else {
      setSale(20);
    }
    setTotalPrice(
      Math.floor((dayPrice * date[0] * ((100 - (sale || 0)) / 100)) / 10) * 10
    );
  }, [date, dayPrice, sale]);

  return (
    <Drawer>
      <DrawerTrigger>
      <p className={triggerClassName || 'bg-[#776B5D] text-white font-bold px-8 py-2 rounded-lg mx-5'}>
          도서 대출 신청
        </p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start text-base mx-2">
            대여 기간을 선택해주세요.
          </DrawerTitle>
          <DrawerDescription className="mt-5">
            <div className="flex flex-row justify-center items-end font-bold space-x-2">
              <span className="text-2xl">{date} 일</span>
              {sale && (
                <span className="text-[#FF6B6B] text-base pb-0.5">
                  {sale}% 할인
                </span>
              )}
            </div>
            <Slider
              defaultValue={date}
              min={14}
              max={60}
              minStepsBetweenThumbs={1}
              onValueChange={(i) => setDate(i)}
            />
            <div className="flex justify-around w-full">
              {[14, 30, 45, 60].map((day, index) => (
                <div className="flex flex-col">
                  <span className="text-sm mt-2">{day}일</span>
                  {index !== 0 && (
                    <span className="text-xs text-red-400 font-bold">
                      {(index + 1) * 5}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row items-center justify-center space-x-11">
          <div className="flex flex-row items-center">
            <IoIosLeaf color="#A6B37D" size={25} className="mr-2" />
            <span className="font-bold text-[#5F6F52] text-lg">
              {totalPrice}
            </span>
          </div>
          <DrawerClose className="bg-[#776B5D] text-white font-bold px-8 py-2 rounded-lg mx-5">
            도서 대출 신청
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookRentalApply;
