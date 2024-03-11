import React from "react";

const Dropdown = ({ title, options, func}) => {
  return (
    <div className="select ">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled className="hidden">Select {title}</option>
        {options.map((o, i) => (
          <option key={i} onChange={func} value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
