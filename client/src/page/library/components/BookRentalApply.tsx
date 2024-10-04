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
  dayprice: number;
  totalLeaf: number;
  setTotalLeaf: (totalLeaf: number) => void;
  rentalPeriod: number[];
  setRentalPeriod: (rentalPeriod: number[]) => void;
  handleClick: () => void;
}

const BookRentalApply = ({
  dayprice,
  totalLeaf,
  setTotalLeaf,
  rentalPeriod,
  setRentalPeriod,
  handleClick,
}: BookRentalApplyProps) => {
  const [sale, setSale] = useState<number | null>(null);

  useEffect(() => {
    if (rentalPeriod[0] < 30) {
      setSale(null);
    } else if (rentalPeriod[0] < 45) {
      setSale(10);
    } else if (rentalPeriod[0] < 60) {
      setSale(15);
    } else {
      setSale(20);
    }
    setTotalLeaf(
      Math.floor(
        (dayprice * rentalPeriod[0] * ((100 - (sale || 0)) / 100)) / 10
      ) * 10
    );
  }, [rentalPeriod, dayprice, sale]);

  return (
    <Drawer>
      <DrawerTrigger>
        <span className="bg-sub7 text-white rounded-lg py-3 px-2 w-1/5">
          송금하기
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start text-base mx-2">
            <p>대여 기간을 선택해주세요.</p>
          </DrawerTitle>
          <DrawerDescription className="mt-5">
            <div className="flex flex-row justify-center items-end font-bold space-x-2">
              <span className="text-2xl">{rentalPeriod} 일</span>
              {sale && (
                <span className="text-[#FF6B6B] text-base pb-0.5">
                  {sale}% 할인
                </span>
              )}
            </div>
            <Slider
              defaultValue={rentalPeriod}
              min={14}
              max={60}
              minStepsBetweenThumbs={1}
              onValueChange={(i) => setRentalPeriod(i)}
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
        <DrawerFooter className="flex flex-row items-center justify-center space-x-11 mb-6">
          <div className="flex flex-row items-center">
            <IoIosLeaf color="#A6B37D" size={25} className="mr-2" />
            <span className="font-bold text-main text-lg">{totalLeaf}</span>
          </div>
          <DrawerClose
            className="bg-sub7 text-white font-bold px-8 py-2 rounded-lg mx-5"
            onClick={handleClick}
          >
            송금하기
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookRentalApply;
