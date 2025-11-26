import React from "react";

const Selection = () => {
  return (
    <div className="p-4 flex flex-col shadow-[-6px_6px_17.5px_1px_#10285130] rounded-md">
      <label htmlFor="">Chose your service</label>
      <select
        name=""
        id=""
        className="p-2 outline-none border rounded-md mt-2 w-full"
      >
        <option value="Babysitter">BabySitter</option>
        <option value="oldagecare ">BabySitter</option>
        <option value="BabySitter">BabySitter</option>
        <option value="BabySitter">BabySitter</option>
        <option value="BabySitter">BabySitter</option>
      </select>
    </div>
  );
};

export default Selection;
