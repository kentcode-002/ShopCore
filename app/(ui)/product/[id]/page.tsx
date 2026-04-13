import { auth } from "@/auth";
import Product from "./Product";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  let products: any = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    products = data;
  } catch (error) {
    console.error("Error fetching product:", error);
    products = null; // fallback
  }

  // 🔹 Get session (this now ALWAYS runs)
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // 🔹 Always return JSX (never return raw data)
  return <Product session={session} product={products} />;
}
