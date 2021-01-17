import React from "react";

// var color = "#FF8C00";
const TabNav = ({ title, bgColor }) => {
  // const { bgColor } = styling;

  return (
    <>
      <label
        className="px-4 py-2 font-weight-bold"
        style={{
          margin: "0",
          background: bgColor,
          color: "#fff",
          fontFamily: "Poppins",
          // fontStyle: "italic",
          fontSize: "19px",
          borderRadius: "0.2em 1em 0 0",
        }}
      >
        {title}
      </label>
      <hr
        className="mb-2"
        style={{
          border: `2px solid ${bgColor}`,
          borderRadius: "0 10px 10px 0",
          margin: "0",
          marginTop: "-2px",
        }}
      />
    </>
  );
};
export default TabNav;
