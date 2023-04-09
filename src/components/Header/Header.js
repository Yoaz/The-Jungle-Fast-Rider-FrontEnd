import "./Header.scss";
import { React, useState } from "react";
import { info } from "../../info/info";
import WalletConnect from "../WalletConnect/WalletConnect";

const Header = () => {
  //PopUp menu
  const [accountIsShown, setaccountIsShown] = useState(false);
  const toggleAccountIsShown = () => {
    setaccountIsShown((accountIsShown) => !accountIsShown);
  };

  return (
    <div className="header">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <h2 className="ml-3 text-2xl font-semibold text-white">
          {info.company + info.tradeMark + " " + info.service + " Service"}
        </h2>

        <div className="hidden md:flex">
          <button onClick={toggleAccountIsShown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>
        </div>
        {accountIsShown && (
          <div className="absolute z-10 top-0 right-0 w-max-content text-white px-4 py-6 toggle">
            <div className="flex justify-between space-x-4">
              <WalletConnect />
              <div className="text-sm align-middle group hover: cursor-pointer hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={toggleAccountIsShown}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
