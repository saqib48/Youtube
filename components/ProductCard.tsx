import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="block relative">
            {/* ✅ Default Image */}
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-64 object-contain overflow-hidden transition-transform duration-500 
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />

            {/* ✅ Hover Image (only if second image exists) */}
            {product.images[1] && (
              <Image
                src={urlFor(product.images[1]).url()}
                alt="productHoverImage"
                width={500}
                height={500}
                className="w-full h-64 object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </Link>
        )}

        {/* ✅ Side Menu Buttons */}
        <ProductSideMenu product={product} />

        {/* ✅ Sale or Hot Deal Badge */}
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full bg-white group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full bg-white group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}

        {/* ✅ Out of Stock Badge */}
        {product?.stock === 0 && (
          <p className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 text-xs rounded-full">
            Out of Stock
          </p>
        )}
      </div>

      {/* ✅ Product Details Section */}
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        <Title className="text-sm line-clamp-1">{product?.name}</Title>

        {/* ✅ Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-shop_light_green" : " text-lightText"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-lightText text-xs tracking-wide">5 Reviews</p>
        </div>

        {/* ✅ Stock Info */}
        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${
              product?.stock === 0
                ? "text-red-600"
                : "text-shop_dark_green/80 font-semibold"
            }`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        {/* ✅ Price Section */}
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />

        {/* ✅ Add to Cart */}
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
