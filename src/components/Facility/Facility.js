import "./Facility.scss";
import { React, useState } from "react";
import ticketIco from "../../images/assets/ico-01.svg";
import timeIco from "../../images/assets/ico-03.svg";

const Facility = (prop) => {
  const {
    name,
    zone,
    price,
    tickets,
    time,
    submit,
    focusedFacility,
    elementKey,
    accessCode,
  } = prop;
  const [focus, setFocus] = useState(false);
  var date = new Date();

  return (
    <div
      className="shadow-2xl rounded-sm facility hover:opacity-80"
      tabIndex="-1"
      onFocus={() => {
        if (!submit) {
          setFocus(true);
          focusedFacility.current = elementKey;
        }
      }}
      onBlur={() => {
        setFocus(false);
        // if (!submit) {
        //   focusedFacility.current = null;
        // }
      }}
      style={focus ? { backgroundColor: zone.color } : {}}
    >
      <hr
        className="h-3 mb-1 border-0"
        style={{ backgroundColor: zone.color }}
      ></hr>
      {submit ? (
        <div className="px-2 py-0 text-center">
          <div className="flex justify-between pb-2">
            <h4 className="text-xs text-white font-black text-left">{name}</h4>
            <h4 className="text-xs font-black text-right">{zone.name}</h4>
          </div>
          <h4 className="text-xs font-black pt-4">Return At</h4>
          <h1 className="text-2xl text-white font-extrabold ">
            {date.getHours(time) + ":" + date.getMinutes(time)}
          </h1>
          <h4 className="text-xs font-black pt-4">Access Code</h4>
          <h1 className="text-2xl text-white font-extrabold pb-4">
            {accessCode}
          </h1>
        </div>
      ) : (
        <div className="p-5 text-center">
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-l font-semibold text-left">
              {price}
              <i className="fas fa-dollar-sign"></i>
            </h4>
            <h4 className="text-l font-semibold text-right">{zone.name}</h4>
          </div>
          <h1 className="text-2xl text-white font-extrabold">{name}</h1>
          <br />
          <div className="flex items-center justify-between">
            <i className="fa py-1 px-2 rounded-lg mt-2 ">
              <img
                src={timeIco}
                alt="Time Icon"
                className="h-4 w-4 inline filterDarkGrey"
              />{" "}
              {date.getHours(time) + ":" + date.getMinutes(time)}
            </i>
            <i className="fa py-1 px-2 rounded-lg mt-2 ">
              <img
                src={ticketIco}
                alt="Ticket Icon"
                className="h-4 w-4 inline filterDarkGrey"
              />{" "}
              {tickets}
            </i>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => prop.handleWishlist(prop)}
              className="py-1 px-2 rounded mt-4 btn font-semibold"
            >
              <i className="fa fa-heart"></i> Add To Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facility;
