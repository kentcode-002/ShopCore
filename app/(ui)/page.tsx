import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Highlights from "@/components/Highlights";

export const dynamic = "force-dynamic"; // 👈 skip static generation

export default async function Home() {
  let products: any[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products");

    console.log("STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    console.log("DATA:", data);

    products = data;
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  return (
    <div className="relative">
      <Hero />
      <CategorySection />
      <Highlights products={products} />
    </div>
  );
}
