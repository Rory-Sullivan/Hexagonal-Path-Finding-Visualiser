describe('Tests for the Node() class', function() {
    let graph1, graph2, graph3;

    before('Set up three graphs of nodes', function() {
        graph1 = [];
        graph2 = [];
        graph3 = [];

        // Single node
        graph1.push([new Node(0, 0, graph1)]);

        // 3 X 3 graph
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(new Node(i, j, graph2));
            }
            graph2.push(row);
        }

        // 3 X 4 graph
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                row.push(new Node(i, j, graph3));
            }
            graph3.push(row);
        }
    });

    describe('Test we can access all nodes', function() {
        it('Test single node', function() {
            const node = graph1[0][0];
            expect(node.row).to.equal(0);
            expect(node.col).to.equal(0);
        });

        it('Test 3 X 3 graph', function() {
            for (let i = 0; i < graph2.length; i++) {
                const row = graph2[i];
                for (let j = 0; j < row.length; j++) {
                    const node = row[j];
                    expect(node.row).to.equal(i);
                    expect(node.col).to.equal(j);
                }
            }
        });

        it('Test 3 X 4 graph', function() {
            for (let i = 0; i < graph3.length; i++) {
                const row = graph3[i];
                for (let j = 0; j < row.length; j++) {
                    const node = row[j];
                    expect(node.row).to.equal(i);
                    expect(node.col).to.equal(j);
                }
            }
        });
    });

    describe('Tests for the getNeighbours() method and neighbours property', function() {
        describe('Test method executes on all nodes', function() {
            it('Test single node', function() {
                const node = graph1[0][0];
                node.getNeighbours();
            });

            it('Test 3 X 3 graph', function() {
                for (let i = 0; i < graph2.length; i++) {
                    const row = graph2[i];
                    for (let j = 0; j < row.length; j++) {
                        const node = row[j];
                        node.getNeighbours();
                    }
                }
            });

            it('Test 3 X 4 graph', function() {
                for (let i = 0; i < graph3.length; i++) {
                    const row = graph3[i];
                    for (let j = 0; j < row.length; j++) {
                        const node = row[j];
                        node.getNeighbours();
                    }
                }
            });
        });

        describe('Test return values are correct for all cases', function() {
            it('Test an inner node from column 1', function() {
                let node = graph2[1][1];
                node.getNeighbours();

                let n1 = graph2[0][1];
                let n2 = graph2[2][1];
                let n3 = graph2[1][0];
                let n4 = graph2[2][0];
                let n5 = graph2[1][2];
                let n6 = graph2[2][2];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.include(n5);
                expect(node.neighbours).to.include(n6);
                expect(node.neighbours).to.have.lengthOf(6);
            });

            it('Test an inner node from column 2', function() {
                let node = graph3[1][2];
                node.getNeighbours();

                let n1 = graph3[0][2];
                let n2 = graph3[2][2];
                let n3 = graph3[0][1];
                let n4 = graph3[1][1];
                let n5 = graph3[0][3];
                let n6 = graph3[1][3];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.include(n5);
                expect(node.neighbours).to.include(n6);
                expect(node.neighbours).to.have.lengthOf(6);
            });

            it('Test a first row, column 1 node from 3 X 3 graph', function() {
                let node = graph2[0][1];
                node.getNeighbours();

                let n1 = graph2[1][1];
                let n2 = graph2[0][0];
                let n3 = graph2[1][0];
                let n4 = graph2[0][2];
                let n5 = graph2[1][2];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.include(n5);
                expect(node.neighbours).to.have.lengthOf(5);
            });

            it('Test a first row, column 2 node from 3 X 4 graph', function() {
                let node = graph3[0][2];
                node.getNeighbours();

                let n1 = graph3[0][1];
                let n2 = graph3[1][2];
                let n3 = graph3[0][3];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.have.lengthOf(3);
            });

            it('Test a last row, column 1 node from 3 X 3 graph', function() {
                let node = graph2[2][1];
                node.getNeighbours();

                let n1 = graph2[2][0];
                let n2 = graph2[1][1];
                let n3 = graph2[2][2];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.have.lengthOf(3);
            });

            it('Test a last row, column 2 node from 3 X 4 graph', function() {
                let node = graph3[2][2];
                node.getNeighbours();

                let n1 = graph3[1][2];
                let n2 = graph3[2][1];
                let n3 = graph3[1][1];
                let n4 = graph3[1][3];
                let n5 = graph3[2][3];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.include(n5);
                expect(node.neighbours).to.have.lengthOf(5);
            });

            it('Test a left column node from 3 X 3 graph', function() {
                let node = graph2[1][0];
                node.getNeighbours();

                let n1 = graph2[0][0];
                let n2 = graph2[2][0];
                let n3 = graph2[0][1];
                let n4 = graph2[1][1];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.have.lengthOf(4);
            });

            it('Test a right column node from 3 X 3 graph', function() {
                let node = graph2[1][2];
                node.getNeighbours();

                let n1 = graph2[0][2];
                let n2 = graph2[2][2];
                let n3 = graph2[0][1];
                let n4 = graph2[1][1];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.have.lengthOf(4);
            });

            it('Test a right column node from 3 X 4 graph', function() {
                let node = graph3[1][3];
                node.getNeighbours();

                let n1 = graph3[0][3];
                let n2 = graph3[2][3];
                let n3 = graph3[1][2];
                let n4 = graph3[2][2];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.include(n4);
                expect(node.neighbours).to.have.lengthOf(4);
            });

            it('Test the top-left node of 3 X 3 graph', function() {
                let node = graph2[0][0];
                node.getNeighbours();

                let n1 = graph2[1][0];
                let n2 = graph2[0][1];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.have.lengthOf(2);
            });

            it('Test the bottom-right node of 3 X 3 graph', function() {
                let node = graph2[2][2];
                node.getNeighbours();

                let n1 = graph2[2][1];
                let n2 = graph2[1][1];
                let n3 = graph2[1][2];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.include(n3);
                expect(node.neighbours).to.have.lengthOf(3);
            });

            it('Test the bottom-right node of 3 X 4 graph', function() {
                let node = graph3[2][3];
                node.getNeighbours();

                let n1 = graph3[2][2];
                let n2 = graph3[1][3];
                expect(node.neighbours).to.include(n1);
                expect(node.neighbours).to.include(n2);
                expect(node.neighbours).to.have.lengthOf(2);
            });

            describe('Tests for wall functionality', function() {
                it('Test walls are not included as neighbours', function() {
                    let node = graph2[1][1];
                    graph2[2][2].isWall = true;
                    node.getNeighbours();

                    let n1 = graph2[0][1];
                    let n2 = graph2[2][1];
                    let n3 = graph2[1][0];
                    let n4 = graph2[2][0];
                    let n5 = graph2[1][2];
                    expect(node.neighbours).to.include(n1);
                    expect(node.neighbours).to.include(n2);
                    expect(node.neighbours).to.include(n3);
                    expect(node.neighbours).to.include(n4);
                    expect(node.neighbours).to.include(n5);
                    expect(node.neighbours).to.have.lengthOf(5);

                    graph2[2][2].isWall = false;
                });

                it('Test walls have no neighbours', function() {
                    let node = graph2[1][1];
                    node.isWall = true;
                    node.getNeighbours();

                    expect(node.neighbours).to.have.lengthOf(0);

                    graph2[2][2].isWall = false;
                });

                it('Test node with walls on three sides', function() {
                    let node = graph2[1][0];
                    graph2[0][1].isWall = true;
                    graph2[1][1].isWall = true;
                    graph2[2][0].isWall = true;
                    node.getNeighbours();

                    expect(node.neighbours).to.include(graph2[0][0]);
                    expect(node.neighbours).to.have.lengthOf(1);

                    graph2[0][1].isWall = false;
                    graph2[1][1].isWall = false;
                    graph2[2][0].isWall = false;
                });
            });
        });
    });
});

describe('Tests for the Graph class', function() {
    let grid;
    before('Sets up a basic grid for testing', function() {
        grid = [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ];
    });

    it('new Graph() test', function() {
        let graph = new Graph(grid);
    });

    it('Test that it returns what we expect', function() {
        let graph = new Graph(grid);

        expect(graph).to.have.lengthOf(4);
        expect(graph[0]).to.have.lengthOf(5);
        expect(graph[0][0]).to.be.instanceOf(Node);
        expect(graph[3][4].neighbours).to.have.lengthOf(3);
    });
});

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

        it('To [2, 3]', function() {
            let y = [2, 3];
            let dis = hexDistanceBetween(x, y);
            expect(dis).to.equal(4);
        });
    });
});
