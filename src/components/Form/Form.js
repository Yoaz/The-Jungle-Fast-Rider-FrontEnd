import { useState } from "react";
import { isValidInput } from "./isValidInput";
import "./Form.scss";

export default function Form({ inView, setSubmit, userPIN, focusedFacility }) {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [savedInputValue, setSavedInputValue] = useState("");
  const [savedInputValues, setSavedInputValues] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setIsValid(inputValue === "" ? null : isValidInput(inputValue));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      setSavedInputValue(inputValue);
      setSavedInputValues([...savedInputValues, inputValue]);
      userPIN.current = event.target.pin.value;
      event.currentTarget.disabled = true;
      setSubmit(true);
    }
  };

  // To be used for SUBMIT button - disabled if not in Park
  // working hours (09:00 - 19:00)
  function checkTime() {
    var d = new Date(); // current time
    var hours = d.getHours();
    return hours >= 9 && hours < 19;
  }

  // Conditions to make 'submit' button active/disabled
  const activeDisabled = () => {
    return (
      isValid === false ||
      !inputValue ||
      !focusedFacility.current ||
      !checkTime()
    );
  };

  return (
    <div
      className={`container pb-0 sm:pt-12 sm:static ${
        inView ? `fixed bottom-0 z-10` : ``
      }`}
    >
      {console.log(focusedFacility.current)}
      <form onSubmit={handleFormSubmit}>
        {isValid !== null && (
          <p className="pt-0 mt-0 error content">
            {isValid ? "" : "Invalid input"}
          </p>
        )}
        <input
          type="text"
          placeholder="#PIN"
          name="pin"
          value={inputValue}
          onChange={handleInputChange}
          list="inputValues"
          className="p-4 text-xl w-4/5 rounded-sm"
          maxLength={15}
        />
        <datalist id="inputValues">
          {savedInputValues.map((value) => (
            <option key={value} value={value} />
          ))}
        </datalist>
        <button
          type="submit"
          disabled={activeDisabled()}
          className="p-4 text-xl font-bold button w-1/5 rounded-sm"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
