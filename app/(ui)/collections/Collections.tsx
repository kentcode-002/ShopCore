"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

interface CollectionProps {
  products: Product[];
}

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const categoryMap: Record<string, string> = {
  men: "men's clothing",
  women: "women's clothing",
  jewelry: "jewelery",
  electronics: "electronics"
};

const tabs = ["all", "men", "women", "jewelry", "electronics"];

const Collections = ({ products }: CollectionProps) => {
  const [value, setValue] = useState<string>("all");

  const filteredProducts =
    value === "all"
      ? products
      : products.filter((product) => product.category === categoryMap[value]);

  return (
    <div className="px-0 lg:px-20 pb-10">
      <div className="mt-10 px-5">
        <h1 className="font-bold text-xl">All Collections</h1>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-4 items-center justify-center font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${
              value === tab ? "underline" : ""
            } cursor-pointer capitalize`}
            onClick={() => setValue(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2">
        <AnimatePresence mode="wait">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative productBg w-full h-40 lg:h-60">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="flex flex-col gap-1 px-2">
                  <p className="text-sm font-bold">{product.title}</p>
                  <p className="text-sm text-[gray] font-bold capitalize">
                    {product.category}
                  </p>
                  <p className="text-sm font-bold">$ {product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Collections;
