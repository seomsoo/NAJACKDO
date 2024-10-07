import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import CartList from "page/cart/components/CartList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CartPage = () => {
  return (
    <ErrorBoundary fallback={<SmallError />}>
      <Suspense fallback={<Loading />}>
        <CartList />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CartPage;
