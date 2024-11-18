import * as React from 'react';
import { TableCell, TableRow } from '@mui/material';

const NO_RECORD = 'Record not found';

type Props = {
  colSpan: number;
  text?: string;
};

export const TableRowWithColSpan: React.FC<Props> = ({ colSpan, text }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{text ? text : NO_RECORD}</TableCell>
    </TableRow>
  );
};
