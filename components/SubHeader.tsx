import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { db } from "@/auth";
import { auth } from "@/auth";
import { headers } from "next/headers";

const Subheader = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const cartCollection = db.collection("cart");

  const count =
    session &&
    (await cartCollection.countDocuments({ userId: session.user.id }));

  return (
    <div className="hidden sticky top-0 lg:flex items-center justify-between py-4 px-4 lg:px-20 bg-[white] z-50 shadow-xs">
      <Link
        href="/"
        className="text-xl text-amber-600 font-bold tracking-normal"
      >
        ShopCore
      </Link>
      <div className="flex gap-4 text-sm font-semibold">
        <Link href="/">Home</Link>
        <Link href="faq">FAQ</Link>
        <Link href="instructions">How to order</Link>
      </div>
      <Link href="/cart" className="flex items-center gap-2 font-bold">
        <ShoppingCart />
        {count}
      </Link>
    </div>
  );
};

export default Subheader;
