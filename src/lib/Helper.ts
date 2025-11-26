export function formatTime(dateStr: Date) {
  const d = new Date(dateStr);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12 for 12-hour format
  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
}