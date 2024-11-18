import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetClassTeachersQuery } from '../../api/class-teacher-api';
import { ClassTeacherDetail } from '@/domains/class/types';

export const ClassTeacherData = () => {
  const { data, isLoading, isError, error } = useGetClassTeachersQuery();

  const columns: MRT_ColumnDef<ClassTeacherDetail>[] = React.useMemo(
    () => [
      {
        accessorKey: 'class',
        header: 'CLASS'
      },
      {
        accessorKey: 'sections',
        header: 'SECTIONS'
      },
      {
        accessorKey: 'teacher',
        header: 'CLASS TEACHER'
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    data: isError ? [] : data?.classTeachers || [],
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
        title='Edit class'
        color='info'
        component={Link}
        to={`/app/class-teachers/edit/${row.original.id}`}
      >
        <Edit />
      </IconButton>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box component={Paper}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};
