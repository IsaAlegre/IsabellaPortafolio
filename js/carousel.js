const SCROLL_AMOUNT = 300;

export function initCarousel(track, previousButton, nextButton) {
  const scroll = (direction) =>
    track.scrollBy({ left: direction * SCROLL_AMOUNT, behavior: "smooth" });

  previousButton.addEventListener("click", () => scroll(-1));
  nextButton.addEventListener("click", () => scroll(1));
}
