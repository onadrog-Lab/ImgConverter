export const modifier = (file) => {
  const reader = new FileReader();
  const canvas = document.getElementById("imgSrc");
  const ctx = canvas.getContext("2d");
  const lightRange = document.getElementById("light");
  const satRange = document.getElementById("sat");
  const hueRange = document.getElementById("hue");
  const image = new Image();
  const filterInput = document.getElementsByName("filter");
  const w = canvas.width;
  const h = canvas.height;
  const Sepia = document.getElementById("Sepia");
  const Invert = document.getElementById("Invert");
  const Default = document.getElementById("Default");
  const restHsl = document.getElementById("resetHSL");
  const grid = document.querySelector("#form-grid");
  const computeredStyle = window.getComputedStyle(grid);
  reader.onloadend = (e) => {
    const gridHeight = [
      ...computeredStyle
        .getPropertyValue("grid-template-columns")
        .split(" ")
        .slice(1 - 6),
    ];
    const gridRow = [
      ...computeredStyle
        .getPropertyValue("grid-template-rows")
        .split(" ")
        .slice(2 - 4),
    ];
    const width = gridHeight.reduce((acc, curr) => {
      return parseInt(acc, 10) + parseInt(curr, 10);
    });
    const height = gridRow.reduce((acc, curr) => {
      return parseInt(acc, 10) + parseInt(curr, 10);
    });
    image.src = e.target.result;
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.style.maxWidth = width + "px";
      canvas.style.maxHeight = height + "px";
      sessionStorage.setItem("nw", image.naturalWidth);
      sessionStorage.setItem("nh", image.naturalHeight);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(image, 0, 0);
    };
  };
  reader.readAsDataURL(file);

  let over = false;
  let scale = 1;
  let isDown = false;
  let last = { x: 0, y: 0 };
  let startCoords = { x: 0, y: 0 };
  let spaceDown = false;
  const canvasOver = () => {
    canvas.tabIndex = -1;
    canvas.focus();
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        spaceDown = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") spaceDown = false;
    };

    if (spaceDown) {
      console.log(eval(spaceDown));
      canvas.onmousedown = (e) => {
        if (spaceDown) {
          isDown = true;
          startCoords = {
            x: e.clientX - canvas.offsetLeft - last.x,
            y: e.clientY - canvas.offsetTop - last.y,
          };
        }
      };
      canvas.onmousemove = (e) => {
        if (spaceDown) {
          let xVal = e.clientX - canvas.offsetLeft,
            yVal = e.clientY - canvas.offsetTop;
          if (isDown) {
            canvas.style.transform = `matrix(${scale}, 0,0,${scale}, ${
              xVal - startCoords.x
            }, ${yVal - startCoords.y})`;
          }
        }
      };
      canvas.onmouseup = function (e) {
        isDown = false;
        last = {
          x: e.clientX - canvas.offsetLeft - startCoords.x,
          y: e.clientY - canvas.offsetTop - startCoords.y,
        };
      };
    }
    canvas.onkeyup = handleKeyUp;
    canvas.onkeydown = handleKeyDown;
    canvas.onwheel = (event) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        scale *= event.deltaY * -0.2;
      } else {
        scale /= event.deltaY * 0.2;
      }
      canvas.style.transform = `matrix(${scale}, 0,0,${scale}, ${
        xVal - startCoords.x
      }, ${yVal - startCoords.y})`;
    };
    over ? requestAnimationFrame(canvasOver) : cancelAnimationFrame(canvasOver);
  };

  canvas.onmouseover = () => {
    over = true;
    canvasOver();
  };

  canvas.onmouseout = () => ((over = false), (isDown = false));

  const render = () => {
    let sat = +satRange.value,
      hue = +hueRange.value,
      lig = +lightRange.value,
      sep = Sepia.checked ? 100 : 0,
      inv = Invert.checked ? 100 : 0;

    ctx.filter = `saturate(${sat}%) brightness(${lig}%) hue-rotate(${hue}deg) invert(${inv}%) sepia(${sep}%)`;
    ctx.drawImage(image, 0, 0);
  };

  const reset = () => {
    lightRange.value = 100;
    satRange.value = 100;
    hueRange.value = 0;
    render();
  };
  restHsl.onclick = reset;
  hueRange.oninput = satRange.oninput = lightRange.oninput = Sepia.oninput = Invert.oninput = Default.oninput = render;
};