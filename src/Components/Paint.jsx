import React from "react";


const Paint = () => {
  const handleClick = (e) => {
    e.preventDefault();
    import("../utils/Drawer").then((a) => a.drawer());
  };

  return (
    <div>
      <input
        type="button"
        value="&#9998; Paint"
        onClick={(e) => handleClick(e)}
      />
      <input type="color" name="color" />
      <input type="range" name="strokewidth" defaultValue={5} />
    </div>
  );
};

export default Paint;
