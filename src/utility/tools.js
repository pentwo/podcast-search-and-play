export const secondsToMinutes = (seconds) => {
  return `${Math.floor(seconds / 60)
    .toString(10)
    .padStart(2, '0')}:${Math.floor(seconds % 60)
    .toString(10)
    .padStart(2, '0')}`;
};
