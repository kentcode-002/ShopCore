"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type CartItem = {
  _id: string;
  userId: string;
  productId: number;
  productName: string;
  size?: string;
  quantity: number;
  price: number;
  category: string;
  image: string;
};

type CartProps = {
  cartItems: CartItem[];
};

export default function Cart({ cartItems }: CartProps) {
  const [items, setItems] = useState<CartItem[]>(cartItems); // 👈 items in state
  const router = useRouter();

  const updateQuantity = async (productId: string, delta: number) => {
    const item = items.find((i) => i._id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;

    // Update UI immediately (no reload needed)
    setItems((prev) =>
      newQty <= 0
        ? prev.filter((i) => i._id !== productId)
        : prev.map((i) =>
            i._id === productId ? { ...i, quantity: newQty } : i
          )
    );

    // Sync with DB in the background
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: newQty })
    });
  };

  // Uses `items` (state) so it recalculates on every + / - click
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deleteItem = async (productId: string) => {
    // Update UI immediately
    setItems((prev) => prev.filter((item) => item._id !== productId));

    try {
      await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("Failed to delete item:", err);
    }

    router.refresh(); // Refresh the page to reflect changes (optional, since we're already updating state)
  };

  return (
    <div className="py-10">
      {items.length === 0 ? (
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64">
            <Image
              src="/images/empty-cart.svg"
              alt="Empty cart"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-16">No items in your cart yet.</p>
          <p className="mt-2">
            Looks like you haven't added anything to your cart yet. Let's find
            something you'll love!
          </p>
          <Link
            href="/collections"
            className="mt-8 border font-semibold px-4 py-2 bg-black text-white"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] justify-center gap-8 lg:px-40">
          <div>
            <div className="px-4">
              <p className="font-bold lg:text-2xl mb-4">Cart</p>
              <div className="flex flex-col gap-8">
                {items.map(
                  (
                    item // 👈 map over `items`, not `cartItems`
                  ) => (
                    <div key={item._id}>
                      <div className="flex gap-4">
                        <div className="relative w-70 h-30 lg:h-40 productBg">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-between">
                          <div className="flex flex-col gap-2">
                            <p className="text-sm lg:text-base font-bold max-w-100">
                              {item.productName}
                            </p>
                            {item.size && (
                              <p className="text-sm lg:text-base">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                          <div className="flex lg:justify-end">
                            <p className="text-sm lg:text-base font-semibold">
                              {`Price: $ ${item.price * item.quantity}`}{" "}
                              {/* 👈 also reactive */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <div className="flex items-center gap-4 border border-gray-300 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item._id, -1)} // 👈 wired up
                            className="flex items-center w-10 h-10 justify-center rounded-full cursor-pointer hover:bg-[#ebebeb]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          {item.quantity}
                          <button
                            onClick={() => updateQuantity(item._id, 1)} // 👈 wired up
                            className="flex items-center w-10 h-10 justify-center rounded-full cursor-pointer hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(item._id)}
                          className="border-2 rounded-full py-2 px-3 hover:text-white hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="px-5">
            <p className="font-medium lg:text-2xl">Summary</p>
            <div>
              <p className="flex justify-between mt-4">
                <span className="font-medium">Subtotal</span>
                <span>$ {subtotal.toLocaleString()}</span> {/* 👈 reactive */}
              </p>
              <p className="flex justify-between mt-4">
                <span className="font-medium">Delivery Fee:</span>
                <span>Free</span>
              </p>
            </div>
            <div>
              <p className="flex justify-between mt-8 border-t border-b py-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  $ {subtotal.toLocaleString()}
                </span>{" "}
                {/* 👈 reactive */}
              </p>
            </div>
            <div className="">
              <button className="w-full border py-4 font-bold bg-black text-white mt-8 rounded-full cursor-pointer hover:opacity-60">
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
