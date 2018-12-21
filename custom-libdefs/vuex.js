declare type State = {
  groups: Array<Group>,
  invoices: Array<Invoice>,
  user: User,
};

declare type Context = {
  commit(action: string, params: any): void,
};
