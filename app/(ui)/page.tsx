import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Highlights from "@/components/Highlights";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store"
  });

  const products = await res.json();
  return (
    <div className="relative">
      <Hero />
      <CategorySection />
      <Highlights />
    </div>
  );
}
