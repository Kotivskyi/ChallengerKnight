export type UserAccountBasicDataProps = {
  users: UserAccountBasicProps[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
  userType: 'staff' | 'student';
};

export type UserAccountBasicProps = {
  id: number;
  name: string;
  email: string;
  role: string;
  systemAccess: boolean;
  lastLogin: string;
};
