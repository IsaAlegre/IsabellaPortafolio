const SECTION_IDS = ["hero", "sobre-mi", "proyectos", "experiencia", "contacto"];
const SCROLL_OFFSET = 100;

const documentTop = (element) =>
  element.getBoundingClientRect().top + window.scrollY;

export function initMobileMenu(toggle, menu) {
  const icon = toggle.querySelector(".material-symbols-outlined");

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    icon.textContent = open ? "close" : "menu";
  };

  toggle.addEventListener("click", () => setOpen(menu.hidden));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
}

export function initFloatingNav(button) {
  const icon = button.querySelector(".material-symbols-outlined");
  const sections = SECTION_IDS.map((id) => document.getElementById(id));
  const lastSection = sections.at(-1);

  const isAtEnd = () =>
    window.scrollY + SCROLL_OFFSET >= documentTop(lastSection) ||
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

  const updateButton = () => {
    const atEnd = isAtEnd();
    icon.textContent = atEnd ? "arrow_upward" : "arrow_downward";
    button.setAttribute(
      "aria-label",
      atEnd ? "Volver arriba" : "Ir a la siguiente sección"
    );
  };

  button.addEventListener("click", () => {
    if (isAtEnd()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const position = window.scrollY + SCROLL_OFFSET;
    sections
      .find((section) => documentTop(section) > position)
      ?.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", updateButton, { passive: true });
  updateButton();
}
