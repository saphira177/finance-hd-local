export const displayMoney = money => (
  Number(money * 1000).toLocaleString('vi', { style: 'currency', currency: 'VND' })
);
