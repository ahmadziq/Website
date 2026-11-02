// Phone fullscreen + landscape helper.
(() => {
  const button = document.getElementById("landscape-button");
  if (!button) return;

  const updateLabel = () => {
    const active = !!document.fullscreenElement;
    button.textContent = active ? "⛶ Exit fullscreen" : "⛶ Landscape";
  };

  button.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        if (screen.orientation?.unlock) screen.orientation.unlock();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation?.lock) {
          try { await screen.orientation.lock("landscape"); } catch (_) {}
        }
      } else {
        alert("Fullscreen is not supported here. Please rotate your phone sideways.");
      }
    } catch (_) {
      alert("Fullscreen could not be enabled. Please rotate your phone sideways.");
    }
    updateLabel();
  });

  document.addEventListener("fullscreenchange", updateLabel);
})();
