import * as React from 'react';
import { Box, MenuItem, Paper, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { Notice } from '../types';
import { NoticeStatus } from './notice-status';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import {
  isApprovePermissionAvailable,
  isDeletePermissionAvailable,
  isEditPermissionAvailable,
  isRejectPermissionAvailable
} from '@/utils/helpers/get-notice-permission';
import { Link } from 'react-router-dom';
import { menuItemTexts } from '@/constants';
import { useSelector } from 'react-redux';
import { getUserId } from '@/domains/auth/slice';
import { DialogModal } from '@/components/dialog-modal';
import { toast } from 'react-toastify';
import { useHandleMenuAction } from '@/hooks';

type NoticeDataProps = {
  notices: Notice[];
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  actionCellType: ActionCellType;
};

type ActionCellType = 'reviewer' | 'user';
type State = {
  noticeId: number;
  menuAction: string;
  modalTitle: string;
  modalBodyText: string;
  isSaving: boolean;
  isModalOpen: boolean;
};
const initialState = {
  noticeId: 0,
  menuAction: '',
  modalTitle: '',
  modalBodyText: '',
  isSaving: false,
  isModalOpen: false
};
export const NoticeData: React.FC<NoticeDataProps> = ({
  notices,
  isLoading,
  isError,
  error,
  actionCellType
}) => {
  const [state, setState] = React.useState<State>(initialState);
  const currentUserId = useSelector(getUserId);
  const { handleAction } = useHandleMenuAction();

  const columns: MRT_ColumnDef<Notice>[] = React.useMemo(
    () => [
      { accessorKey: 'title', header: 'Title', minWidth: 120 },
      { accessorKey: 'author', header: 'Author', minWidth: 110 },
      {
        accessorKey: 'status',
        header: 'Status',
        minWidth: 150,
        Cell: ({ row }) => (
          <NoticeStatus statusId={row.original.statusId} label={row.original.status} />
        )
      },
      {
        accessorKey: 'createdDate',
        header: 'Created Date',
        minWidth: 220,
        Cell: ({ row }) => <>{getFormattedDate(row.original.createdDate, DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'updatedDate',
        header: 'Updated Date',
        minWidth: 220,
        Cell: ({ row }) => <>{getFormattedDate(row.original.updatedDate, DATE_TIME_24_HR_FORMAT)}</>
      },
      { accessorKey: 'reviewerName', header: 'Reviewer Name', minWidth: 120 },
      {
        accessorKey: 'reviewedDate',
        header: 'Reviewed Date',
        minWidth: 220,
        Cell: ({ row }) => (
          <>{getFormattedDate(row.original.reviewedDate, DATE_TIME_24_HR_FORMAT)}</>
        )
      },
      { accessorKey: 'whoHasAccess', header: 'Who Has Access?', minWidth: 150 }
    ],
    []
  );

  const onNoticeMenuItemClick = (noticeId: number, menuAction: string) => {
    const modalTitle = menuItemTexts[menuAction] || '';
    const modalBodyText = `Are you sure you want to ${modalTitle}?`;
    setState((prevState) => ({
      ...prevState,
      menuAction,
      modalTitle,
      modalBodyText,
      noticeId,
      isModalOpen: !prevState.isModalOpen
    }));
  };

  const table = useMaterialReactTable({
    data: notices,
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'first',
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const {
        original: { authorId, statusId, id }
      } = row;
      const reviewerActions = [
        <MenuItem
          key={'approveNotice'}
          disabled={isApprovePermissionAvailable(statusId)}
          onClick={() => {
            closeMenu();
            onNoticeMenuItemClick(id, 'APPROVE_NOTICE');
          }}
        >
          Approve
        </MenuItem>,
        <MenuItem
          key={'rejectNotice'}
          disabled={isRejectPermissionAvailable(statusId)}
          onClick={() => {
            closeMenu();
            onNoticeMenuItemClick(id, 'REJECT_NOTICE');
          }}
        >
          Reject
        </MenuItem>,
        <MenuItem
          key={'deleteNoticeByReviewer'}
          disabled={isDeletePermissionAvailable(authorId, statusId, currentUserId)}
          onClick={() => {
            closeMenu();
            onNoticeMenuItemClick(id, 'DELETE_NOTICE');
          }}
        >
          Delete
        </MenuItem>
      ];
      const userActions = [
        <MenuItem
          key={'editNotice'}
          onClick={() => closeMenu()}
          disabled={isEditPermissionAvailable(authorId, statusId, currentUserId)}
          component={Link}
          to={`/app/notices/edit/${id}`}
        >
          Edit
        </MenuItem>,
        <MenuItem
          key={'deleteNoticeBySelf'}
          disabled={isDeletePermissionAvailable(authorId, statusId, currentUserId)}
          onClick={() => {
            closeMenu();
            onNoticeMenuItemClick(id, 'DELETE_NOTICE_BY_SELF');
          }}
        >
          Delete
        </MenuItem>
      ];

      return actionCellType === 'reviewer' ? reviewerActions : userActions;
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });
  const toggleModal = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };

  const onSave = async () => {
    try {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
      const { noticeId, menuAction } = state;
      const result = await handleAction(menuAction, noticeId);
      toast.info(result?.message);
      toggleModal();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    } finally {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
    }
  };

  const { isSaving, isModalOpen, modalBodyText, modalTitle } = state;
  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }} component={Paper}>
        <MaterialReactTable table={table} />
      </Box>

      <DialogModal
        isSaving={isSaving}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        titleText={modalTitle}
        isOpen={isModalOpen}
        closeModal={toggleModal}
        handleSave={onSave}
      >
        <Typography variant='body1'>{modalBodyText}</Typography>
      </DialogModal>
    </>
  );
};
