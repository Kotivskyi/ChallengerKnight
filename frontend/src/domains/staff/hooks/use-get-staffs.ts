import * as React from 'react';
import { UserAccountBasicProps } from '@/components/user-account-basic';
import { useLazyGetStaffsQuery } from '../api/staff-api';

export const useGetStaffs = () => {
  const [staffs, setStaffs] = React.useState<UserAccountBasicProps[]>([]);
  const [getStaffs] = useLazyGetStaffsQuery();

  React.useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const result = await getStaffs({}).unwrap();
        const staffs = Array.isArray(result.staffs) ? result.staffs : [];
        setStaffs(staffs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffs();
  }, [getStaffs]);

  return staffs;
};
