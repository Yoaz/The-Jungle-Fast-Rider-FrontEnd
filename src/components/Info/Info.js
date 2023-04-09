import ticketIco from "../../images/assets/ico-01.svg";
import locationIco from "../../images/assets/ico-02.svg";
import timeIco from "../../images/assets/ico-03.svg";
import "./info.scss";

export default function Info() {
  // info dictionary
  const info = {
    tickets:
      "Enter your park ticket #PIN number, then select the desired ride while noting the stated return time",
    submit: "Press 'submit' to confirm and retrieve your access code",
    time:
      "When the time comes, use the special FastRider line to cut out a considerable wait time",
  };

  return (
    <div className="container pt-6 pb-0 mx-auto grid grid-cols-1 gap-10 my-5 sm:grid-cols-3 sm:gap-12 sm:my-10 sm:pt-12">
      <div className="flex flex-col">
        <img
          src={ticketIco}
          alt="Ticket Icon"
          className="h-11 w-11 ico rounded-full p-1 mx-auto"
        />
        <h4 className="text-l font-semibold text-center w-2/3 mx-auto sm:w-auto">
          {info.tickets}
        </h4>
      </div>
      <div className="flex flex-col">
        <img
          src={locationIco}
          alt="Location Icon"
          className="h-11 w-11 ico rounded-full p-1 mx-auto"
        />
        <h4 className="text-l font-semibold text-center w-2/3 mx-auto sm:w-auto">
          {info.submit}
        </h4>
      </div>
      <div className="flex flex-col">
        <img
          src={timeIco}
          alt="Time Icon"
          className="h-11 w-11 ico rounded-full p-1 mx-auto"
        />
        <h4 className="text-l font-semibold text-center w-2/3 mx-auto sm:w-auto">
          {info.time}
        </h4>
      </div>
    </div>
  );
}
