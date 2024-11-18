import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps
} from '@mui/material';
import Draggable from 'react-draggable';
import { LoadingButton } from '@mui/lab';

type DialogModalProps = {
  isSaving: boolean;
  actionFooterCancelText?: string;
  actionFooterSaveText?: string;
  isModalClosedOnOutClick?: boolean;
  isOpen: boolean;
  titleText?: string;
  closeModal: () => void;
  children: React.ReactNode;
  handleSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
export const DialogModal: React.FC<DialogModalProps> = ({
  isSaving,
  actionFooterCancelText,
  actionFooterSaveText,
  isModalClosedOnOutClick = true,
  isOpen,
  titleText,
  closeModal,
  children,
  handleSave
}) => {
  const handleClose = () => {
    {
      Boolean(isModalClosedOnOutClick) && closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      PaperComponent={PaperComponent}
    >
      <DialogTitle id='draggable-dialog-title'>{titleText}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button type='button' size='small' variant='contained' color='error' onClick={closeModal}>
          {actionFooterCancelText ?? 'Cancel'}
        </Button>
        <LoadingButton
          loading={isSaving}
          type='button'
          size='small'
          variant='contained'
          onClick={handleSave}
        >
          {actionFooterSaveText ?? 'Save'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
