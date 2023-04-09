import React from "react";

const WishlistName = (prop) => {
  const { facilityDetails } = prop;
  return (
    <div className="shadow-xl rounded-xl flex items-center gap-4 mt-4">
      <p>{facilityDetails.name}</p>
    </div>
  );
};

export default WishlistName;
