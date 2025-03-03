export const getTime = (
  startOfTheDayInSeconds: number,
  timeInSecond: number
): string => {
  const totalSeconds = startOfTheDayInSeconds + timeInSecond;
  const date = new Date(totalSeconds * 1000);
  const now = new Date();

  const hour = date.getHours().toString().padStart(2, '0'); // Ensures two digits (e.g., "09")
  const min = date.getMinutes().toString().padStart(2, '0');

  const diffInSeconds = totalSeconds - Math.floor(now.getTime() / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes <= 0) {
    return 'Now';
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }
  return `${hour}:${min}`;
};

export const getExactTime = (
  startOfTheDayInSeconds: number,
  timeInSecond: number
): string => {
  const totalSeconds = startOfTheDayInSeconds + timeInSecond;
  const date = new Date(totalSeconds * 1000);

  const hour = date.getHours().toString().padStart(2, '0'); // Ensures two digits (e.g., "09")
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${min}`;
};
