import { Box } from '@mui/material';
import { RequestNewLeave } from './components/request-new-leave';
import { MyLeavePolicies } from './components/my-leave-policies';
import { MyLeaveRequestHistory } from './components/my-leave-request-history';
import { LeaveRequestProvider } from './context/leave-request-provider';

export const MyLeaveRequest = () => {
  return (
    <LeaveRequestProvider>
      <RequestNewLeave />
      <MyLeavePolicies />
      <Box sx={{ marginBottom: '50px' }} />
      <MyLeaveRequestHistory />
    </LeaveRequestProvider>
  );
};
