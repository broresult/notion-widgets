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

const NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// d: 1 = Monday … 7 = Sunday of the week containing `date`.
export function dayLabel(date, d) {
  const offset = d - 1 - (date.getDay() + 6) % 7;
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
  return { name: NAMES[d - 1], md: md(day), today: offset === 0 };
}

export function parseDay(search) {
  const d = Number(new URLSearchParams(search).get('d'));
  return Number.isInteger(d) && d >= 1 && d <= 7 ? d : 1;
}

export function mountDay(root, d, theme) {
  if (theme !== 'auto') document.documentElement.dataset.theme = theme;
  root.dataset.d = String(d);
  const render = () => {
    const l = dayLabel(new Date(), d);
    root.querySelector('.name').textContent = l.name;
    root.querySelector('.date').textContent = l.md;
    root.classList.toggle('today', l.today);
  };
  render();
  setInterval(render, 60000);
  document.addEventListener('visibilitychange', render);
}
