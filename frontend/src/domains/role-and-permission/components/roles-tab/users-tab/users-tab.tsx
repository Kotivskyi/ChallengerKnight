import * as React from 'react';
import { UserList } from './user-list';

type UserTabsProps = {
  roleId: number;
};

export const UserTabs: React.FC<UserTabsProps> = ({ roleId }) => {
  return (
    <>
      <UserList roleId={roleId} />
    </>
  );
};
