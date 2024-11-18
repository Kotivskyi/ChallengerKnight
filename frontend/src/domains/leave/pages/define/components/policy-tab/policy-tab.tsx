import { TabPanel } from '@/components/tab-panel';
import { useLeaveDefine } from '../../context/leave-define-provider';
import { ManagePolicy } from './manage-policy';
import { UserList } from './user-list';

export const PolicyTab = () => {
  const {
    state: { policies, policyTab }
  } = useLeaveDefine();

  return (
    policies &&
    policies.length > 0 &&
    policies.map(({ id, name }, index) => (
      <TabPanel value={policyTab} index={index + 1} key={id}>
        <ManagePolicy id={id} name={name} />
        <UserList policyId={id} />
      </TabPanel>
    ))
  );
};
