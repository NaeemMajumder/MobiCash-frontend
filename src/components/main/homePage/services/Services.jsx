import React from "react";
import Card from "../../shared/Card";

const Services = () => {
  const demoData = [
    {
      id: 1,
      title: "Fast Loan Processing",
      description:
        "Get quick and easy loan processing with our secure platform.",
      imageUrl: "https://thumbs.dreamstime.com/b/money-transaction-vector-logo-icon-design-buying-cash-symbol-illustration-illustrations-152825421.jpg",
    },
    {
      id: 2,
      title: "Secure Investments",
      description: "Invest securely with our range of financial products.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sR-bI2QfhFQiagKI09tpqXCIrgyAPfML7A&s",
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our customer support is available around the clock.",
      imageUrl: "",
    },
    {
      id: 4,
      title: "Instant Transfers",
      description: "Send and receive money instantly with no hassle.",
      imageUrl: "demo",
    },
  ];
  return (
    <>
      <div className="width">
        <h1 className="text-4xl font-bold text-[#0A294A] text-center mb-12">
          One Platform for all Financial Solutions
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 justify-items-center items-center">
        {demoData.map((item, index) => (
            <Card key={index} item={item}/>
        ))}
      </div>
      </div>
    </>
  );
};

export default Services;
