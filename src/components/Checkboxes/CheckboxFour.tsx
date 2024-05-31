import React from "react";

const CheckboxFour = (props: any) => {
  return (
    <div>
      <label
        htmlFor={`checkboxLabelFour_${props.value}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="radio"
            id={`checkboxLabelFour_${props.value}`}
            className="sr-only"
            name="type" // Ensure the name attribute is the same for grouping
            value={props.value}
            checked={props.selectedType === props.value} // Control checked state
            onChange={props.handleRadioChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              props.selectedType === props.value
                ? "border-primary"
                : "border-gray-300"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                props.selectedType === props.value ? "!bg-primary" : ""
              }`}
            />
          </div>
        </div>
        {props.name}
      </label>
    </div>
  );
};

export default CheckboxFour;
