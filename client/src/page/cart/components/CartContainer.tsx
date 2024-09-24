import BookRentalInfo from './BookRentalInfo';
import { LuPencilLine } from 'react-icons/lu';
import { IoIosLeaf } from 'react-icons/io';
import BookRentalApply from "page/library/components/BookRentalApply";
import { ICartItem } from 'atoms/Cart.type';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'components/ui/dialog';
import { Slider } from 'components/ui/slider';

import { useEffect, useState } from 'react';

interface CartContainerProps {
  cartId: number;
  ownerUsername: string;
  cartItems: ICartItem[];
}

const CartContainer = ({ cartId, ownerUsername, cartItems }: CartContainerProps) => {
  const sumPrice = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);

  return (
    <div className='mx-3 my-5 bg-white/30 shadow rounded-lg p-4'>
      <div className='flex flex-row item-center justify-between'>
        <span className='flex font-semibold'>
          <p className='text-[#79AC78]'>{ownerUsername}</p>
          님의 책장
        </span>
      </div>
      <div className='border-y-[1px] border-[#776B5D]/50' id={cartId.toString()}>
        {cartItems.map((item, index) => {
          return (
            <div className='w-[95%] mx-auto'>
              <BookRentalInfo
                key={item.cartItemId}
                cartItemId={item.cartItemId}
                bookTitle={item.bookTitle}
                author={item.author}
                price={item.price}
                bookImage={item.bookImage}
              />
              <div
                key={index}
                className={`${index !== cartItems.length - 1 ? 'border-b opacity-50 border-[#776B5D]/30' : ''}`}
              />
            </div>
          );
        })}
      </div>
      <div className='flex flex-row justify-between mt-3 px-3'>
        <p>금액</p>
        <div className='flex flex-row justify-end items-center mt-auto '>
          <IoIosLeaf size={16} color='#79AC78' />
          <p>{sumPrice.toLocaleString()} <span className='text-[12px]'>/ 일</span></p>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        <BookRentalApply dayPrice={sumPrice} triggerClassName="w-[265px] bg-[#776B5D] text-[12px] text-white rounded-[12px] p-2" />
      </div>
    </div>
  );
};

export default CartContainer;
