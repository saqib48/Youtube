"use client";
import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  const t = useTranslations("homeCategories");

  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">{t("popularCategories")}</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => {
          // 🛠 Agar Men / Women h to translation use hoga
          const translatedTitle = t(category?.title?.toLowerCase() || "default");

          return (
            <div
              key={category?._id}
              className="bg-shop_light_bg p-5 flex items-center gap-3 group"
            >
              {category?.image && (
                <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                  <Link href={`/category/${category?.slug?.current}`}>
                    <Image
                      src={urlFor(category?.image).url()}
                      alt="categoryImage"
                      width={500}
                      height={500}
                      className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                    />
                  </Link>
                </div>
              )}
              <div className="space-y-1">
                {/* 👇 Yahan translated title use kiya */}
                <h3 className="text-base font-semibold">{translatedTitle}</h3>
                <p className="text-sm">
                  <span className="font-bold text-shop_dark_green">
                    {`(${category?.productCount})`}
                  </span>{" "}
                  {t("itemsAvailable")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategories;
