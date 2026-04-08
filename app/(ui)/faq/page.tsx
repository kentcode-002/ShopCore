"use client";

import { useState } from "react";
import { faq } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="max-w-3xl mx-auto mt-10">
        {/* Header */}
        <div className="w-full text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-4">
            Support
          </span>
          <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight">
            Frequently Asked <br />
            <span className="text-amber-600">Questions</span>
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Find answers to common questions about ShopCore.
          </p>
          <div className="mt-6 mx-auto w-12 h-0.75 rounded-full bg-amber-500" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faq.map(
            (item: { question: string; answer: string }, index: number) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-amber-400 bg-white shadow-md shadow-amber-100"
                      : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                        isOpen
                          ? "text-amber-600"
                          : "text-gray-800 group-hover:text-amber-600"
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Icon */}
                    <span
                      className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "bg-amber-500 border-amber-500 rotate-45"
                          : "bg-transparent border-gray-300 group-hover:border-amber-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isOpen
                            ? "text-white"
                            : "text-gray-500 group-hover:text-amber-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5">
                        <div className="h-px bg-amber-100 mb-4" />
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 text-center bg-white border border-gray-200 rounded-2xl px-6 py-8">
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Still have questions? Our team is happy to help.
          </p>
          <a
            href="mailto:support@shopcore.com"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
