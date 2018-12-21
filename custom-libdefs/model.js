declare type User = {
  _id: string,
  name: string,
  groups?: Array<any>,
};

declare type Group = {
  _id: string,
  name: string,
  available: number,
};

declare type IType = 'in' | 'out';

declare type Invoice = {
  _id: string,
  name: string,
  category: string,
  type: IType,
  number: number,
  date: string,
  group: string,
  user: string,
};
