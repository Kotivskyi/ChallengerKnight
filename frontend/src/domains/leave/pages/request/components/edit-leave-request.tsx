import * as React from 'react';
import {
  LeaveRequestForm,
  LeaveRequestFormSchema,
  MyLeaveRequestDetail
} from '@/domains/leave/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';

import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useUpdateLeaveRequestMutation } from '@/domains/leave/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/components/dialog-modal';
import { LeaveForm } from '@/domains/leave/components';
import { useLeaveRequest } from '../context/leave-request-provider';

type EditLeaveRequestProps = {
  user: null | MyLeaveRequestDetail;
  closeModal: () => void;
};
export const EditLeaveRequest: React.FC<EditLeaveRequestProps> = ({ user, closeModal }) => {
  const [updateLeaveRequest, { isLoading: isUpdating }] = useUpdateLeaveRequestMutation();
  const { myLeavePolicies } = useLeaveRequest();
  const methods = useForm<LeaveRequestForm>({
    defaultValues: {
      policy: user?.policyId || 0,
      from: new Date(),
      to: new Date(),
      note: ''
    },
    resolver: zodResolver(LeaveRequestFormSchema)
  });

  React.useEffect(() => {
    if (user) {
      const { setValue } = methods;
      setValue('policy', user.policyId);
      setValue('from', parseISO(user.from));
      setValue('to', parseISO(user.to));
      setValue('note', user.note);
    }
  }, [user, methods]);

  const editLeave = async (data: LeaveRequestForm) => {
    try {
      const { policy, from, to, note } = data;
      const payload = {
        id: user?.id,
        policy,
        from: getFormattedDate(from, API_DATE_FORMAT),
        to: getFormattedDate(to, API_DATE_FORMAT),
        note
      };
      const result = await updateLeaveRequest(payload).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isUpdating}
      isOpen={true}
      titleText='Edit Leave Details'
      handleSave={methods.handleSubmit(editLeave)}
      closeModal={closeModal}
    >
      <LeaveForm methods={methods} leavePolicies={myLeavePolicies} />
    </DialogModal>
  );
};
