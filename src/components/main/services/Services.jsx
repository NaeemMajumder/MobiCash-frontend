import React from "react";
import ServicesCard from "../homePage/services/ServicesCard";

const Services = () => {
  const demoData = [
    {
      id: 1,
      title: "Send Money",
      description:
        "Send money from MobiCash to any number instantly",
      imageUrl:
        "/images/send-money.png",
        link:'/sendMoney'
    },
    {
      id: 2,
      title: "Cash Out",
      description: "Withdraw cash anytime from the largest agent and ATM network of Bangladesh",
      imageUrl:
        "/images/cash-out.png",
        link:'/cashOut'
    },
    {
      id: 2,
      title: "Cash In to User",
      description: "Withdraw cash anytime from the largest agent and ATM network of Bangladesh",
      imageUrl:
        "/images/cash-in.png",
        link:'/cashIn'
    },
    {
      id: 2,
      title: "Withdraw Balance",
      description: "Recharge any number and get the best offer",
      imageUrl:
        "/images/cash-out.png",
        link:'/withdrawBalance'
    },
  ];
  return (
    <>
    <div className="w-full bg-[#F2F6FE]">
    <section className="width">
        <h1 className="text-4xl text-center py-20 font-bold text-[#0A294A] plusJakarta">
          Select a Service
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 px-6 justify-items-center items-center pb-32">
          {demoData.map((item, index) => (
            <ServicesCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;
