export const drawer = () => {
  const canvas = document.getElementById("imgSrc");
  const ctx = canvas.getContext("2d");
  const color = document.getElementsByName("color")[0];
  const strokewidth = document.getElementsByName("strokewidth")[0];
  ctx.save();

  let getStroke = strokewidth.value;
  let isPainting = false;
  let getcolor = "#000";
  let point = [];
  const handlePaint = () => {
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();

      point.push({
        x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
      });
    };

    canvas.onmousedown = (e) => {
      isPainting = true;
      getPos(e);
    };

    const getpoint = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
      };
    };

    const draw = (e) => {
      if (!isPainting) return;
      strokewidth.onchange = (e) => (getStroke = e.target.value);
      color.onchange = (ev) => (getcolor = ev.target.value);
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineWidth = +getStroke;
      ctx.strokeStyle = getcolor;
      ctx.moveTo(point[0].x, point[0].y);
      const points = getpoint(e);
      getPos(e);
      for (let i = 1; i < point.length - 2; i++) {
        const c = (point[i].x + point[i + 1].x) / 2;
        const d = (point[i].y + point[i + 1].y) / 2;
        ctx.quadraticCurveTo(point[i].x, point[i].y, c, d);

      }
      ctx.stroke();
    };
    canvas.onmousemove = (e) => {
      draw(e);
    };

    requestAnimationFrame(handlePaint);
  };

  canvas.onmouseup = () => (isPainting = false, point=[]);

  canvas.onmouseover = handlePaint;
};
