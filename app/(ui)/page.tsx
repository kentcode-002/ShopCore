import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import HighlightsWrapper from "@/components/HighlightsWrapper";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <CategorySection />
      <HighlightsWrapper />
    </div>
  );
}
