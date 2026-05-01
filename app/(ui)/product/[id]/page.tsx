import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let product = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store"
    });

    if (res.ok) {
      const text = await res.text();
      if (text) {
        product = JSON.parse(text);
      }
    }
  } catch (err) {
    console.error("Product fetch error:", err);
    // do NOT rethrow — let the notFound() below handle it
  }

  if (!product) notFound();

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <Product session={session} product={product} />;
}
