export function convertTimeToMinutes(
  time: string
) {
  const value = parseInt(time);

  if (time.toLowerCase().includes("hour")) {
    return value * 60;
  }

  if (time.toLowerCase().includes("min")) {
    return value;
  }

  return 60;
}