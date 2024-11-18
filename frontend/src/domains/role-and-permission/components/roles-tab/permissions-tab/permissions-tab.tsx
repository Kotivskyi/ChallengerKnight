import * as React from 'react';
import { PermissionList } from './permission-list';

type PermissionsTabsProps = {
  roleId: number;
};

export const PermissionsTabs: React.FC<PermissionsTabsProps> = ({ roleId }) => {
  return (
    <>
      <PermissionList roleId={roleId} />
    </>
  );
};
