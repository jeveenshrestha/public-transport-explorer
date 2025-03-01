export const getTime = (
  startOfTheDayInSeconds: number,
  timeInSecond: number
) => {
  const time = startOfTheDayInSeconds + timeInSecond;
  const date = new Date(time * 1000);
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${hour}:${min}`;
};
