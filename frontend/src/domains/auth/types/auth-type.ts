import * as React from 'react';
import { z } from 'zod';
import { LoginSchema, PasswordSchema, SetupPasswordSchema } from './auth-schema';
import { BasePermission, Permission } from '@/utils/type/misc';

export type SubMenu = {
  id: number;
  name: string;
  path: string;
};

export type Menu = {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  subMenus: SubMenu[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  menus: Permission[];
  apis: BasePermission[];
  uis: BasePermission[];
};

export type LoginRequest = z.infer<typeof LoginSchema>;

export type PasswordProps = z.infer<typeof PasswordSchema>;

export type SetupPasswordProps = z.infer<typeof SetupPasswordSchema>;

export type UserId = {
  userId: number;
};
