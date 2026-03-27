import { db } from "@/auth";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Cart from "./Cart";
import { CartItem } from "./Cart"; // import the type

export default async function CartPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <div>Please log in to view your cart.</div>;
  }

  const cartItemsRaw = await db
    .collection<CartItem>("cart") // 👈 type the collection
    .find({ userId: session.user.id })
    .toArray();

  const cartItems = cartItemsRaw.map((item) => ({
    _id: item._id.toString(),
    userId: item.userId,
    productId: item.productId,
    productName: item.productName,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    category: item.category,
    image: item.image
  }));

  return (
    <div>
      <Cart cartItems={cartItems} />
    </div>
  );
}
