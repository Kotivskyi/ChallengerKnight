import * as React from 'react';
import { Box, ListItemIcon, ListItemText, MenuItem, Paper, Typography } from '@mui/material';
import { Block, CheckCircle, Edit, Email, Key, LockReset, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { DialogModal } from '@/components/dialog-modal';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UserAccountBasicDataProps, UserAccountBasicProps } from './user-account-basic-type';
import { useHandleMenuAction } from '../../hooks';
import { menuItemTexts } from '@/constants';

type State = {
  isSaving: boolean;
  isModalOpen: boolean;
  modalTitle: string;
  modalBodyText: string;
  userId: number;
  menuAction: string;
};
const initialState = {
  isSaving: false,
  isModalOpen: false,
  modalTitle: '',
  modalBodyText: '',
  userId: 0,
  menuAction: ''
};

export const UserAccountBasic = ({ data }: { data: UserAccountBasicDataProps }) => {
  const [state, setState] = React.useState<State>(initialState);
  const { handleAction } = useHandleMenuAction();
  const { users, userType, isLoading, isError, error } = data;

  const columns: MRT_ColumnDef<UserAccountBasicProps>[] = React.useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      {
        accessorKey: 'systemAccess',
        header: 'System Access',
        Cell: ({ cell }) => <>{cell.getValue<boolean>().toString()}</>
      },
      {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      }
    ],
    []
  );
  const onMenuItemClick = (menuAction: string, userId: number) => {
    const modalTitle = menuItemTexts[menuAction] || '';
    const modalBodyText = `Are you sure you want to ${modalTitle}?`;
    setState((prevState) => ({
      ...prevState,
      modalTitle,
      modalBodyText,
      userId,
      isModalOpen: !prevState.isModalOpen,
      menuAction
    }));
  };
  const toggleModal = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };
  const onSave = async () => {
    try {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
      const { userId, menuAction } = state;
      const result = await handleAction(menuAction, userId);
      toast.info(result?.message);
      toggleModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    } finally {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
    }
  };

  const menuActions = [
    {
      action: userType === 'staff' ? 'DISABLE_STAFF_STATUS' : 'DISABLE_STUDENT_STATUS',
      icon: <Block />,
      text: 'Disable'
    },
    {
      action: userType === 'staff' ? 'ENABLE_STAFF_STATUS' : 'ENABLE_STUDENT_STATUS',
      icon: <CheckCircle />,
      text: 'Enable'
    },
    {
      action: 'RESEND_VERIFICATION_EMAIL_TO_USER',
      icon: <Email />,
      text: 'Resend Verification Email'
    },
    {
      action: 'RESEND_PWD_LINK_EMAIL_TO_USER',
      icon: <Key />,
      text: 'Resend Password Setup Link'
    },
    {
      action: 'RESET_USER_PWD',
      icon: <LockReset />,
      text: 'Reset Password'
    }
  ];
  const table = useMaterialReactTable({
    data: isError ? [] : users || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const {
        original: { id }
      } = row;
      const staticAction = [
        <MenuItem
          key={0}
          onClick={() => closeMenu()}
          component={Link}
          to={userType === 'staff' ? `/app/staffs/${id}` : `/app/students/${id}`}
        >
          <ListItemIcon>
            <Visibility fontSize='small' />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => closeMenu()}
          component={Link}
          to={userType === 'staff' ? `/app/staffs/edit/${id}` : `/app/students/edit/${id}`}
        >
          <ListItemIcon>
            <Edit fontSize='small' />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      ];
      return [
        ...staticAction,
        menuActions.map(({ action, icon, text }) => (
          <MenuItem
            onClick={() => {
              closeMenu();
              onMenuItemClick(action, id);
            }}
            key={action}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))
      ];
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? error : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const { modalTitle, modalBodyText, isModalOpen, isSaving } = state;
  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }} component={Paper}>
        <MaterialReactTable table={table} />
      </Box>

      <DialogModal
        isSaving={isSaving}
        titleText={modalTitle}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={isModalOpen}
        closeModal={toggleModal}
        handleSave={onSave}
      >
        <Typography variant='body1'>{modalBodyText}</Typography>
      </DialogModal>
    </>
  );
};
