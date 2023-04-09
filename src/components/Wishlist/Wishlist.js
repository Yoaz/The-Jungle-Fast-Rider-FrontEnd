import React from "react";
import WishlistName from "../WishlistNames/WishlistName";
import { useSendTransaction, useEthers } from "@usedapp/core";

const Wishlist = (prop) => {
  const { wishlist } = prop;
  let total = 0;
  for (const facility of wishlist) {
    const facilityPrice = facility.price;
    total += facilityPrice;
  }

  // Pay with crypto setup
  const { sendTransaction, state } = useSendTransaction();
  const status = state.status;
  const address = process.env.REACT_APP_DEV_WALLET_ADDRESS;
  const { account, activateBrowserWallet } = useEthers();

  const handleClick = () => {
    if (!account) activateBrowserWallet();
    void sendTransaction({ to: address, value: total });
  };

  return (
    <div className="shadow-2xl h-1/5 top-0 sticky mt-2 rounded-2xl p-5 overflow-y-auto">
      <h2 className="text-2xl my-5 font-semibold">Wishlist</h2>
      <hr />
      <div className="text-left ml-3 mt-3">
        <h2 className="text-xl my-2">Facility Added: {wishlist.length}</h2>
        <h2 className="text-xl">Total Cost: {total} $</h2>
        {wishlist.map((facility) => (
          <WishlistName
            facilityDetails={facility}
            key={Math.random()}
          ></WishlistName>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="py-1 px-2 rounded mt-4 btn font-semibold"
          onClick={() => handleClick()}
        >
          <i className="fas fa-dollar-sign"></i> Pay With Crypto!
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
