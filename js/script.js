// Wedding date: 6 Sept 2026, 11:00 AM IST
const WEDDING_DATE = new Date('2026-09-06T11:00:00+05:30');

function updateCountdown(){
  const now = new Date();
  let diff = WEDDING_DATE - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };
  set('cd-days', days);
  set('cd-hours', hours);
  set('cd-mins', mins);
  set('cd-secs', secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Add to calendar (.ics download)
document.querySelectorAll('.add-calendar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Abindas & Arya Wedding//EN',
      'BEGIN:VEVENT',
      'UID:abindas-arya-wedding-2026@invite',
      'DTSTAMP:20260716T000000Z',
      'DTSTART:20260906T053000Z',
      'DTEND:20260906T060000Z',
      "SUMMARY:Abindas & Dr. Arya's Wedding",
      'DESCRIPTION:Wedding ceremony of Abindas & Dr. Arya.',
      'LOCATION:Prince Auditorium, Kakkodi',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abindas-Arya-Wedding.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});

// Reveal-on-scroll
const revealTargets = document.querySelectorAll('.section, .couple-card, .event-card, .editorial-panel, .moment-item');
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

// Background music toggle
const musicBtn = document.getElementById('music-toggle');
const musicEl = document.getElementById('bg-music');

musicBtn?.addEventListener('click', () => {
  if (musicEl.paused) {
    musicEl.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.setAttribute('aria-pressed', 'true');
      musicBtn.setAttribute('aria-label', 'Pause background music');
    }).catch((err) => {
      console.warn('Music playback failed:', err);
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-pressed', 'false');
    });
  } else {
    musicEl.pause();
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-pressed', 'false');
    musicBtn.setAttribute('aria-label', 'Play background music');
  }
});
