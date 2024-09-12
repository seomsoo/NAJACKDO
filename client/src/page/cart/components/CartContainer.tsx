import BookRentalInfo from "./BookRentalInfo"
import { LuPencilLine } from "react-icons/lu";
import { IoIosLeaf } from "react-icons/io";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "components/ui/dialog";
import { Slider } from "components/ui/slider";


import { useEffect, useState } from "react";

interface CartContainerProps {
  name: string,
  period: number,
  books: {title: string, author: string, price: number, status: string, image: string}[]
}
const CartContainer = ({ name, period, books }: CartContainerProps) => {
  const sumPrice = books.reduce((sum, book) => sum + book.price, 0);
  const [date, setDate] = useState<number[]>([period]);
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
      Math.floor((sumPrice * date[0] * ((100 - (sale || 0)) / 100)) / 10) * 10
    );
  }, [date, sumPrice, sale]);


  return (
    <div className="mx-3 my-5 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row item-center justify-between">
        <p className="font-semibold">{name} 님의 책장</p>

        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-row items-center justify-end gap-1">
              <p className="text-[12px]">대출 기간: {date}일</p>
              <LuPencilLine size={12} color="black" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <DialogTitle className="text-start text-base mx-2">
                대출 기간을 선택해주세요.
              </DialogTitle>
              <DialogDescription className="mt-5">
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
                    <div className="flex flex-col" key={day}>
                      <span className="text-sm mt-2">{day}일</span>
                      {index !== 0 && (
                        <span className="text-xs text-red-400 font-bold">
                          {(index + 1) * 5}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </DialogDescription>
            </DialogTitle>
            <div className="flex flex-row items-center justify-center space-x-11">
              <div className="flex flex-row items-center">
                <IoIosLeaf color="#A6B37D" size={25} className="mr-2" />
                <p className="font-bold text-[#5F6F52] text-lg">{totalPrice}</p>
              </div>
            </div>
              <DialogTrigger>
                <button
                  className="w-full mt-4 bg-[#776B5D] text-white rounded-[12px] p-2"
                >
                  저장
                </button>
              </DialogTrigger>
          </DialogContent>
        </Dialog>


      </div>
      <div className="border-y border-[#776B5D]">
        {books.map((item, index) => {
          return (
            <div className="w-[95%] mx-auto">
              <BookRentalInfo key={index} title={item.title} author={item.author} price={item.price} status={item.status} image={item.image} />
              <div key={index} className={`${index !== books.length - 1 ? 'border-b border-[#776B5D]/30' : ''}`} />
            </div>
          )
        })}

      </div>
      <div className="flex flex-row justify-between mt-3 px-3">
        <p>총 금액</p>
        <div className="flex flex-row justify-end items-center mt-auto ">
          <IoIosLeaf size={16} color="#79AC78" />
          <p>{totalPrice.toLocaleString()}</p>
        </div>

      </div>
      <div className="flex justify-center mt-4">
        <button className="w-[265px] bg-[#776B5D] text-[12px] text-white rounded-[12px] p-2">
          도서 대출 신청
        </button>

      </div>
    </div>
  );
};

export default CartContainer;
