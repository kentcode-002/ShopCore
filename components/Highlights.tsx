"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

const Highlights = ({ products = [] }: { products?: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <section className="px-10 md:px-20 mt-12 text-center">
        <p className="text-sm md:text-2xl font-bold">Featured</p>
        <div className="mt-6 text-gray-500">
          Products are currently unavailable.
        </div>
      </section>
    );
  }

  // 🔥 2. No filtered products
  if (products.length === 0) {
    return (
      <section className="px-10 md:px-20 mt-12 text-center">
        <p className="text-sm md:text-2xl font-bold">Featured</p>
        <div className="mt-6 text-gray-500">
          No featured products available.
        </div>
      </section>
    );
  }

  return (
    <section className="px-10 md:px-20 mt-12">
      <p className="text-center text-sm md:text-2xl font-bold">Featured</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-2">
            <Link href={`/product/${product.id}`}>
              <div className="relative productBg w-full h-40 md:h-50 cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Link>

            <p className="text-sm md:text-base font-bold w-full truncate">
              {product.title}
            </p>

            <p className="text-sm md:text-base font-semibold">
              $ {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
