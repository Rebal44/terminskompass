(() => {
  "use strict";

  const tasks = [
    ["Lämna in tes och frågeställning", "Svenska 3 · 15 MIN · HÖG PRIORITET", "1 D SEN", true],
    ["Skriv första utkastet till PM", "Svenska 3 · 90 MIN · HÖG PRIORITET", "OM 2 D", false],
    ["Räkna uppgifter 1201–1228", "Matematik 2c · 60 MIN", "OM 4 D", false],
    ["Repetera derivatans regler", "Matematik 2c · 25 MIN", "IMORGON", false],
    ["Läs källorna om industrialiseringen", "Historia 1b · 45 MIN", "OM 5 D", false]
  ];

  const sessions = [
    ["Deriveringsregler", "8 jun"],
    ["Extrempunkter", "10 jun"],
    ["Integraler", "13 jun"],
    ["Tillämpningar", "16 jun"],
    ["Blandade uppgifter", "18 jun"],
    ["Blandad repetition", "22 jun"],
    ["Sista genomgången", "24 jun"]
  ];

  const taskContainer = document.querySelector("#demo-tasks");
  const sessionContainer = document.querySelector("#sessions");
  let timerMinutes = 25;
  let seconds = timerMinutes * 60;
  let interval = null;

  taskContainer.innerHTML = tasks.map((task, index) => `
    <div class="task ${task[3] ? "overdue" : ""}" data-task="${index}">
      <span class="check"></span>
      <div><h4>${task[0]}</h4><p>${task[1]}</p></div>
      <time>${task[2]}</time>
    </div>
  `).join("");

  sessionContainer.innerHTML = sessions.map((session, index) => `
    <div class="session" data-session="${index}">
      <span class="check"></span>
      <span>${session[0]}</span>
      <time>${session[1]}</time>
    </div>
  `).join("");

  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      switchView(viewButton.dataset.view);
      return;
    }
    const task = event.target.closest("[data-task]");
    if (task) task.classList.toggle("done");
    const session = event.target.closest("[data-session]");
    if (session) {
      session.classList.toggle("done");
      updatePlanProgress();
    }
    const duration = event.target.closest("[data-minutes]");
    if (duration) {
      if (interval) return;
      timerMinutes = Number(duration.dataset.minutes);
      seconds = timerMinutes * 60;
      document.querySelectorAll("[data-minutes]").forEach((button) => button.classList.toggle("active", button === duration));
      updateTimer();
    }
  });

  document.querySelector("#menu-button").addEventListener("click", () => document.querySelector("aside").classList.toggle("open"));
  document.querySelector("#timer-toggle").addEventListener("click", toggleTimer);
  document.querySelector("#timer-reset").addEventListener("click", resetTimer);

  function switchView(view) {
    document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === view));
    document.querySelectorAll("nav [data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    const titles = { overview: "Översikt", plan: "Provplan", focus: "Fokuspass" };
    document.querySelector("#view-title").textContent = titles[view];
    document.querySelector("aside").classList.remove("open");
  }

  function updatePlanProgress() {
    const complete = document.querySelectorAll(".session.done").length;
    const percent = Math.round(complete / sessions.length * 100);
    document.querySelector("#plan-progress").textContent = `${complete} av ${sessions.length} pass klara`;
    document.querySelector("#plan-percent").textContent = `${percent}%`;
    document.querySelector("#plan-bar").style.width = `${percent}%`;
  }

  function toggleTimer() {
    const button = document.querySelector("#timer-toggle");
    if (interval) {
      clearInterval(interval);
      interval = null;
      button.textContent = "Fortsätt";
      return;
    }
    button.textContent = "Pausa";
    interval = setInterval(() => {
      seconds -= 1;
      updateTimer();
      if (seconds <= 0) {
        clearInterval(interval);
        interval = null;
        button.textContent = "Klart";
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(interval);
    interval = null;
    seconds = timerMinutes * 60;
    document.querySelector("#timer-toggle").textContent = "Starta";
    updateTimer();
  }

  function updateTimer() {
    document.querySelector("#timer").textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }
})();
