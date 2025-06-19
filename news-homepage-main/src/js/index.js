(function App() {
  const openBtn = document.querySelector(".nav-btn-open");
  const closeBtn = document.querySelector(".nav-btn-close");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  function toggleNav(e) {
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    if (!isExpanded) {
      document.body.insertAdjacentElement("beforeend", overlay);
    } else {
      overlay.remove();
    }

    this.ariaExpanded = !isExpanded;
  }

  openBtn.addEventListener("click", toggleNav);
  closeBtn.addEventListener("click", toggleNav.bind(openBtn));
})();
