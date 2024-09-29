import { useQuery } from "@tanstack/react-query";
import { getCartList } from "api/cartApi";
import { ICartList } from "atoms/Cart.type";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContainer from "../components/CartContainer";

const CartPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const {
    data: cartList,
    isLoading,
    isError,
  } = useQuery<ICartList[]>({
    queryKey: ["cartList"],
    queryFn: () => getCartList(),
  });
  console.log("카트페이지 cartList", cartList);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading location data.</div>;
  }

  return (
    <div className="mx-6 py-4">
      <div className="flex flex-row gap-1">
        <button onClick={goBack}>
          <IoIosArrowBack className="text-xl" />
        </button>
        <p className="text-2xl font-bold ">장바구니</p>
      </div>

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
    </div>
  );
};

export default CartPage;
