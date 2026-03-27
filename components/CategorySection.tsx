import Link from "next/link";

const categories = ["Mens Apparel", "Womens Apparel", "Others"];

const CategorySection = () => {
  return (
    <section className="px-10 md:px-20 mt-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category}
            className="flex justify-center items-center h-40 md:h-80 bg-[gray] rounded-md"
          >
            <Link
              href="#"
              className="border px-4 py-2 text-sm md:text-xl font-semibold rounded-md"
            >
              {category}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
