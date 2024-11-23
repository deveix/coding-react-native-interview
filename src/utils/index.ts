import {DateTime} from 'luxon';

export const formatDate = (date: string) => {
  return DateTime.fromISO(date).toLocaleString({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
