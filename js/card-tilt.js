import { prefersReducedMotion } from "./motion.js";

const MAX_TILT_DEGREES = 8;
const CSS_VARIABLES = ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"];

export function initCardTilt(cards) {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!canHover.matches || prefersReducedMotion) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      card.style.setProperty("--tilt-x", `${(0.5 - y) * MAX_TILT_DEGREES * 2}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * MAX_TILT_DEGREES * 2}deg`);
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
    });

    card.addEventListener("pointerleave", () => {
      CSS_VARIABLES.forEach((name) => card.style.removeProperty(name));
    });
  });
}
