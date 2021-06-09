import React, { useRef, useState } from "react";

const Draggable = ({
  title,
  children,
  topPosition = null,
  leftPosition = null,
  unit = "px",
  className
}) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const drag = useRef();
  const [top, setTop] = useState(topPosition);
  const [left, setLeft] = useState(leftPosition);

  const setPosition = (e) =>
  {
    e.preventDefault();
    setTop(drag.current.offsetTop)
    setLeft(drag.current.offsetLeft)
    drag.current.id = "draggable-enabled";
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
    document.onmousemove = move;
  };

  const move = (e) =>
  {

    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    setLeft(drag.current.offsetLeft - pos1);
    setTop(drag.current.offsetTop - pos2);
  };

  return (
    <div
     id="draggable"
      ref={drag}
      style={{ top: top + unit, left: left + unit }}
      className={className}
    >
      <p draggable className="title" onMouseDown={setPosition}>
        {title}
      </p>
        {children}
    </div>
  );
};

export default Draggable;
