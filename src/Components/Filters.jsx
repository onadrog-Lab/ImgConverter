import React from "react";

const Filters = () => (
  <div className="filtersDrag">
    <label htmlFor="Default">None</label>
    <input type="radio" name="filter" id="Default" defaultChecked />
    <br />
    <label htmlFor="Sepia">Sepia</label>
    <input type="radio" name="filter" id="Sepia" />
    <br />
    <label htmlFor="Invert">Invert Colors</label>
    <input type="radio" name="filter" id="Invert" />
    <br />
    <label htmlFor="Aberration">Chromatic Aberration</label>
    <input type="radio" name="filter" id="Aberration" />
  </div>
);

export default Filters;
