import React from "react";
import Card from "../../shared/Card";

const Services = () => {
  const demoData = [
    {
      id: 1,
      title: "Fast Loan Processing",
      description:
        "Get quick and easy loan processing with our secure platform.",
      imageUrl: "https://media.istockphoto.com/id/1140830187/vector/quick-credit-clock-and-bag-time-is-money-fast-loan-payment-period-savings-account-vector.jpg?s=612x612&w=0&k=20&c=T_B0pV62Kvh41oeSx4oC7j0JQArl0taRkApzXJfoYcw=",
    },
    {
      id: 2,
      title: "Secure Investments",
      description: "Invest securely with our range of financial products.",
      imageUrl: "https://media.istockphoto.com/id/179537236/photo/savings-protection.jpg?s=612x612&w=0&k=20&c=NOx_LIHOyQ3SwDsE67xNh13GKmNsq0ywPIsbP1AN4G8=",
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our customer support is available around the clock.",
      imageUrl: "https://img.freepik.com/free-vector/service-24-7-concept-illustration_114360-7380.jpg",
    },
    {
      id: 4,
      title: "Instant Transfers",
      description: "Send and receive money instantly with no hassle.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27uAPGVR6QLCSosUaFDvO6qTqBttK2UBTdw&s",
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
