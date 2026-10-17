const COPIES = 3;

export function initMarquees() {
  document.querySelectorAll(".marquee__track").forEach((track) => {
    const items = [...track.children];

    for (let copy = 1; copy < COPIES; copy++) {
      track.append(
        ...items.map((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          return clone;
        })
      );
    }

    track.style.setProperty("--copies", COPIES);
  });
}
