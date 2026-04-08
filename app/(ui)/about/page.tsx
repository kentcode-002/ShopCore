export default function About() {
  const values = [
    {
      title: "Customer First",
      description:
        "Every decision we make starts with our customers in mind. Your satisfaction drives everything we do.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      )
    },
    {
      title: "Quality Products",
      description:
        "We carefully curate every item in our catalog to ensure it meets our high standards for quality and value.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      )
    },
    {
      title: "Secure & Reliable",
      description:
        "Shop with confidence knowing your data and transactions are protected by industry-leading security.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      )
    },
    {
      title: "Fast Delivery",
      description:
        "We partner with trusted logistics providers to get your orders to your doorstep quickly and safely.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="w-full text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Our Story
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            About <span className="text-amber-600">ShopCore</span>
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Learn more about our mission, values, and the team behind our
            e-commerce platform.
          </p>
          <div className="mt-6 mx-auto w-12 h-0.75 rounded-full bg-amber-500" />
        </div>

        {/* Mission */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed text-base">
            ShopCore was founded with a simple belief: shopping online should be
            easy, enjoyable, and accessible to everyone. We set out to build a
            platform where quality products meet a seamless experience — from
            browsing to checkout to your doorstep.
          </p>
          <p className="text-gray-500 leading-relaxed text-base mt-4">
            Whether you're looking for the latest in fashion, everyday
            essentials, or unique finds, ShopCore is your one-stop destination.
            We work directly with trusted suppliers to bring you products that
            are worth your money and your time.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-amber-500 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Ready to start shopping?
          </h2>
          <p className="text-amber-100 text-sm sm:text-base mb-6">
            Join thousands of happy customers and discover what ShopCore has to
            offer.
          </p>
          <a
            href="/collections"
            className="inline-block bg-white text-amber-600 font-semibold text-sm sm:text-base px-7 py-3 rounded-xl hover:bg-amber-50 transition-colors duration-200"
          >
            Browse the Collection
          </a>
        </div>
      </div>
    </div>
  );
}
