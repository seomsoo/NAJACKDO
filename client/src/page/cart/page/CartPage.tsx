import Loading from "components/common/Loading";
import CartList from "page/cart/components/CartList";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CartList />
    </Suspense>
  );
};

export default CartPage;
