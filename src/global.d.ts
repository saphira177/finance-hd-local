type IType = 'in' | 'out';

interface IError {
  name: string;
  code: number;
}

type IStatus = '' | 'PENDING' | 'FULFILLED' | 'FINISHED';

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
  groupError: IError;
  loading: boolean;
  status: IStatus;
}

interface Invoice {
  _id?: string;
  name: string;
  category: string;
  type: IType;
  number: number;
  date: string;
  group: string;
  user?: string;
}

interface InvoiceState {
  invoices: Array<Invoice>;
}


interface OutcomeCategories {
  [key: string] : number;
}
