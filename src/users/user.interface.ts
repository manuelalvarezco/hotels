export interface User {
  id: number;
  fullName: string;
  birthday: string;
  gender: string;
  documentType: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  contactPhone: string;
  contactName: string;
  active: boolean;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}