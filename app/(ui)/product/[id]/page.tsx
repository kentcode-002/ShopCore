// app/product/[id]/page.tsx

import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  // Session
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <Product session={session} product={product} />;
}
