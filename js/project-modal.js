import { PROJECTS } from "./project-data.js";

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createList(className, itemClassName, items) {
  const list = createElement("ul", className);
  list.append(...items.map((item) => createElement("li", itemClassName, item)));
  return list;
}

function createSection(label, content) {
  return [createElement("h3", "modal__label", label), content];
}

function createTextSection(label, text) {
  return createSection(label, createElement("p", "modal__text", text));
}

function createGithubLink(url) {
  const link = createElement("a", "button button--solid", "Ver en GitHub ");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(createElement("span", "material-symbols-outlined", "arrow_forward"));

  const actions = createElement("div", "modal__actions");
  actions.append(link);
  return actions;
}

function createProjectContent(project) {
  const title = createElement("h2", "modal__title", project.title);
  title.id = "project-modal-title";

  return [
    title,
    createElement("p", "modal__subtitle", project.subtitle),
    createList("pill-list", "pill", project.tags),
    ...createTextSection("El Problema", project.problem),
    ...createTextSection("Mi Rol", project.role),
    ...createSection(
      "Stack Completo",
      createList("stack-list", "stack-pill", project.stack)
    ),
    ...createTextSection("Duración", project.duration),
    ...createTextSection("La Solución", project.solution),
    createGithubLink(project.link),
  ];
}

export function initProjectModal(dialog, body, closeButton) {
  const open = (projectId) => {
    const project = PROJECTS[projectId];
    if (!project) return;

    body.replaceChildren(...createProjectContent(project));
    body.scrollTop = 0;
    dialog.showModal();
  };

  document.querySelectorAll("[data-project]").forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger.dataset.project));
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
