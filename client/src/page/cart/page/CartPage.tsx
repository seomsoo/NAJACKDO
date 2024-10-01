import Loading from "components/common/Loading";
import CartHeader from "page/cart/components/CartHeader";
import CartList from "page/cart/components/CartList";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-[25px] py-4">
        <CartHeader />
        <CartList />
      </div>
    </Suspense>
  );
};

export default CartPage;
