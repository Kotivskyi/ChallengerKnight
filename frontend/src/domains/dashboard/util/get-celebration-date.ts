import { getFormattedDate, MONTH_DAY_FORMAT } from '@/utils/helpers/date';
import { isToday, isTomorrow, isYesterday } from 'date-fns';

export const getFormattedCelebrationDate = (dt: null | string): string => {
  if (!dt) return '';

  if (isYesterday(dt)) {
    return 'Yesterday';
  } else if (isToday(dt)) {
    return 'Today';
  } else if (isTomorrow(dt)) {
    return 'Tomorrow';
  }
  return getFormattedDate(dt, MONTH_DAY_FORMAT);
};
