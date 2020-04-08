import 'chai/register-expect.js';

import hexDistanceBetween from '../algorithms/hexDistanceBetween.js';

describe('Tests for distance function', () => {
  describe('Tests from [0, 0]', () => {
    const x = [0, 0];

    it('To [0, 1]', () => {
      const y = [0, 1];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(1);
    });
    it('To [1, 0]', () => {
      const y = [0, 1];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(1);
    });
    it('To [1, 2]', () => {
      const y = [1, 2];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(2);
    });

    it('To [2, 3]', () => {
      const y = [2, 3];
      const dis = hexDistanceBetween(x, y);
      expect(dis).to.equal(4);
    });
  });
});
