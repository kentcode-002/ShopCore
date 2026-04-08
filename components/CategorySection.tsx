import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    label: "Mens Apparel",
    href: "/collections/mens-apparel",
    image: "/images/mens-apparel.jpg"
  },
  {
    label: "Womens Apparel",
    href: "/collections/womens-apparel",
    image: "/images/womens-apparel.jpg"
  },
  {
    label: "Others",
    href: "/collections/others",
    image: "/images/others-apparel.jpg"
  }
];

const CategorySection = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-3">
          Shop by Category
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Find What You're Looking For
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="group relative overflow-hidden rounded-2xl h-56 sm:h-64 md:h-72 lg:h-80 bg-gray-200 block"
          >
            {/* Background image */}
            <Image
              src={category.image}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  {category.label}
                </h3>
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/40 bg-white/10 text-white transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
