import React, { lazy, Suspense, useState } from "react";
import { render } from "react-dom";
import "./App.css";
const Layers = lazy(() => import("./Components/Layers"));
const Hue = lazy(() => import("./Components/Hue"));
const Filters = lazy(() => import("./Components/Filters"));
const Draggable = lazy(() => import("./Components/Draggable"));
const Paint = lazy(() => import("./Components/Paint"));

const ImageInput = () => {
  const [type, setType] = useState("webp");
  const [qual, setQual] = useState(80);

  const handleSubmit = (e) => {
    e.preventDefault();
    const img = document.getElementById("imgSrc");
  };

  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <form id="form-grid">
          <input
            id="imageInput"
            accept="image/*"
            type="file"
            multiple={false}
            onChange={(e) =>
              import("./utils/modifier").then((module) =>
              {
                console.log(module)
                module.modifier(e.target.files[0]);
              })
            }
          />
          <br />
          <Paint />
          <Draggable title="Filters" className="widget">
            <Filters />
          </Draggable>
          <Draggable title="HSL" className="widget">
            <Hue />
          </Draggable>
          <Draggable title="Layers" className="layers">
            <Layers />
          </Draggable>
          <div id="imgContainer">
            <canvas id="imgSrc"></canvas>
          </div>
          <br />{" "}
          <div className="gridSave">
            <div className="format">
              <select name="" id="" onChange={(e) => setType(e.target.value)}>
                <option value="webp">WebP</option>
                <option value="jp2">JPEG 2000</option>
                <option value="jpx">JPEG XR</option>
              </select>
            </div>
            <div className="quality">
              <input
                type="range"
                list="tickmarks"
                value={qual}
                step="10"
                onChange={(e) => setQual(e.target.value)}
                placeholder={"Quality: " + qual + "%"}
              />
              <small>Quality: {qual}%</small>
            </div>
            <button
              className="save"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </button>
          </div>
        </form>
      </Suspense>
    </>
  );
};

//export default ImageInput

render(<ImageInput />, document.getElementById("root"));
