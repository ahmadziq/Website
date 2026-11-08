// ===========================
// Show Letter & Start Clock
// ===========================

function showLoveLetter() {
  const letter = document.getElementById("letter");
  const clockBox = document.getElementById("clock-box");
  typewriter(letter).then(() => {
    document.getElementById("memories-open").classList.add("is-visible");
  });
  clockBox.classList.add("clock-box--visible");
}

function startClock(config) {
  const [year, month, day] = config.memorialDate.split("-").map(Number);

  const birthDate = new Date(year, month - 1, day);
  const clock = createClockDOM(config);

  timeElapse(birthDate, clock);

  setInterval(() => {
    timeElapse(birthDate, clock);
  }, 60000);
}

// ===========================
// Main Initialization
// ===========================

async function startApp() {
  initContent(CONFIG);

  const staticCanvas = initCanvas("static-canvas");
  const groundCanvas = initCanvas("ground-canvas");
  const dynamicCanvas = initCanvas("canvas");

  const tree = new Tree(
    staticCanvas,
    dynamicCanvas,
    groundCanvas,
    StageConfig.width,
    StageConfig.height,
    TreeShape,
    CONFIG
  );
  const { seed, footer } = tree;

  scaleContent();

  seed.draw();

  await waitForUserClick(seed, dynamicCanvas);
  await animateSeedShrink(seed);
  await animateSeedMove(seed, footer);
  await animateTreeGrow(tree);
  await animateFlowerBloom(tree);
  tree.resetFallingBlooms();

  footer.draw();
  await animateTreeMove(staticCanvas);

  showLoveLetter();
  startHeartJumpAnimation(tree);
  startClock(CONFIG);
}

document.addEventListener("DOMContentLoaded", startApp);
