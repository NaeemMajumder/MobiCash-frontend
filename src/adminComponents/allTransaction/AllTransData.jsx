import React from "react";
import { UseAllTransaction } from "../../customHooks/tenStackQuery/UseTenSatack";
import AllTransactions from "./AllTransactions";
import Loading from "../../loading/Loading";

const AllTransData = () => {
  // use custom ten stack query for data fetch
  const [allTransactions] = UseAllTransaction();
  console.log(allTransactions);

  if (!allTransactions) {
    return <Loading />; // Prevent filter from running on undefined data
  }
  return (
    <div>
      <AllTransactions allTransactions={allTransactions} />
    </div>
  );
};

export default AllTransData;
