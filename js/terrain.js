import { prefersReducedMotion } from "./motion.js";

const ROWS = 26;
const COLUMNS_DESKTOP = 44;
const COLUMNS_MOBILE = 24;
const MOBILE_MAX_WIDTH = 640;
const MAX_PIXEL_RATIO = 2;
const SCROLL_SPEED = 0.3;
const WAVE_SPEED = 0.35;
const HORIZON_RATIO = 0.1;
const AMPLITUDE_RATIO = 0.22;
const FAR_WIDTH_RATIO = 0.55;
const SPREAD_RATIO = 2.2;
const LINE_RGB = "218, 98, 125";
const GROUND_COLOR = "#101418";

const waveHeight = (column, worldRow, time) =>
  0.6 * Math.sin(column * 0.45 + worldRow * 0.3 + time * WAVE_SPEED) +
  0.4 * Math.sin(worldRow * 0.6 + column * 0.15 - time * WAVE_SPEED * 0.6);

export function initTerrain(canvas) {
  const context = canvas.getContext("2d");
  const size = { width: 0, height: 0, columns: COLUMNS_DESKTOP };
  let frameId = null;

  const buildRow = (rowIndex, base, fraction, time) => {
    const { width, height, columns } = size;
    const horizon = height * HORIZON_RATIO;
    const depth = (rowIndex + fraction) / ROWS;
    const worldRow = rowIndex - base;
    const groundY = horizon + (height - horizon) * depth * depth;
    const spread =
      ((width * SPREAD_RATIO) / columns) *
      (FAR_WIDTH_RATIO + (1 - FAR_WIDTH_RATIO) * depth);
    const lift = height * AMPLITUDE_RATIO * depth;

    return Array.from({ length: columns + 1 }, (_, column) => ({
      x: width / 2 + (column - columns / 2) * spread,
      y: groundY - lift * waveHeight(column, worldRow, time),
    }));
  };

  const traceStrip = (far, near) => {
    context.beginPath();
    far.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    for (let index = near.length - 1; index >= 0; index--) {
      context.lineTo(near[index].x, near[index].y);
    }
    context.closePath();
  };

  const traceGrid = (far, near) => {
    context.beginPath();
    far.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    far.forEach((point, index) => {
      context.moveTo(point.x, point.y);
      context.lineTo(near[index].x, near[index].y);
    });
  };

  const render = (now) => {
    const time = now / 1000;
    const scroll = time * SCROLL_SPEED;
    const base = Math.floor(scroll);
    const fraction = scroll - base;
    const rows = Array.from({ length: ROWS + 1 }, (_, index) =>
      buildRow(index, base, fraction, time)
    );

    context.clearRect(0, 0, size.width, size.height);
    context.lineWidth = 1;

    for (let index = 0; index < ROWS; index++) {
      const depth = (index + fraction) / ROWS;
      traceStrip(rows[index], rows[index + 1]);
      context.fillStyle = GROUND_COLOR;
      context.fill();

      traceGrid(rows[index], rows[index + 1]);
      context.strokeStyle = `rgba(${LINE_RGB}, ${Math.min(1, depth * 1.8) * 0.55})`;
      context.stroke();
    }
  };

  const tick = (now) => {
    render(now);
    frameId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frameId === null) frameId = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = null;
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    size.width = canvas.clientWidth;
    size.height = canvas.clientHeight;
    size.columns =
      size.width <= MOBILE_MAX_WIDTH ? COLUMNS_MOBILE : COLUMNS_DESKTOP;
    canvas.width = size.width * ratio;
    canvas.height = size.height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (prefersReducedMotion) render(0);
  };

  new ResizeObserver(resize).observe(canvas);

  if (!prefersReducedMotion) {
    new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    ).observe(canvas);
  }
}