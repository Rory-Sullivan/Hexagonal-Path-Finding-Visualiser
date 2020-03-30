describe('Tests for distance function', function() {
    describe('Tests from [0, 0]', function() {
        let x = [0, 0];

        it('To [0, 1]', function() {
            let y = [0, 1];
            let dis = hexDistanceBetween(x, y);
            expect(dis).to.equal(1);
        });
        it('To [1, 0]', function() {
            let y = [0, 1];
            let dis = hexDistanceBetween(x, y);
            expect(dis).to.equal(1);
        });
        it('To [1, 2]', function() {
            let y = [1, 2];
            let dis = hexDistanceBetween(x, y);
            expect(dis).to.equal(2);
        });
    });
});
