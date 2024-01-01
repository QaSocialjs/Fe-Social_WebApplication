export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accesstoken?: string;
  refreshtoken?: string;
  gender?: number;
  age: string;
}
