import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getFormattedDate, DATE_FORMAT, DATE_TIME_24_HR_FORMAT } from '@/utils/helpers/date';
import { MyLeaveRequestDetail } from '../types';
import { LeaveStatus } from './leave-status';
import { EditLeaveRequest } from '../pages/request/components/edit-leave-request';
import { DeleteLeaveRequest } from '../pages/request/components/delete-leave-request';

type RequestHistoryTableProps = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  requests: MyLeaveRequestDetail[];
};
type StateProps = {
  action: string;
  requestId: number;
};
const initialState = {
  action: '',
  requestId: 0
};

export const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({
  isLoading,
  isError,
  errorMessage,
  requests
}) => {
  const columns: MRT_ColumnDef<MyLeaveRequestDetail>[] = React.useMemo(
    () => [
      {
        accessorKey: 'user',
        header: 'User name',
        minWidth: 130
      },
      {
        accessorKey: 'policy',
        header: 'Policy',
        minWidth: 110
      },
      {
        accessorKey: 'status',
        header: 'Status',
        minWidth: 150,
        Cell: ({ row }) => {
          const {
            original: { statusId, status }
          } = row;
          return <LeaveStatus statusId={statusId} label={status} />;
        }
      },
      {
        accessorKey: 'request',
        header: 'Request',
        minWidth: 300,
        Cell: ({ row }) => {
          const {
            original: { from, to, days }
          } = row;
          return (
            <>
              {getFormattedDate(from, DATE_FORMAT)}
              {`—`}
              {getFormattedDate(to, DATE_FORMAT)} ({days} Days)
            </>
          );
        }
      },
      {
        accessorKey: 'note',
        header: 'Note',
        minWidth: 150
      },
      {
        accessorKey: 'submitted',
        header: 'Submitted Date',
        minWidth: 250,
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'updated',
        header: 'Updated Date',
        minWidth: 250,
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'approved',
        header: 'Approved Date',
        minWidth: 250,
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'approver',
        header: 'Approver'
      }
    ],
    []
  );
  const [state, setState] = React.useState<StateProps>(initialState);
  const userDetailRef = React.useRef<null | MyLeaveRequestDetail>(null);

  const onMenuItemClick = (action: string, row: MyLeaveRequestDetail) => {
    userDetailRef.current = row;
    setState({ action, requestId: row.id });
  };
  const closeModal = () => {
    userDetailRef.current = null;
    setState(initialState);
  };

  const table = useMaterialReactTable({
    data: requests,
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <>
        <IconButton
          title='Edit User'
          color='info'
          onClick={() => onMenuItemClick('edit', row.original)}
        >
          <Edit />
        </IconButton>
        <IconButton
          title='Remove User'
          color='error'
          onClick={() => onMenuItemClick('delete', row.original)}
        >
          <Delete />
        </IconButton>
      </>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? errorMessage : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const { action, requestId } = state;
  return (
    <>
      <MaterialReactTable table={table} />

      {action === 'edit' && (
        <EditLeaveRequest user={userDetailRef.current} closeModal={closeModal} />
      )}

      {action === 'delete' && <DeleteLeaveRequest id={requestId} closeModal={closeModal} />}
    </>
  );
};
