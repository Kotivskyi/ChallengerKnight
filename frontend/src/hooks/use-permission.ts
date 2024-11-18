import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserScreens, setUserPermissions } from '@/domains/auth/slice';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetMyPermissionsQuery } from '@/domains/role-and-permission/api';

export const usePermission = () => {
  const dispatch = useDispatch();
  const routes = useSelector(getUserScreens);
  const { data, isLoading, isError, error } = useGetMyPermissionsQuery();

  React.useEffect(() => {
    if (data?.permissions) {
      const { menus, apis, uis } = data.permissions;
      dispatch(
        setUserPermissions({
          menus,
          apis,
          uis
        })
      );
    }
  }, [dispatch, data?.permissions]);

  const doesRouteExist = React.useCallback(
    (route: string) => {
      return routes?.some((r) => r.path === route);
    },
    [routes]
  );

  const permissionState = React.useMemo(() => {
    return {
      isLoading,
      isError,
      errorMessage: isError ? getErrorMsg(error).message : '',
      hasData: Boolean(data),
      doesRouteExist
    };
  }, [isLoading, isError, error, data, doesRouteExist]);

  return permissionState;
};
