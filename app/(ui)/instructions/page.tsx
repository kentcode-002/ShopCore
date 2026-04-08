"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Visit ShopCore",
    description: "Go to our website and explore our wide range of products.",
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
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253"
        />
      </svg>
    )
  },
  {
    number: "02",
    title: "Create an Account",
    description: "Sign up for a new account or log in if you already have one.",
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
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    )
  },
  {
    number: "03",
    title: "Browse Our Collection",
    description: "Explore our wide range of products and find your favorites.",
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
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    )
  },
  {
    number: "04",
    title: "Add to Cart",
    description: 'Click the "Add to Cart" button for the items you love.',
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
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    )
  },
  {
    number: "05",
    title: "Review Your Cart",
    description: "Go to your cart to review the items and make any changes.",
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
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    )
  },
  {
    number: "06",
    title: "Checkout Securely",
    description:
      "Complete your purchase by entering your shipping and payment details. Done!",
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
  }
];

export default function Instructions() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="w-full text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Getting Started
          </span>
          <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
            How to order from <span className="text-amber-600">ShopCore</span>
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Ordering from ShopCore is simple and hassle-free. Follow these easy
            steps to shop with joy!
          </p>
          <div className="mt-6 mx-auto w-12 h-0.75 rounded-full bg-amber-500" />
        </div>

        {/* Steps */}
        <ol className="relative space-y-4">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isActive = activeStep === index;

            return (
              <li key={index} className="relative flex gap-5 sm:gap-6">
                {/* Left: number + connector line */}
                <div className="flex flex-col items-center shrink-0">
                  <button
                    onClick={() => setActiveStep(isActive ? null : index)}
                    aria-label={`Step ${step.number}`}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 ${
                      isLast
                        ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200"
                        : isActive
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-white border-gray-200 text-gray-400 hover:border-amber-400 hover:text-amber-500"
                    }`}
                  >
                    {isLast ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </button>
                  {!isLast && (
                    <div
                      className={`w-px flex-1 mt-1 transition-colors duration-300 ${
                        isActive ? "bg-amber-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                {/* Right: card */}
                <div
                  onClick={() => setActiveStep(isActive ? null : index)}
                  className={`flex-1 mb-4 cursor-pointer rounded-2xl border bg-white px-5 py-4 transition-all duration-300 ${
                    isLast
                      ? "border-amber-300 shadow-md shadow-amber-100"
                      : isActive
                      ? "border-amber-300 shadow-sm shadow-amber-100"
                      : "border-gray-200 hover:border-amber-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 transition-colors duration-300 ${
                        isActive || isLast ? "text-amber-500" : "text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </span>
                    <div>
                      <h3
                        className={`font-semibold text-sm sm:text-base transition-colors duration-200 ${
                          isActive || isLast
                            ? "text-amber-600"
                            : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Footer note */}
        <div className="mt-10 text-center bg-white border border-gray-200 rounded-2xl px-6 py-6">
          <p className="text-sm text-gray-500">
            Need help with your order?{" "}
            <a
              href="mailto:support@shopcore.com"
              className="text-amber-600 font-semibold hover:underline"
            >
              Contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
