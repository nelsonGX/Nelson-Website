export function formatTimeIphone(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatTimeIpad(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatDateIpad(date: Date) {
  return date.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' });
}
