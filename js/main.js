import { initCardTilt } from "./card-tilt.js";
import { initCarousel } from "./carousel.js";
import { initContactForm } from "./contact-form.js";
import { initHeroCursor } from "./hero-cursor.js";
import { initMarquees } from "./marquee.js";
import { initFloatingNav, initMobileMenu } from "./navigation.js";
import { initProjectModal } from "./project-modal.js";
import { initReveal } from "./reveal.js";
import { initStarfield } from "./starfield.js";
import { initTerminal } from "./terminal.js";
import { initTerrain } from "./terrain.js";

const byId = (id) => document.getElementById(id);

document.documentElement.classList.add("js");

initStarfield(byId("starfield"));
initTerrain(byId("terrain"));
initTerminal(byId("terminal-output"));
initHeroCursor(byId("hero"), byId("cursor-dot"), byId("cursor-ring"));
initMarquees();
initReveal();
initMobileMenu(byId("menu-toggle"), byId("mobile-menu"));
initFloatingNav(byId("floating-nav"));
initCarousel(
  byId("project-track"),
  byId("carousel-prev"),
  byId("carousel-next")
);
initCardTilt(document.querySelectorAll(".project-card"));
initProjectModal(
  byId("project-modal"),
  byId("project-modal-body"),
  byId("project-modal-close")
);
initContactForm(byId("contact-form"), byId("form-status"));
