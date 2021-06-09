import React from "react";

const Hue = () => (
  <>
    <label>Hue</label>
    <input type="range" name="hue" defaultValue={0} id="hue" max={359} />
    <br />
    <label>Sat</label>
    <input type="range" name="sat" defaultValue={100} max={200} id="sat" />
    <br />
    <label>lig</label>
    <input type="range" name="lum" defaultValue={100} max={200} id="light" />
    <br />
    <input type="button" value="reset" id="resetHSL" />
  </>
);

export default Hue;
