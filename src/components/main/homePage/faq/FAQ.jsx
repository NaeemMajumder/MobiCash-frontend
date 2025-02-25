import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing motion from Framer Motion
import { useInView } from "react-intersection-observer"; // Import Intersection Observer

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

  // Using the useInView hook to detect when the FAQ section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once when it enters the viewport
    threshold: 0.3, // When 30% of the section is visible
  });

  return (
    <motion.section
      ref={ref}
      className="max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#0A294A]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-[#164193] text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Framer Motion for Animated Answer */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: openIndex === index ? 1 : 0,
                height: openIndex === index ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-4 text-gray-700 text-sm sm:text-base"
            >
              {openIndex === index && faq.answer}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;
