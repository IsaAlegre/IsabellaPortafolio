const STAGGER_SELECTOR = [
  ".skill-group",
  ".project-card",
  ".project-card .tag",
  ".timeline-item",
  ".timeline-item__card li",
  ".contact__detail",
  ".field",
].join(", ");
const MAX_STAGGER_STEPS = 12;

function prepareStagger(section) {
  section.querySelectorAll(STAGGER_SELECTOR).forEach((element, index) => {
    element.classList.add("stagger-item");
    element.style.setProperty("--step", Math.min(index, MAX_STAGGER_STEPS));
  });
}

export function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((section) => {
    prepareStagger(section);
    observer.observe(section);
  });
}
