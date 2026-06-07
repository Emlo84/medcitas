import { buildCalendarHref } from "@/utils/calendar";

describe("buildCalendarHref", () => {
  it("returns a fallback anchor when date or time is missing", () => {
    expect(buildCalendarHref({ title: "Evento", date: "", time: "" })).toBe("#");
  });

  it("builds a valid calendar URI for a standard event", () => {
    const href = buildCalendarHref({
      title: "Consulta médica",
      date: "2026-12-10",
      time: "14:30",
      durationMinutes: 45,
      description: "Revisión general",
      location: "Clínica Central",
    });

    expect(href).toMatch(/^data:text\/calendar;charset=utf-8,/);
    const decoded = decodeURIComponent(href.replace(/^data:text\/calendar;charset=utf-8,/, ""));
    expect(decoded).toContain("SUMMARY:Consulta médica");
    expect(decoded).toContain("LOCATION:Clínica Central");
    expect(decoded).toContain("DESCRIPTION:Revisión general");
    expect(decoded).toContain("DTSTART:20261210T143000");
    expect(decoded).toContain("DTEND:20261210T151500");
  });
});
