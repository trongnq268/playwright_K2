export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  avatarPath?: string;
  loginDetails?: {
    username: string;
    password: string;
    status?: 'Enabled' | 'Disabled';
  };
}
