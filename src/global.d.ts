type IType = 'in' | 'out';

interface User {
  _id: string;
  name: string;
  groups: any;
}

interface Group {
  _id: string;
  name: string;
  available: number;
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

interface OutcomeCategories {
  [key: string] : number;
}

interface State {
  groups: Group[];
  invoices: Invoice[];
  user: User;
}

interface Context {
  commit(action: string, params?: any): void;
}
