import React from "react";

const Layers = () => (
  <>
    <input type="button" value="+" onClick={() => console.log("click+")} />
    <input type="button" value="-" onClick={() => console.log("click-")} />
  </>
);

export default Layers;
