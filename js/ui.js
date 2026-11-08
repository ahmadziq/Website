// ===========================
// Clock Display
// ===========================

function createClockDOM(config) {
  const clock = document.getElementById("clock");
  clock.textContent = "";
  return clock;
}

function timeElapse(birthDate, clock) {
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    );
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  clock.innerHTML = `
    <span class="unit"> Umur:  </span>
    <span class="digit">${years}</span>
    <span class="unit"> tahun </span>
    <span class="digit">${months}</span>
    <span class="unit"> bulan </span>
    <span class="digit">${days}</span>
    <span class="unit"> hari</span>
  `;
}

// ===========================
// Responsive Scaling
// ===========================

function scaleContent() {
  const viewport = document.getElementById("viewport");
  const main = document.getElementById("main");

  function resize() {
    const scale = Math.min(
      window.innerWidth / StageConfig.width,
      window.innerHeight / StageConfig.height,
      1
    );
    viewport.style.width = `${StageConfig.width * scale}px`;
    viewport.style.height = `${StageConfig.height * scale}px`;
    main.style.transform = `scale(${scale})`;
  }

  resize();
  window.addEventListener("resize", resize);
}

// ===========================
// Content Initialization
// ===========================

function initContent(config) {
  const letter = document.getElementById("letter");
  letter.textContent = "";

  function addParagraph(lines) {
    const p = document.createElement("p");
    p.textContent = lines.join("");
    letter.appendChild(p);
  }

  function createName(text) {
    const span = document.createElement("span");
    span.className = "name";
    span.textContent = text;
    return span;
  }

  const paragraphs = [
    config.letter.paragraph1,
    config.letter.paragraph2,
    config.letter.paragraph3
  ];
  paragraphs.forEach(lines => addParagraph(lines));

  const clockText = document.getElementById("clock-text");
  clockText.textContent = "";
  clockText.appendChild(createName(config.couple.name1));
  clockText.appendChild(document.createTextNode(` ${config.couple.connector} `));
  clockText.appendChild(createName(config.couple.name2));
  clockText.appendChild(document.createTextNode(` ${config.couple.together}`));
}

// ===========================
// Canvas Initialization
// ===========================

function initCanvas(id) {
  const canvas = document.getElementById(id);
  const { width: w, height: h } = StageConfig;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").scale(dpr, dpr);
  return canvas;
}
