// Section header bar for Notion embeds: a title plus optional auto-updating info.
// Runs entirely in the viewer's browser: no network requests, no storage, no location.
import { weekRange } from '../week/week.js?v=6';

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const INFOS = ['month', 'date', 'week'];

export function labelInfo(date, info) {
  if (info === 'month') return MONTHS[date.getMonth()];
  if (info === 'date') return `${date.getMonth() + 1}/${date.getDate()}`;
  if (info === 'week') { const r = weekRange(date); return `${r.start} – ${r.end}`; }
  return '';
}

export function parseLabel(search) {
  const p = new URLSearchParams(search);
  return {
    title: (p.get('t') || '').slice(0, 40),
    info: INFOS.includes(p.get('info')) ? p.get('info') : '',
  };
}

export function mountLabel(root, { title, info }) {
  root.querySelector('.title').textContent = title;
  const render = () => { root.querySelector('.info').textContent = labelInfo(new Date(), info); };
  render();
  setInterval(render, 60000);
  document.addEventListener('visibilitychange', render);
}
