// import Physicaldoctor from "./Physicaldoctor";

export interface CareGiverInterface {
  _id: string;
  name: string;
  types: string[]; // or more specifically: types: ("Normal" | "Critical")[];
  image: string;
  desc: string;
}

export const Physicaldoctordata = [
  {
    title: "Gp doctor consolation at home",
    description: "Home visit by a GP doctor",
    price: "2500",
    catagory: "gpdoctor",
  },
  {
    title: "Specialist doctor at home ",
    description:
      "Home visit palliative/Critical care/physical/medicine specialist",
    price: "2500",
    catagory: "specialistdoctor",
  },
];
export interface catagoryinterface {
  service: string;
  scope: string;
  price: number;
  b2b_price: number;
  _id: string;
  bnService: string;
  categories: catagory[];
}

export interface specialist {
  fullName: string;
  visitDate: Date | null;
  visitTime: Date | null;
  address: string;
  age: string;
  weight: string;
  payment: string;
  category?: string;
  physicalDoctorId?: string;
  gender?: string;
  district?: string;
  thana?: string;

  // categories: catagory[];
}

export interface catagory {
  desc: string;
  icon: string;
  name: string;
  _id: string;
}

interface user {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface paymentdata {
  invoiceNumber: string;
  totalCost: string;
  user: user;
}
