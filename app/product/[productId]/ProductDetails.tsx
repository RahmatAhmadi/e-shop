"use client";

import Button from "@/app/components/Button";
import ProductColor from "@/app/components/Products/ProductColor";
import ProductImage from "@/app/components/Products/ProductImage";
import ProductQuantity from "@/app/components/Products/ProductQuantity";
import { useCart } from "@/hooks/use-cart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";

interface prodctDeatails {
  product: any;
}

export type cartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<prodctDeatails> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<cartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleSelectedColor = useCallback((value: selectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity > 0) {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity - 1 };
      });
    }
  }, [cartProduct.quantity]);

  return (
    <div
      className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-12
    "
    >
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleSelectedColor={handleSelectedColor}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <hr className="w-[30%] my-2" />
        <div className="text-justify">{product.description}</div>
        <hr className="w-[30%] my-2" />
        <div>
          <span className="font-semibold pr-1">Category:</span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold pr-1">Brand:</span>
          {product.brand}
        </div>
        <div className={product.isStock ? "text-teal-4000" : "text-rose-400"}>
          {product.isStock ? "In stock" : "Out of stock"}
        </div>
        <hr className="w-[30%] my-2" />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to the cart.</span>
            </p>
            <div className="max-w-[150px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <ProductColor
                cartProduct={cartProduct}
                images={product.images}
                handleSelectedColor={handleSelectedColor}
              />
            </div>
            <hr className="w-[30%] my-2" />
            <ProductQuantity
              cartProduct={cartProduct}
              handleQuantiryDecrease={handleQuantityDecrease}
              handleQuantiryIncrease={handleQuantityIncrease}
            />
            <hr className="w-[30%] my-2" />
            <div className="max-w-[150px]">
              <Button
                label="Add To Cart"
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
