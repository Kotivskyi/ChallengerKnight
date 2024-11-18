import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getErrorMsg } from './get-error-message';

export const formatApiError = (error: FetchBaseQueryError | SerializedError) => {
  const { message, detail } = getErrorMsg(error);

  if (Array.isArray(detail) && detail.length > 0) {
    return detail.map(({ message }) => message);
  }

  return [message];
};
