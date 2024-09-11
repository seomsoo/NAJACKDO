import BookRentalInfo from "./BookRentalInfo"
import { LuPencilLine } from "react-icons/lu";
import { IoIosLeaf } from "react-icons/io";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "components/ui/dialog";

import { useState } from "react";

interface CartContainerProps {
  name: string,
  period: number,
  books: {title: string, author: string, price: number, status: string, image: string}[]
}
const CartContainer = ({ name, period, books }: CartContainerProps) => {
  const [days, setDays] = useState(period);
  const [newDays, setNewDays] = useState(period);
  const handleEditDays = () => {
    setDays(newDays);
  };
  
  const sumPrice = books.reduce((sum, book) => sum + book.price, 0);



  return (
    <div className="mx-3 my-5 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row item-center justify-between">
        <p className="font-semibold">{name} 님의 책장</p>


        
        <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row items-center justify-end gap-1">
                <p className="text-[12px]" >대출기간</p>
                <LuPencilLine size={12} color="black" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>대출기간 수정</DialogTitle>
              <DialogDescription>이거 도영이 디자인으로 바꿀꺼야</DialogDescription>
              <input
                type="number"
                value={newDays}
                onChange={(e) => setNewDays(Number(e.target.value))}
                className="border rounded p-2"
              />
              <DialogTrigger>
                <button
                  onClick={handleEditDays}
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
          <p className="text-[12px]">{sumPrice.toLocaleString()} x {days} =&emsp;</p>
          <IoIosLeaf size={16} color="#79AC78" />
          <p>{(sumPrice * days).toLocaleString()}</p>
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
