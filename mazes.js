function verticalMaze() {
    let startI = 0;
    let endI = m - 1;

    for (let j = 1; j < n; j += 2) {
        for (let i = startI; i < endI; i++) {
            if (
                (i === start[0] && j === start[1]) ||
                (i === end[0] && j === end[1])
            ) {
                continue;
            }
            grid[i][j] = 1;
            hexes[i][j].fill = 'black';
        }
        startI = (startI + 1) % 2;
        endI = m - 1 + startI;
    }
    animate();
}

function horizontalMaze() {
    let startJ = 0;
    let endJ = n - 1;

    for (let i = 1; i < m; i += 2) {
        for (let j = startJ; j < endJ; j++) {
            if (
                (i === start[0] && j === start[1]) ||
                (i === end[0] && j === end[1])
            ) {
                continue;
            }
            grid[i][j] = 1;
            hexes[i][j].fill = 'black';
        }
        startJ = (startJ + 1) % 2;
        endJ = n - 1 + startJ;
    }
    animate();
}

function radialMaze() {
    let centreRow = Math.floor(m / 2);
    let centreCol = Math.floor(n / 2);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let dis = hexDistanceBetween([centreRow, centreCol], [i, j]);
            if (dis % 2 === 1) {
                grid[i][j] = 1;
                hexes[i][j].fill = 'black';
            }
        }
    }

    animate();
}

function hexDistanceBetween(x, y) {
    let dis, dis1, dis2;
    let penalty;

    dis1 = Math.abs(x[1] - y[1]);

    if (
        (x[1] % 2 === 0 && y[1] % 2 === 1 && x[0] < y[0]) ||
        (x[1] % 2 === 1 && y[1] % 2 === 0 && x[0] > y[0])
    ) {
        penalty = 1;
    } else {
        penalty = 0;
    }
    dis2 = Math.abs(x[0] - y[0]) + Math.floor(dis1 / 2) + penalty;

    dis = Math.max(dis1, dis2);

    return dis;
}
