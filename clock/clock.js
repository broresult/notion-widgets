// Flip clock widget for Notion embeds.
// Runs entirely in the viewer's browser: no network requests, no storage, no location.

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const pad = (n) => String(n).padStart(2, '0');

export function clockParts(date, { hour12 }) {
  const h = date.getHours();
  return {
    hh: pad(hour12 ? (h % 12 || 12) : h),
    mm: pad(date.getMinutes()),
    ampm: hour12 ? (h < 12 ? 'AM' : 'PM') : '',
    weekday: WEEKDAYS[date.getDay()],
  };
}

export function parseOptions(search) {
  const p = new URLSearchParams(search);
  return {
    hour12: p.get('h') !== '24',
    theme: ['light', 'dark'].includes(p.get('theme')) ? p.get('theme') : 'auto',
  };
}

export function mount(root, opts) {
  document.documentElement.dataset.theme = opts.theme;
  const el = (cls) => root.querySelector(cls);
  const set = (cls, value, flip) => {
    const node = el(cls);
    if (node.textContent === value) return;
    const changed = node.textContent !== '--' && node.textContent !== '';
    node.textContent = value;
    if (flip && changed) {
      const tile = node.parentElement;
      tile.classList.remove('flip');
      void tile.offsetWidth; // restart the animation
      tile.classList.add('flip');
    }
  };
  const render = () => {
    const t = clockParts(new Date(), opts);
    set('.hh', t.hh, true);
    set('.mm', t.mm, true);
    set('.ampm', t.ampm);
    set('.weekday', t.weekday);
  };
  render();
  setInterval(render, 1000);
}
