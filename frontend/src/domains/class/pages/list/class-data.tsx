import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetClassesQuery } from '../../api/class-api';
import { ClassDataPropsWithId } from '../../types';
import { DeleteClass } from './delete-class';

export const ClassData = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [classId, setClassId] = React.useState<number>(0);
  const { data, isLoading, isError, error } = useGetClassesQuery();

  const columns: MRT_ColumnDef<ClassDataPropsWithId>[] = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'sections',
        header: 'Section'
      }
    ],
    []
  );

  const openModal = (leaveId: number) => {
    setClassId(leaveId);
    setIsOpen((isOpen) => !isOpen);
  };

  const closeModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.classes || [],
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
            to={`/app/classes/edit/${id}`}
          >
            <Edit />
          </IconButton>
          <IconButton title='Delete class' color='error' onClick={() => openModal(id)}>
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

      {isOpen && <DeleteClass classId={classId} closeModal={closeModal} />}
    </>
  );
};
