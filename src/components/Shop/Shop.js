import { React, useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Facilities from "../Facility/Facility";
import Wishlist from "../Wishlist/Wishlist";
import Form from "../Form/Form";
import Info from "../Info/Info";
import checkIco from "../../images/assets/ico-04.svg";

const Shop = () => {
  const [facilities, setFacilitiesData] = useState([]);
  const [tickets, setTicketsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Will be used to render Shop component and show registered facility
  const [submit, setSubmit] = useState(false);
  // Store reference to userPIN for child component Form to update without
  // causing render on seccessful onSubmit via Form component
  const userPIN = useRef("");
  // Current focused element
  const focusedFacility = useRef(null);

  useEffect(() => {
    // Server Consts
    const apiURL = process.env.REACT_APP_FASTRIDER_API_URI;
    const key = process.env.REACT_APP_FASTRIDER_API_KEY;

    // Fetch list of facilities before submit
    const getFacilitiesData = async () => {
      const endPoint = apiURL + "rides?token=" + key;
      setLoading(true);
      setError(null);

      try {
        const resp = await fetch(endPoint);
        const data = await resp.json();
        setFacilitiesData(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch server response after submit POST data
    const getTicketsResponse = async () => {
      const endPoint = apiURL + "tickets";
      let ride_id = parseInt(focusedFacility.current);

      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          pin: userPIN.current,
          ride_id: ride_id,
          token: key,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      setError(null);

      try {
        const resp = await fetch(endPoint, requestOptions);
        if (!resp.ok) {
          const message = `An error has occured: ${resp.status}`;
          throw new Error(message);
        }
        const data = await resp.json();
        setTicketsData(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (!submit) {
      getFacilitiesData();
    } else {
      getTicketsResponse();
    }
  }, [submit]);

  // Will be used to change submit state to true to pass
  // to child component
  function changeSubmitState() {
    setSubmit(true);
  }

  // Generating random number in range for use in facility book tickets rate
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Set Wishlist
  const [wishlist, setWishlist] = useState([]);
  //Wishlist Handler Function
  const handleWishlist = (facility) => {
    const facilityWishlist = [...wishlist, facility];
    setWishlist(facilityWishlist);
  };

  //Input form button style manipulation for mobile vs rest screens
  const { ref: facilitiesList, inView: facilitiesListInView } = useInView();

  return (
    <div className="flex flex-col justify-center items-center mx-4 sm:mx-auto">
      {submit ? (
        <div className="container grid grid-cols-1 mx-auto min-h-screen">
          {loading || error || tickets.ride === undefined ? (
            <div className="text-center mt-20">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            </div>
          ) : (
            <div className="w-1/2 mx-auto sm:w-1/4 mt-20">
              <div className="flex flex-col mb-10">
                <img
                  src={checkIco}
                  alt="Ticket Icon"
                  className="h-11 w-11 ico rounded-full p-1 mx-auto"
                />
                <h4 className="text-l font-semibold text-center w-2/3 mx-auto sm:w-auto">
                  Thank you for using The Jungle M FastRider ticket system -
                  your access code is now ready!
                </h4>
              </div>
              {console.log(tickets)}
              <Facilities
                // name={facilities[0].name}
                name={tickets.ride.name}
                // zone={facilities[0].zone}
                zone={tickets.ride.zone}
                // time={facilities[0].return_time}
                time={tickets.ride.return_time}
                // accessCode={"134A-7155-9CB1"}
                accessCode={tickets.access_code}
                // elementKey={facilities[0].id}
                elementKey={tickets.id} //Will be used for current selected facility id when submiting form
                submit={submit}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <Info />
          <Form
            inView={facilitiesListInView}
            setSubmit={changeSubmitState}
            userPIN={userPIN}
            focusedFacility={focusedFacility}
          />
          <span ref={facilitiesList}></span>
          <div className="container mx-auto grid grid-cols-3 gap-6 my-10 sm:grid-cols-4 sm:gap-12">
            <div className="col-span-2 grid grid-cols-2 gap-2 sm:col-span-3 sm:grid-cols-3 sm:gap-5">
              {facilities.map((facility, index) => {
                let price = randomNumberInRange(1, 10);
                facility = { ...facility, ...{ price: price } };
                {
                  return (
                    <Facilities
                      name={facility.name}
                      zone={facility.zone}
                      price={facility.price}
                      tickets={facility.remaining_tickets}
                      time={facility.return_time}
                      handleWishlist={handleWishlist}
                      elementKey={facility.id} //Will be used for current selected facility id when submiting form
                      focusedFacility={focusedFacility} //Will be used for current selected facility id when submiting form
                      key={index} // For safety porpoises and as for react official guidelines
                    ></Facilities>
                  );
                }
              })}
            </div>
            <div className="col-span-1 text-center">
              <Wishlist wishlist={wishlist}></Wishlist>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Shop;
