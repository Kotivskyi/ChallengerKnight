import React from 'react';

export type Column = {
  value: string;
  label: string;
  minWidth?: number;
  colSpan?: number;
};

export type NameIdType<T = string | number> = {
  name: string;
  id: T;
};

export type BasePermission = {
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
  icon?: React.ReactNode;
};
export type Permission = BasePermission & {
  subMenus?: BasePermission[];
};
