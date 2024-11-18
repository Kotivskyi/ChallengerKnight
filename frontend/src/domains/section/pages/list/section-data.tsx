import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetSectionsQuery } from '../../api';
import { SectionFormWithId } from '../../types';
import { DeleteSection } from './delete-section';

export const SectionData = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sectionId, setSectionId] = React.useState<number>(0);
  const { data, isLoading, isError, error } = useGetSectionsQuery();

  const columns: MRT_ColumnDef<SectionFormWithId>[] = [
    {
      accessorKey: 'name',
      header: 'NAME'
    }
  ];

  const openModal = (sectionId: number) => {
    setSectionId(sectionId);
    setIsOpen((isOpen) => !isOpen);
  };
  const closeModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.sections || [],
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
            to={`/app/sections/edit/${id}`}
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

      {isOpen && <DeleteSection sectionId={sectionId} closeModal={closeModal} />}
    </>
  );
};
