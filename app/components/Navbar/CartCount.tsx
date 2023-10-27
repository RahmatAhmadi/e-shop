"use client";

import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQuantity } = useCart();
  const router = useRouter();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        router.push("/cart");
      }}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span
        className="
      absolute
      top-[-10px]
      right-[-10px]
      bg-slate-700
      text-white
      w-6
      h-6
      rounded-full
      flex
      justify-center
      items-center
      text-sm
      "
      >
        {cartTotalQuantity}
      </span>
    </div>
  );
};

export default CartCount;
