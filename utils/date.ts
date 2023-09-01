export function getHumanReadableDate(date: any) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };

  return date.toLocaleDateString("en-US", options);
}
