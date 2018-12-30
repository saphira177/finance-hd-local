type IType = 'in' | 'out';

interface RootState {
  version: string;
}

interface User {
  _id: string;
  name: string;
  groups: any;
}

interface UserState {
  user: User;
}

interface Group {
  _id: string;
  name: string;
  available: number;
}

interface GroupState {
  groups: Array<Group>;
}

interface Invoice {
  _id: string;
  name: string;
  category: string;
  type: IType;
  number: number;
  date: string;
  group: string;
  user: string;
}

interface InvoiceState {
  invoices: Array<Invoice>;
}


interface OutcomeCategories {
  [key: string] : number;
}
