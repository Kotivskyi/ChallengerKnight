import * as React from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';

import { useGetRoleUsersQuery } from '@/domains/role-and-permission/api';
import { User } from '@/domains/role-and-permission/types';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { SwitchUserRole } from './switch-user-role';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type UserListProps = {
  roleId: number;
};

export const UserList: React.FC<UserListProps> = ({ roleId }) => {
  const { data, isLoading, isError, error } = useGetRoleUsersQuery(roleId);
  const [userId, setUserId] = React.useState<number>(0);

  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
    }
  ];
  const handleRoleSwitch = (userId: number) => {
    setUserId(userId);
  };

  const users = isError ? [] : data?.users || [];
  const table = useMaterialReactTable({
    data: users,
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <IconButton
        title='Switch Role'
        color='primary'
        onClick={() => handleRoleSwitch(row.original.id)}
      >
        <SwapHoriz />
      </IconButton>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>

      {Boolean(userId) && <SwitchUserRole userId={userId} handleRoleSwitch={handleRoleSwitch} />}
    </>
  );
};
