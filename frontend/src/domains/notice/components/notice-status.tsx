import * as React from 'react';
import { AutoDelete, Block, Delete, Done, Drafts, HourglassTop } from '@mui/icons-material';
import { Chip } from '@mui/material';

type StatusMap = {
  [key: number]: ['default' | 'success' | 'error', JSX.Element];
};

const statusMap: StatusMap = {
  1: ['default', <Drafts />],
  2: ['default', <HourglassTop />],
  3: ['default', <AutoDelete />],
  4: ['error', <Block />],
  5: ['success', <Done />],
  6: ['default', <Delete />]
};

type LeaveStatusProps = {
  statusId: number;
  label: string;
};

export const NoticeStatus: React.FC<LeaveStatusProps> = ({ statusId, label }) => {
  const [color, icon] = statusMap[statusId] || ['default', null];

  return <Chip icon={icon} label={label} color={color} />;
};
