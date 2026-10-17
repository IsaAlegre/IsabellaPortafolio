import { prefersReducedMotion } from "./motion.js";

const LINES = [
  { text: "$ node server.js", color: "#888888" },
  { text: "✓ Connected to PostgreSQL", color: "#10b981" },
  { text: "✓ API running on port 3000", color: "#10b981" },
  { text: "> Building logic that scales...", color: "#da627d" },
  { text: "> 3+ years · full stack · backend first ✦", color: "#da627d" },
];
const LINE_DELAY_MS = 600;
const RESTART_DELAY_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createLine({ text, color }) {
  const line = document.createElement("div");
  line.className = "terminal__line";
  line.style.color = color;
  line.textContent = text;
  return line;
}

function createCursor() {
  const cursor = document.createElement("span");
  cursor.className = "blinking-cursor";
  return cursor;
}

export async function initTerminal(output) {
  if (prefersReducedMotion) {
    output.append(...LINES.map(createLine), createCursor());
    return;
  }

  while (true) {
    output.replaceChildren();
    for (const line of LINES) {
      output.append(createLine(line));
      await sleep(LINE_DELAY_MS);
    }
    output.append(createCursor());
    await sleep(RESTART_DELAY_MS);
  }
}
