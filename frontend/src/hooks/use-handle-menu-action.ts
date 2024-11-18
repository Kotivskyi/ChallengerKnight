import { menuItemTexts } from '../constants';
import {
  useResendPwdSetupLinkMutation,
  useResendVerificationEmailMutation,
  useResetPwdMutation
} from '@/domains/auth/api';
import { useHandleNoticeStatusMutation } from '@/domains/notice/api';
import { useHandleStaffStatusMutation } from '@/domains/staff/api';
import { useReviewStudentStatusMutation } from '@/domains/student/api';

export const useHandleMenuAction = () => {
  const [handleStaffStatus] = useHandleStaffStatusMutation();
  const [handleStudentStatus] = useReviewStudentStatusMutation();
  const [resendVerificationEmail] = useResendVerificationEmailMutation();
  const [resendPwdSetupLink] = useResendPwdSetupLinkMutation();
  const [resetPwd] = useResetPwdMutation();
  const [handleNoticeStatus] = useHandleNoticeStatusMutation();

  const handleAction = async (menuItemValue: string, selectedId: number) => {
    const actionHandlers: {
      [key in keyof typeof menuItemTexts]: () => Promise<{ message: string }>;
    } = {
      ENABLE_STAFF_STATUS: () => handleStaffStatus({ id: selectedId, status: true }).unwrap(),
      DISABLE_STAFF_STATUS: () => handleStaffStatus({ id: selectedId, status: false }).unwrap(),
      ENABLE_STUDENT_STATUS: () => handleStudentStatus({ id: selectedId, status: true }).unwrap(),
      DISABLE_STUDENT_STATUS: () => handleStudentStatus({ id: selectedId, status: false }).unwrap(),
      RESEND_VERIFICATION_EMAIL_TO_USER: () =>
        resendVerificationEmail({ userId: selectedId }).unwrap(),
      RESEND_PWD_LINK_EMAIL_TO_USER: () => resendPwdSetupLink({ userId: selectedId }).unwrap(),
      RESET_USER_PWD: () => resetPwd({ userId: selectedId }).unwrap(),
      APPROVE_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 5 }).unwrap(),
      REJECT_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 4 }).unwrap(),
      DELETE_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 6 }).unwrap(),
      DELETE_NOTICE_BY_SELF: () => handleNoticeStatus({ id: selectedId, status: 3 }).unwrap()
    };

    if (actionHandlers[menuItemValue]) {
      return await actionHandlers[menuItemValue]();
    }
    return null;
  };

  return { handleAction };
};
