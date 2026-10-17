import { prefersReducedMotion } from "./motion.js";

const AREA_PER_STAR = 10000;
const ACCENT_RATIO = 0.2;
const ACCENT_COLOR = "#da627d";
const NEUTRAL_COLOR = "#e0e3e8";

const createStar = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 1.5,
  vx: Math.random() - 0.5,
  vy: Math.random() - 0.5,
  color: Math.random() < ACCENT_RATIO ? ACCENT_COLOR : NEUTRAL_COLOR,
});

export function initStarfield(canvas) {
  const context = canvas.getContext("2d");
  let stars = [];

  const paint = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      context.fillStyle = star.color;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });
  };

  const move = (star) => {
    star.x += star.vx;
    star.y += star.vy;
    if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
  };

  const tick = () => {
    stars.forEach(move);
    paint();
    requestAnimationFrame(tick);
  };

  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const count = Math.floor((canvas.width * canvas.height) / AREA_PER_STAR);
    stars = Array.from({ length: count }, () =>
      createStar(canvas.width, canvas.height)
    );
    paint();
  };

  new ResizeObserver(resize).observe(canvas);

  if (!prefersReducedMotion) {
    requestAnimationFrame(tick);
  }
}
