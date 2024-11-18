import { NameIdType } from './utils/type/misc';

export const noticeStatusList: NameIdType[] = [
  { id: 1, name: 'Draft' },
  { id: 2, name: 'Submit for Approval' }
];

export const genders: NameIdType[] = [
  { name: 'Male', id: 'Male' },
  { name: 'Female', id: 'Female' },
  { name: 'Other', id: 'Other' }
];

export const maritalStatusList: NameIdType[] = [
  { name: 'Single', id: 'Single' },
  { name: 'Married', id: 'Married' },
  { name: 'Divorced', id: 'Divorced' },
  { name: 'Widowed', id: 'Widowed' }
];

export const menuItemTexts: Record<string, string> = {
  ENABLE_STAFF_STATUS: 'Enable Staff',
  DISABLE_STAFF_STATUS: 'Disable Staff',
  ENABLE_STUDENT_STATUS: 'Enable Student',
  DISABLE_STUDENT_STATUS: 'Disable Student',
  RESEND_VERIFICATION_EMAIL_TO_USER: 'Resend Verification Email',
  RESEND_PWD_LINK_EMAIL_TO_USER: 'Resend Password Setup Link',
  RESET_USER_PWD: 'Reset User Password',
  APPROVE_NOTICE: 'Approve Notice',
  REJECT_NOTICE: 'Reject Notice',
  DELETE_NOTICE: 'Delete Notice',
  DELETE_NOTICE_BY_SELF: 'Delete Notice'
};
