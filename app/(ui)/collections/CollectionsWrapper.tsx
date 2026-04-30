"use client";

import { useEffect, useState } from "react";
import Collections from "./Collections";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function CollectionsWrapper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Loading products...</h2>
      </div>
    );
  }

  return <Collections products={products} />;
}
