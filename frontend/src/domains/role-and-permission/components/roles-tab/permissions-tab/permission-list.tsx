import * as React from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable
} from 'material-react-table';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Box, Button, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DeletePermission } from './delete-permission';
import { AddEditPermission } from './add-edit-permission';
import { useRolePermission } from '@/domains/role-and-permission/context/role-permission-provider';
import { Permission } from '@/utils/type/misc';
import {
  useGetRolePermissionsQuery,
  useUpdateRolePermissionMutation
} from '@/domains/role-and-permission/api';
import { ExtendedPermission } from '@/domains/role-and-permission/types';

type PermissionListProps = {
  roleId: number;
};
export type FormInitialState = {
  action: string;
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
};
const formInitialState = {
  action: '',
  id: 0,
  name: '',
  path: '',
  type: '',
  method: ''
};

const updatePermissionsAvailability = (
  permissions: ExtendedPermission[],
  currentRolePermissions: Permission[]
): ExtendedPermission[] => {
  return permissions.map((permission) => {
    const rolePermission = currentRolePermissions.find((p) => p.id === permission.id);
    const updatedSubPermissions =
      permission?.subMenus && permission.subMenus.length > 0
        ? updatePermissionsAvailability(
            permission.subMenus as ExtendedPermission[],
            currentRolePermissions
          )
        : [];

    return {
      ...permission,
      isPermissionAvailable: rolePermission ? true : false,
      subMenus: updatedSubPermissions
    };
  });
};

export const PermissionList: React.FC<PermissionListProps> = ({ roleId }) => {
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  const { data, isLoading: isFetchingCurrentRolePermission } = useGetRolePermissionsQuery(roleId);
  const [currentRolePermissions, setCurrentRolePermissions] = React.useState<ExtendedPermission[]>(
    []
  );
  const [formState, setFormState] = React.useState<FormInitialState>(formInitialState);
  const {
    state: { permissions }
  } = useRolePermission();
  const [updatePermissions, { isLoading: isUpdatingPermissions }] =
    useUpdateRolePermissionMutation();

  React.useEffect(() => {
    if (permissions) {
      const updatedPermissions = updatePermissionsAvailability(
        permissions,
        data?.permissions ?? []
      );
      setCurrentRolePermissions(updatedPermissions);
    }
  }, [roleId, permissions, data]);

  React.useEffect(() => {
    if (currentRolePermissions && currentRolePermissions.length > 0) {
      const initialSelected = currentRolePermissions.reduce((acc, menu) => {
        if (menu.isPermissionAvailable) {
          acc[menu.id.toString()] = true;
        }
        menu.subMenus?.forEach((subMenu) => {
          if (subMenu.isPermissionAvailable) {
            acc[subMenu.id.toString()] = true;
          }
        });
        return acc;
      }, {} as MRT_RowSelectionState);

      setRowSelection(initialSelected);
    }
  }, [currentRolePermissions]);

  const columns: MRT_ColumnDef<ExtendedPermission>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'type',
      header: 'Type'
    },
    {
      accessorKey: 'method',
      header: 'Method'
    }
  ];
  const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const ids = Object.keys(rowSelection);
      const result = await updatePermissions({
        id: roleId!,
        permissions: ids.length > 0 ? ids.join(',') : ''
      }).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const handleAction = (rowData: FormInitialState) => {
    setFormState(rowData);
  };
  const closeModal = () => {
    setFormState(formInitialState);
  };

  const table = useMaterialReactTable({
    columns,
    data: currentRolePermissions,
    enableExpanding: true,
    getRowId: (row) => row?.id?.toString(),
    getSubRows: (row) => row.subMenus,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      density: 'compact',
      rowSelection,
      isLoading: isFetchingCurrentRolePermission
    },
    enablePagination: false,
    enableDensityToggle: false,
    enableColumnFilters: true,
    filterFromLeafRows: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id, name, type, method, path },
        parentId
      } = row;
      const rowData = { id, name, type, method, path };

      return (
        <Box>
          <IconButton
            disabled={Boolean(parentId)}
            color='primary'
            onClick={() => handleAction({ ...formInitialState, id: rowData.id, action: 'add' })}
          >
            <Add />
          </IconButton>
          <IconButton color='primary' onClick={() => handleAction({ ...rowData, action: 'edit' })}>
            <Edit />
          </IconButton>
          <IconButton color='error' onClick={() => handleAction({ ...rowData, action: 'delete' })}>
            <Delete />
          </IconButton>
        </Box>
      );
    },
    renderTopToolbarCustomActions: () => (
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => handleAction({ ...formInitialState, action: 'add' })}
      >
        Add Root Permission
      </Button>
    )
  });

  const { action, id } = formState;
  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
        <LoadingButton
          loading={isUpdatingPermissions}
          sx={{ marginTop: '20px' }}
          size='medium'
          variant='contained'
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </Box>

      {action === 'delete' && <DeletePermission permissionId={id} closeModal={closeModal} />}
      {(action === 'add' || action === 'edit') && (
        <AddEditPermission closeModal={closeModal} formData={formState} />
      )}
    </>
  );
};
