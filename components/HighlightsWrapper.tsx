"use client";

import { useEffect, useState } from "react";
import Highlights from "./Highlights";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export default function HighlightsWrapper() {
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
      <section className="px-10 md:px-20 mt-12 text-center">
        <p className="text-sm md:text-2xl font-bold">Featured</p>

        <div className="mt-6 text-gray-500">Loading products...</div>
      </section>
    );
  }

  return <Highlights products={products} />;
}
