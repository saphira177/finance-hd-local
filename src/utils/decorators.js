// @flow
export const displayMoney = (money: number): string => (
  Number(money * 1000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
);
