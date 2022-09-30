
export interface Employee {
  id: number;
  managerId?: number;
  name: string;
  title: string;
  phone: string;
  hireDate?: Date;
}

export const employees: Employee[] = [
];