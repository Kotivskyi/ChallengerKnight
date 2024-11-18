import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetDepartmentsQuery } from '../../api';
import { DepartmentFormWithId } from '../../types';
import { DeleteDepartment } from './delete-department';

export const DepartmentData = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [departmentId, setDepartmentId] = React.useState<number>(0);
  const { data, isLoading, isError, error } = useGetDepartmentsQuery();

  const columns: MRT_ColumnDef<DepartmentFormWithId>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
    }
  ];

  const onBtnClick = (id: number) => {
    setDepartmentId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.departments || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id }
      } = row;
      return (
        <>
          <IconButton
            title='Edit class'
            color='info'
            component={Link}
            to={`/app/departments/edit/${id}`}
          >
            <Edit />
          </IconButton>
          <IconButton title='Delete class' color='error' onClick={() => onBtnClick(id)}>
            <Delete />
          </IconButton>
        </>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>

      {isModalOpen && <DeleteDepartment departmentId={departmentId} closeModal={closeModal} />}
    </>
  );
};
