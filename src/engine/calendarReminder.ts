// Generates a downloadable .ics file for a daily recurring reminder, so the
// device's own calendar/reminders app fires a real OS-level notification —
// even with the browser fully closed or the phone locked. This needs no
// backend, no service worker, and no push subscription, at the cost of the
// user having to tap "Add to Calendar" once per reminder and re-add it if
// they ever change the time (there's no live link back into this app's
// Settings). See CLAUDE.md's Notifications section for why this replaced
// the old in-app browser-Notification approach.

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

/** Floating local time (no trailing Z, no TZID) — calendar apps interpret this in whichever timezone the device is currently set to, which is what "8am, wherever I am" should mean. */
function formatFloatingLocal(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

function formatUtcStamp(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

// Escapes characters ICS treats as syntax (RFC 5545 §3.3.11).
function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export interface ReminderIcsOptions {
  uid: string;
  summary: string;
  description: string;
  /** "HH:MM", 24-hour, local time. */
  time: string;
  durationMinutes?: number;
}

export function buildReminderIcs({ uid, summary, description, time, durationMinutes = 15 }: ReminderIcsOptions): string {
  const [hours, minutes] = time.split(':').map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const now = new Date();

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Journey to Great Harmony//Reminder//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatUtcStamp(now)}`,
    `DTSTART:${formatFloatingLocal(start)}`,
    `DTEND:${formatFloatingLocal(end)}`,
    'RRULE:FREQ=DAILY',
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsText(summary)}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // ICS requires CRLF line endings.
  return lines.join('\r\n');
}

export function downloadIcs(filename: string, icsContent: string): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
