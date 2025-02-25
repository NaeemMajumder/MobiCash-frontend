import React, { useState } from "react";

const faqs = [
  {
    question: "What is Seamless Banking?",
    answer:
      "Seamless Banking allows you to manage your finances anytime, anywhere with secure mobile banking solutions.",
  },
  {
    question: "How secure is my personal information?",
    answer:
      "We use advanced encryption and security measures to protect your personal data and transactions.",
  },
  {
    question: "Can I transfer funds internationally?",
    answer:
      "Yes! Our banking services support international fund transfers with minimal fees and fast processing.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Simply click on 'Forgot Password' on the login page and follow the instructions to reset your password.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#0A294A]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-[#164193] text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700 text-sm sm:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
