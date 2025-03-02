export const getTime = (
  startOfTheDayInSeconds: number,
  timeInSecond: number
): string => {
  const totalSeconds = startOfTheDayInSeconds + timeInSecond;
  const date = new Date(totalSeconds * 1000);

  const hour = date.getHours().toString().padStart(2, '0'); // Ensures two digits (e.g., "09")
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${min}`;
};
