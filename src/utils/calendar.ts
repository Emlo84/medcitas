interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  date: string;             // YYYY-MM-DD
  time: string;             // HH:MM 24h
  durationMinutes?: number;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toICSDate(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
}

function addMinutes(date: string, time: string, minutes: number): { date: string; time: string } {
  const [y, m, d] = date.split("-").map(Number);
  const [h, mn] = time.split(":").map(Number);
  const dt = new Date(y, m - 1, d, h, mn + minutes);
  return {
    date: `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`,
    time: `${pad(dt.getHours())}:${pad(dt.getMinutes())}`,
  };
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/**
 * Builds a `data:text/calendar` href that downloads as an .ics file when clicked.
 */
export function buildCalendarHref(event: CalendarEvent): string {
  if (!event.date || !event.time) {
    return "#";
  }

  const start = toICSDate(event.date, event.time);
  const end = (() => {
    const { date, time } = addMinutes(event.date, event.time, event.durationMinutes ?? 30);
    return toICSDate(date, time);
  })();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MedCitas//EN",
    "BEGIN:VEVENT",
    `UID:${start}-${Math.random().toString(36).slice(2)}@medcitas`,
    `DTSTAMP:${start}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(event.title)}`,
    event.description ? `DESCRIPTION:${escapeICS(event.description)}` : "",
    event.location ? `LOCATION:${escapeICS(event.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
