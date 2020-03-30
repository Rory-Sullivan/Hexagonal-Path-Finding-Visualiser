describe('Tests for the addToMinDist() function', function() {
    let noWallGrid;
    let d1;

    beforeEach('Set up minDist array before each test', function() {
        noWallGrid = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        d1 = new Dijkstra(noWallGrid, [0, 0], [1, 1]);

        d1.minDist = [{ d: 0 }, { d: 1 }, { d: 3 }, { d: 4 }];
    });

    it('Check adding to an empty array', function() {
        d1.minDist = [];
        d1.addToMinDist({ d: 0 });
        expect(d1.minDist).to.deep.equal([{ d: 0 }]);
    });

    it('Check adding to middle', function() {
        d1.addToMinDist({ d: 2 });
        expect(d1.minDist).to.deep.equal([
            { d: 0 },
            { d: 1 },
            { d: 2 },
            { d: 3 },
            { d: 4 }
        ]);
    });

    it('Check adding duplicate value', function() {
        d1.addToMinDist({ d: 3 });
        expect(d1.minDist).to.deep.equal([
            { d: 0 },
            { d: 1 },
            { d: 3 },
            { d: 3 },
            { d: 4 }
        ]);
    });

    it('Check adding to end', function() {
        d1.addToMinDist({ d: 6 });
        expect(d1.minDist).to.deep.equal([
            { d: 0 },
            { d: 1 },
            { d: 3 },
            { d: 4 },
            { d: 6 }
        ]);
    });
});

describe('Tests for the Dijkstra algorithm', function() {
    let noWallGrid, basicWallGrid, complexWallGrid, noPathGrid;

    before('Setup grids for our tests', function() {
        noWallGrid = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        basicWallGrid = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ];

        complexWallGrid = [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0]
        ];

        noPathGrid = [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ];
    });

    it('Test on no wall grid', function() {
        let d1 = new Dijkstra(noWallGrid, [1, 0], [1, 4]);
        d1.solve();
        expect(d1.pathFound).to.equal(true);
        expect(d1.path).to.have.lengthOf(5);
    });

    it('Test on basic wall grid', function() {
        let d1 = new Dijkstra(basicWallGrid, [3, 0], [3, 4]);
        d1.solve();
        expect(d1.pathFound).to.equal(true);
        expect(d1.path).to.have.lengthOf(9);
    });

    it('Test on complex wall grid', function() {
        let d1 = new Dijkstra(complexWallGrid, [0, 0], [3, 4]);
        d1.solve();
        expect(d1.pathFound).to.equal(true);
        expect(d1.path).to.have.lengthOf(12);
    });

    it('Test no path', function() {
        let d1 = new Dijkstra(noPathGrid, [0, 0], [3, 4]);
        d1.solve();
        expect(d1.pathFound).to.equal(true);
        expect(d1.noPath).to.equal(true);
        expect(d1.path).to.have.lengthOf(0);
    });
});
