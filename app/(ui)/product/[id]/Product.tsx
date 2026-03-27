"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

interface ProductSession {
  session: {
    user: {
      id: string;
      name: string;
    };
  } | null;
}

export default function Product({
  product,
  session
}: {
  product: Product;
} & ProductSession) {
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<number>(product.price);
  const [image, setImage] = useState<string>(product.image);
  const [productName, setProductName] = useState<string>(product.title);
  const [error, setError] = useState<string>("");

  const categoriesWithSizes = ["men's clothing", "women's clothing"];
  const sizes = ["S", "M", "L"];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 🚨 prevent page reload

    if (!session) {
      router.push("/login");
      return;
    }

    if (categoriesWithSizes.includes(product.category.toLowerCase()) && !size) {
      setError("Please select a size");
      return;
    }

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          productId: product.id,
          productName,
          size,
          quantity,
          price,
          image
        })
      });

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }

    router.refresh();
  };

  return (
    <div className="px-5 lg:px-10 py-20">
      <div className="w-full lg:max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* IMAGE */}
        <div className="flex items-center w-full h-full productBg">
          <div className="relative w-full h-80">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* DETAILS */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Hello, {session?.user.name ?? "Guest"}
          </p>

          <h1 className="text-xl lg:text-2xl font-bold">{product.title}</h1>

          <p className="capitalize text-gray-500">{product.category}</p>

          <p className="text-lg font-semibold">$ {product.price}</p>

          {/* SIZE */}
          {categoriesWithSizes.includes(product.category.toLowerCase()) && (
            <div>
              <div className="flex items-center gap-8">
                <span className="text-sm lg:text-base font-semibold">Size</span>

                <div className="flex gap-4">
                  {sizes.map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={s}
                        onChange={(e) => setSize(e.target.value)}
                        className="hidden peer"
                      />
                      <div className="text-xs lg:text-sm px-6 py-1 lg:px-8 border border-black peer-checked:bg-black peer-checked:text-white">
                        {s}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-sm text-red-500">{!size && error}</div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex gap-4 items-center">
            <p className="text-sm lg:text-base font-semibold">Quantity</p>

            <select
              className="border border-black px-4 py-1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs md:text-sm">{product.description}</p>

          <div>
            <button
              type="submit"
              className="text-sm text-white border px-4 py-2 bg-black cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
