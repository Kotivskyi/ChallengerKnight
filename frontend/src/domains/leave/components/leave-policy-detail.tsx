import * as React from 'react';
import { CalendarMonth } from '@mui/icons-material';
import { Box, Button, Grid2, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { LeaveDetail } from './leave-detail';
import { LeaveForm } from './leave-form';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { LeaveRequestForm, LeaveRequestFormSchema } from '../types';
import { useApplyLeaveRequestMutation, useGetMyLeavePoliciesQuery } from '../api/leave-api';

export const LeavePolicyDetail = () => {
  const [applyLeaveRequest, { isLoading: isApplyingLeave }] = useApplyLeaveRequestMutation();

  const { data } = useGetMyLeavePoliciesQuery();
  const [modalOpen, setModalOpen] = React.useState(false);
  const leavePolicies = data?.leavePolicies ?? [];

  const methods = useForm<LeaveRequestForm>({
    defaultValues: {
      policy: leavePolicies.length > 0 ? leavePolicies[0].id : 0,
      from: new Date(),
      to: new Date(),
      note: ''
    },
    resolver: zodResolver(LeaveRequestFormSchema)
  });

  const handleRequest = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const submitRequest = async (data: LeaveRequestForm) => {
    try {
      const { policy, from, to, note } = data;
      const payload = {
        policy,
        from: getFormattedDate(from, API_DATE_FORMAT),
        to: getFormattedDate(to, API_DATE_FORMAT),
        note
      };
      const result = await applyLeaveRequest(payload).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  let content: null | React.ReactElement = null;
  if (!Array.isArray(leavePolicies) || leavePolicies.length <= 0) {
    content = (
      <Grid2 size={{ xs: 12 }}>
        <Box component={Paper} sx={{ p: 2 }}>
          Record not found.
        </Box>
      </Grid2>
    );
  } else {
    content = (
      <>
        {leavePolicies.map((leave) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={leave.id}>
            <LeaveDetail key={leave.id} {...leave} />
          </Grid2>
        ))}
      </>
    );
  }

  return (
    <>
      <Button
        size='small'
        variant='contained'
        onClick={handleRequest}
        startIcon={<CalendarMonth />}
        sx={{ marginBottom: '10px' }}
      >
        Request Leave
      </Button>
      <Grid2 container columnSpacing={2} rowSpacing={2}>
        {content}
      </Grid2>

      <DialogModal
        isSaving={isApplyingLeave}
        titleText='Submit Request'
        isOpen={modalOpen}
        closeModal={closeModal}
        handleSave={methods.handleSubmit(submitRequest)}
      >
        <LeaveForm methods={methods} leavePolicies={leavePolicies} />
      </DialogModal>
    </>
  );
};
