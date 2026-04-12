import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  let product: any = null;

  // 🔹 Fetch product safely
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 } // cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    product = await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    product = null; // fallback
  }

  // 🔹 Get session (this now ALWAYS runs)
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // 🔹 Always return JSX (never return raw data)
  return <Product session={session} product={product} />;
}
