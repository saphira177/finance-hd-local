import {
  formatView,
  getFromView,
  addDigit,
  deleteDigit,
} from '@/utils/numberFormat';

describe('NumberFormat', () => {
  describe('formatView', () => {
    test('should present number with thousand comma and auto add k at last', () => {
      expect(formatView(0)).toEqual('0');
      expect(formatView(1)).toEqual('1,000');
      expect(formatView(1000)).toEqual('1,000,000');
      expect(formatView(1000000)).toEqual('1,000,000,000');
    });
  });

  describe('getFromView', () => {
    test('should return real value without comma and remove last 000', () => {
      expect(getFromView('0')).toEqual(0);
      expect(getFromView('1,000')).toEqual(1);
      expect(getFromView('1,000,000')).toEqual(1000);
    });
  });

  describe('addDigit', () => {
    test('should add a digit at the last right', () => {
      expect(addDigit(1, 2)).toEqual(12);
      expect(addDigit(100, 2)).toEqual(1002);
    });
  });

  describe('deleteDigit', () => {
    test('should delete a digit at the last right', () => {
      expect(deleteDigit(1002)).toEqual(100);
      expect(deleteDigit(1)).toEqual(0);
    });
  });
});
