(() => {
  "use strict";

  const BUY_URL = "";
  const buyButton = document.querySelector("#buy-button");
  const dialog = document.querySelector("#checkout-pending");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  buyButton.addEventListener("click", () => {
    if (BUY_URL) {
      window.location.href = BUY_URL;
      return;
    }
    dialog.showModal();
  });

  document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
