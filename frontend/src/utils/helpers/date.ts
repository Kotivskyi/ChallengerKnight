import { format } from 'date-fns';

export const DATE_FORMAT = 'MMMM d, yyyy';
export const DATE_TIME_FORMAT = "MMMM d, yyyy 'at' hh:mm:ss a";
export const DATE_TIME_24_HR_FORMAT = "MMMM d, yyyy 'at' HH:mm:ss.SSS";
export const API_DATE_FORMAT = 'yyyy-MM-dd';
export const MONTH_DAY_FORMAT = 'MMMM d';

export const getFormattedDate = (dt: Date | null | string, dtFormat: string): string => {
  if (!dt) return '';

  const formattedDt = format(dt, dtFormat);
  return formattedDt;
};
