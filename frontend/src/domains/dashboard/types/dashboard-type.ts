import { MyLeavePolicy } from '@/domains/leave/types';
import { Notice } from '@/domains/notice/types';

type GeneralData = {
  heading: string;
  totalNumberCurrentYear: number;
  totalNumberPercInComparisonFromPrevYear: number;
  totalNumberValueInComparisonFromPrevYear: number;
};

export type CelebrationProps = {
  userId: number;
  user: string;
  event: string;
  eventDate: string;
};

export type WhoIsOutProps = {
  fromDate: string;
  toDate: string;
  user: string;
  userId: number;
  leaveType: string;
};

export type DashboardProps = {
  students: GeneralData;
  teachers: GeneralData;
  parents: GeneralData;
  notices: Notice[];
  leavePolicies: MyLeavePolicy[];
  celebrations: CelebrationProps[];
  oneMonthLeave: WhoIsOutProps[];
};
