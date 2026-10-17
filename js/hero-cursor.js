const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 8;
const RING_EASING = 0.15;

export function initHeroCursor(hero, dot, ring) {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  hero.classList.add("has-custom-cursor");

  const words = hero.querySelectorAll(".magnetic-word");
  const pointer = { x: 0, y: 0 };
  const ringPosition = { x: 0, y: 0 };
  let frame = null;

  const place = (element, { x, y }) => {
    element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  const attract = ({ x, y }) => {
    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2);
      word.style.transform =
        Math.hypot(dx, dy) < MAGNET_RADIUS
          ? `translate(${(dx / MAGNET_RADIUS) * MAGNET_STRENGTH}px, ${
              (dy / MAGNET_RADIUS) * MAGNET_STRENGTH
            }px) scale(1.1)`
          : "";
    });
  };

  const followPointer = () => {
    ringPosition.x += (pointer.x - ringPosition.x) * RING_EASING;
    ringPosition.y += (pointer.y - ringPosition.y) * RING_EASING;
    place(ring, ringPosition);
    frame = requestAnimationFrame(followPointer);
  };

  hero.addEventListener("pointerenter", (event) => {
    pointer.x = ringPosition.x = event.clientX;
    pointer.y = ringPosition.y = event.clientY;
    hero.classList.add("is-active");
    frame = requestAnimationFrame(followPointer);
  });

  hero.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    place(dot, pointer);
    attract(pointer);
  });

  hero.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    hero.classList.remove("is-active");
    words.forEach((word) => {
      word.style.transform = "";
    });
  });
}
