/* ==========================================================================
   Arangkada Philippines — 3D pointer-tilt for cards
   Delegated listeners (bound once) so it keeps working across SPA re-renders.
   Only active for precise pointers that support hover; respects reduced motion.
   ========================================================================== */

(function () {
  "use strict";

  const SELECTOR = ".pub-card, .program-card, .member-card, .team-card, .card-panel";
  const MAX_DEG = 7;

  const canTilt = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function apply(el, evt) {
    const rect = el.getBoundingClientRect();
    const px = (evt.clientX - rect.left) / rect.width;
    const py = (evt.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * MAX_DEG * 2;
    const rotX = (0.5 - py) * MAX_DEG * 2;
    el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`;
    el.style.setProperty("--sheen-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--sheen-y", `${(py * 100).toFixed(1)}%`);
  }

  function reset(el) {
    el.style.transform = "";
  }

  document.addEventListener("pointermove", (evt) => {
    if (evt.pointerType && evt.pointerType !== "mouse") return;
    if (!canTilt()) return;
    const el = evt.target.closest(SELECTOR);
    if (el) {
      el.classList.add("is-tilting");
      apply(el, evt);
    }
    document.querySelectorAll(SELECTOR + ".is-tilting").forEach((other) => {
      if (other !== el) {
        other.classList.remove("is-tilting");
        reset(other);
      }
    });
  });

  document.addEventListener("pointerleave", (evt) => {
    const el = evt.target.closest && evt.target.closest(SELECTOR);
    if (el) {
      el.classList.remove("is-tilting");
      reset(el);
    }
  }, true);
})();
