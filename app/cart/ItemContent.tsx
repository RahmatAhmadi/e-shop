"use client";

import { formatPrice } from "@/utils/formatPrice";
import { cartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import ProductQuantity from "../components/Products/ProductQuantity";
import { useCart } from "@/hooks/use-cart";

interface ItemContentProps {
  item: cartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
  } = useCart();

  return (
    <div
      className="
  grid
  grid-cols-5
  text-xs
  md:text-sm
  gap-4
  border-t-[1.5px]
  border-slate-200
  py-4
  items-center
  "
    >
      <div
        className="
      cols-span-2
      justify-self-start
      flex
      gap-2
      md:gap-4
      "
      >
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}></Link>
          {truncateText(item.name)}
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <ProductQuantity
          cartCounter={true}
          cartProduct={item}
          handleQuantiryIncrease={() => {
            handleCartQuantityIncrease(item);
          }}
          handleQuantiryDecrease={() => {
            handleCartQuantityDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
