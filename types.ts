export type Employee = {
    id?: number;
    name: string;
    designation: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export type Department = {
    id?: number;
    name: string;
    location: string;
    noofemployees: number;
    description: string;
  }