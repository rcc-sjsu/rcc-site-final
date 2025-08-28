export default function EventsCalendar() {
  return (
    <div className="w-full overflow-hidden rounded-lg aspect-[16/9]">
      <iframe
        src="https://embed.styledcalendar.com/#DBbT3ywMoEOIzrCaOy4E"
        title="Styled Calendar"
        className="w-full h-full border-none"
        data-cy="calendar-embed-iframe"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}
