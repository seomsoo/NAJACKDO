import { useSuspenseQuery } from "@tanstack/react-query";
import { getCartList } from "api/cartApi";
import { ICartList } from "atoms/Cart.type";
import CartContainer from "page/cart/components/CartContainer";
import { IoCartOutline } from "react-icons/io5";
import { Fragment } from "react/jsx-runtime";

const CartList = () => {
  const { data: cartList } = useSuspenseQuery<ICartList[]>({
    queryKey: ["cartList"],
    queryFn: () => getCartList(),
  });

  const filteredCart = cartList.filter((item) => item.rentalId === null);

  return (
    <div className="mx-[25px]">
      {filteredCart.length ? (
        <Fragment>
          {filteredCart.map((item: ICartList, index) => {
            if (!item.cartItems.length) return null; // 책 다 지우면 장바구니 남아 있나?
            return (
              <CartContainer
                key={index}
                cartId={item.cartId}
                ownerId={item.ownerId}
                ownerUsername={item.ownerUsername}
                cartItems={item.cartItems}
              />
            );
          })}
        </Fragment>
      ) : (
        <div
          className="flex flex-col justify-center items-center space-y-3"
          style={{ height: "calc(100vh - 150px)" }}
        >
          <IoCartOutline size={100} color="#A6B37D" />
          <p className="font-bold text-xl">장바구니가 비었습니다.</p>
        </div>
      )}
    </div>
  );
};

export default CartList;
