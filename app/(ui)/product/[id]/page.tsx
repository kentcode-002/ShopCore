import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let product = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store"
    });

    if (!res.ok || res.status === 404) {
      product = null; // let it fall through
    } else {
      const text = await res.text();
      if (text) {
        product = JSON.parse(text);
      }
    }
  } catch (err) {
    console.error("Product fetch error:", err);
  }

  // ✅ notFound() called outside try/catch — Next.js can handle it properly
  if (!product) {
    return notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <Product session={session} product={product} />;
}
