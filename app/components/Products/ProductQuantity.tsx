"use client";

import { cartProductType } from "@/app/product/[productId]/ProductDetails";

interface productQuantity {
  cartCounter?: boolean;
  cartProduct: cartProductType;
  handleQuantiryIncrease: () => void;
  handleQuantiryDecrease: () => void;
}

const buttonStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const ProductQuantity: React.FC<productQuantity> = ({
  cartCounter,
  cartProduct,
  handleQuantiryIncrease,
  handleQuantiryDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantity:</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQuantiryDecrease} className={buttonStyles}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQuantiryIncrease} className={buttonStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
