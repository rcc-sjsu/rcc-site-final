import events from '../data/Events';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const leadingDays = 4;
const daysInOctober = 31;
const calendarCells = Array.from({ length: leadingDays + daysInOctober }, (_, index) =>
  index < leadingDays ? null : index - leadingDays + 1
);

export default function EventsCalendar() {
  return (
    <section className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--color-brand-lavender)] bg-white shadow-sm">
      <div className="bg-[var(--color-brand-indigo)] px-5 py-4 text-center text-white">
        <h3 className="text-2xl font-bold">October 2026</h3>
      </div>

      <div className="grid grid-cols-7 border-b border-[var(--color-brand-lavender)] bg-[var(--color-brand-pale-blue)]">
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="px-1 py-3 text-center text-xs font-bold text-[var(--color-brand-indigo)] sm:text-sm"
          >
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarCells.map((day, index) => {
          const dayEvents = day === null ? [] : events.filter((event) => event.days.includes(day));

          return (
            <div
              key={day ?? `empty-${index}`}
              className="min-h-24 border-b border-r border-[var(--color-brand-lavender)] p-1.5 sm:min-h-36 sm:p-2"
            >
              {day !== null && (
                <>
                  <span className="text-xs font-semibold text-gray-600 sm:text-sm">{day}</span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event) => (
                      <article
                        key={event.id}
                        className="rounded-md bg-[var(--color-brand-indigo)] px-1.5 py-1 text-[0.6rem] font-semibold leading-tight text-white sm:px-2 sm:text-xs"
                        title={`${event.title} — ${event.time} — ${event.location}`}
                      >
                        <p className="line-clamp-3">{event.title}</p>
                        <p className="mt-1 hidden font-normal text-white/85 sm:block">{event.time}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
