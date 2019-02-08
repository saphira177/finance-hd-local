import numeral from 'numeral';

const formatThousand = (val: number|string): string => numeral(val).format('0,0');

const getNumber = (val: number|string): number => numeral(val).value();

const convertToView = (val: number): number => val * 1000;

const revertToReal = (val: number): number => val / 1000;

export const formatView = (val: number): string => (
  formatThousand(convertToView(val))
);

export const getFromView = (val: string): number => (
  revertToReal(getNumber(val))
);

export const addDigit = (
  val: number,
  digit: number,
): number => Number(`${val.toString()}${digit.toString()}`)

export const deleteDigit = (
  val: number,
): number => Number(`${val.toString().slice(0, -1)}`);
