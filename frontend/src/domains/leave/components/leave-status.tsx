import * as React from 'react';
import { Block, Done, Pending } from '@mui/icons-material';
import { Chip } from '@mui/material';

type StatusMap = {
  [key: number]: ['default' | 'success' | 'error', JSX.Element];
};

const statusMap: StatusMap = {
  1: ['default', <Pending />],
  2: ['success', <Done />],
  3: ['error', <Block />]
};

type LeaveStatusProps = {
  statusId: number;
  label: string;
};

export const LeaveStatus: React.FC<LeaveStatusProps> = ({ statusId, label }) => {
  const [color, icon] = statusMap[statusId] || ['default', null];

  return <Chip icon={icon} label={label} color={color} />;
};
