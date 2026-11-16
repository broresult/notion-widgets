// "This week" range widget for Notion embeds (Monday–Sunday, ISO week number).
// Runs entirely in the viewer's browser: no network requests, no storage, no location.

const md = (d) => `${d.getMonth() + 1}/${d.getDate()}`;

export function weekRange(date) {
  const day = (date.getDay() + 6) % 7; // Monday = 0
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  // ISO week: the week that contains this week's Thursday
  const thursday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3);
  const jan1 = new Date(thursday.getFullYear(), 0, 1);
  const week = Math.floor((thursday - jan1) / 86400000 / 7) + 1;
  return { start: md(monday), end: md(sunday), week };
}

export function mount(root, theme) {
  if (theme !== 'auto') document.documentElement.dataset.theme = theme;
  const render = () => {
    const r = weekRange(new Date());
    root.querySelector('.range').textContent = `${r.start} – ${r.end}`;
    root.querySelector('.num').textContent = `WEEK ${r.week}`;
  };
  render();
  setInterval(render, 60000);
  document.addEventListener('visibilitychange', render);
}
