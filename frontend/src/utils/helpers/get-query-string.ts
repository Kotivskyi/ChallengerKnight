export const getQueryString = (queryParamsObj: object | null) => {
  if (!queryParamsObj) return '';

  const queryParams: string[] = [];
  for (const [key, value] of Object.entries(queryParamsObj)) {
    if (value) {
      queryParams.push(`${key}=${value}`);
    }
  }
  return queryParams.length > 0 ? `?${queryParams.join(',')}` : '';
};
