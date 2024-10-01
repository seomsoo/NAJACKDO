import { useSuspenseQuery } from "@tanstack/react-query";
import { getCartList } from "api/cartApi";
import { ICartList } from "atoms/Cart.type";
import CartContainer from "page/cart/components/CartContainer";

const CartList = () => {
  const { data: cartList } = useSuspenseQuery<ICartList[]>({
    queryKey: ["cartList"],
    queryFn: () => getCartList(),
  });

  return (
    <div>
      {cartList.map((item: ICartList, index) => {
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
    </div>
  );
};

export default CartList;
