describe('Tests for the Node() class', function() {
    let graph;

    before('Set up a simple graph of nodes', function() {
        graph = [];

        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                row.push(new Node(i, j, graph));
            }
            graph.push(row);
        }
    });

    it('Test we can access all nodes', function() {
        for (let i = 0; i < graph.length; i++) {
            const row = graph[i];
            for (let j = 0; j < row.length; j++) {
                const node = row[j];
                expect(node.row).to.equal(i);
                expect(node.col).to.equal(j);
            }
        }
    });

    describe('Tests for the getNeighbours() method and neighbours property', function() {
        it('Test an inner node', function() {
            let node = graph[1][1];
            node.getNeighbours();

            let n1 = graph[0][1];
            let n2 = graph[2][1];
            let n3 = graph[1][0];
            let n4 = graph[2][0];
            let n5 = graph[1][2];
            let n6 = graph[2][2];
            expect(node.neighbours).to.include(n1);
            expect(node.neighbours).to.include(n2);
            expect(node.neighbours).to.include(n3);
            expect(node.neighbours).to.include(n4);
            expect(node.neighbours).to.include(n5);
            expect(node.neighbours).to.include(n6);
            expect(node.neighbours).to.have.lengthOf(6);
        });

        it('Test a first row node', function() {
            let node = graph[0][2];
            node.getNeighbours();

            let n1 = graph[0][1];
            let n2 = graph[1][2];
            let n3 = graph[0][3];
            expect(node.neighbours).to.include(n1);
            expect(node.neighbours).to.include(n2);
            expect(node.neighbours).to.include(n3);
            expect(node.neighbours).to.have.lengthOf(3);
        });

        it('Test a last row node', function() {
            let node = graph[3][1];
            node.getNeighbours();

            let n1 = graph[3][0];
            let n2 = graph[2][1];
            let n3 = graph[3][2];
            expect(node.neighbours).to.include(n1);
            expect(node.neighbours).to.include(n2);
            expect(node.neighbours).to.include(n3);
            expect(node.neighbours).to.have.lengthOf(3);
        });

        it('Test the top-left node', function() {
            let node = graph[0][0];
            node.getNeighbours();

            let n1 = graph[1][0];
            let n2 = graph[0][1];
            expect(node.neighbours).to.include(n1);
            expect(node.neighbours).to.include(n2);
            expect(node.neighbours).to.have.lengthOf(2);
        });

        it('Test the bottom-right node', function() {
            let node = graph[3][3];
            node.getNeighbours();

            let n1 = graph[2][3];
            let n2 = graph[3][2];
            expect(node.neighbours).to.include(n1);
            expect(node.neighbours).to.include(n2);
            expect(node.neighbours).to.have.lengthOf(2);
        });
    });
});
