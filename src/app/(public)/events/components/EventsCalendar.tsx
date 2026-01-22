export default function EventsCalendar() {
  return (
    <div className="w-full overflow-hidden rounded-lg aspect-[16/9]">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=cfded6dda19dfd3d689afd5790274ba9d55ac426e796e0d86b13e2c587cc321f%40group.calendar.google.com&ctz=America%2FLos_Angeles"
        title="Styled Calendar"
        className="w-full h-full border-none"
        data-cy="calendar-embed-iframe"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}
