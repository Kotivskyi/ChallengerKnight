import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { useGetLeavePolicyUsersQuery } from '../../../../api/leave-api';
import { PolicyUser } from '@/domains/leave/types';
import { RemoveUserFromPolicy } from './remove-user-from-policy';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const UserList = ({ policyId }: { policyId: number }) => {
  const { data, isLoading, isError, error } = useGetLeavePolicyUsersQuery(policyId);
  const [userId, setUserId] = React.useState<number>(0);

  const columns: MRT_ColumnDef<PolicyUser>[] = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'role',
        header: 'Role'
      },
      {
        accessorKey: 'totalDaysUsed',
        header: 'Policy Used (Days)'
      }
    ],
    []
  );

  const handleRoleSwitch = (userId: number) => {
    setUserId(userId);
  };
  const closeModal = () => {
    setUserId(0);
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
        title='Remove User'
        color='error'
        onClick={() => handleRoleSwitch(row.original.id)}
      >
        <Delete />
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

      {Boolean(userId) && (
        <RemoveUserFromPolicy policyId={policyId} userId={userId} closeModal={closeModal} />
      )}
    </>
  );
};
