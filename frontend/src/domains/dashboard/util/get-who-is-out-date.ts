import { format, isSameMonth, isToday, isTomorrow, isYesterday } from 'date-fns';

export const getFormattedLeaveDate = (fromDate: string, toDate: string): string => {
  if (!fromDate || !toDate) return '';

  if (isYesterday(fromDate) && isYesterday(toDate)) {
    return 'Yesterday';
  } else if (isToday(fromDate) && isToday(toDate)) {
    return 'Today';
  } else if (isTomorrow(fromDate) && isTomorrow(toDate)) {
    return 'Tomorrow';
  } else if (isSameMonth(fromDate, toDate)) {
    return `${format(fromDate, 'MMMM d')} - ${format(toDate, 'd')}`;
  } else {
    return `${format(fromDate, 'MMMM d')} - ${format(toDate, 'MMMM d')}`;
  }
};
