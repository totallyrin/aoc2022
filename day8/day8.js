const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    let forest = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (j === 0) forest.push([parseInt(input[i].charAt(j))]);
            else forest[i] = forest[i].concat([parseInt(input[i].charAt(j))]);
        }
    }
    let count = 0;
    for (let y = 0; y < forest.length; y++) {
        for (let x = 0; x < forest[y].length; x++) {
            if (check(forest, x, y)) count++;
        }
    }
    return count;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    let forest = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (j === 0) forest.push([parseInt(input[i].charAt(j))]);
            else forest[i] = forest[i].concat([parseInt(input[i].charAt(j))]);
        }
    }
    let score = 0;
    for (let y = 0; y < forest.length; y++) {
        for (let x = 0; x < forest[y].length; x++) {
            if (getScore(forest, x, y) > score) score = getScore(forest, x, y);
        }
    }
    return score;
}

function check(forest, x, y) {
    return checkN(forest, x, y, forest[y][x]) || checkS(forest, x, y, forest[y][x]) || checkE(forest, x, y, forest[y][x]) || checkW(forest, x, y, forest[y][x]);
}

function checkW(forest, x, y, height) {
    if (x === 0) return true;
    return checkW(forest, x - 1, y, height) && forest[y][x - 1] < height;
}

function checkE(forest, x, y, height) {
    if (x === forest[0].length - 1) return true;
    return checkE(forest, x + 1, y, height) && forest[y][x + 1] < height;
}

function checkN(forest, x, y, height) {
    if (y === 0) return true;
    return checkN(forest, x, y - 1, height) && forest[y - 1][x] < height;
}

function checkS(forest, x, y, height) {
    if (y === forest.length - 1) return true;
    return checkS(forest, x, y + 1, height) && forest[y + 1][x] < height;
}

function getScore(forest, x, y) {
    return scoreN(forest, x, y, forest[y][x]) * scoreS(forest, x, y, forest[y][x]) * scoreE(forest, x, y, forest[y][x]) * scoreW(forest, x, y, forest[y][x]);
}

function scoreW(forest, x, y, height) {
    if (x === 0) return 0;
    if (forest[y][x - 1] >= height) return 1;
    return scoreW(forest, x - 1, y, height) + 1;
}

function scoreE(forest, x, y, height) {
    if (x === forest[0].length - 1) return 0;
    if (forest[y][x + 1] >= height) return 1;
    return scoreE(forest, x + 1, y, height) + 1;
}

function scoreN(forest, x, y, height) {
    if (y === 0) return 0;
    if (forest[y - 1][x] >= height) return 1;
    return scoreN(forest, x, y - 1, height) + 1;
}

function scoreS(forest, x, y, height) {
    if (y === forest.length - 1) return 0;
    if (forest[y + 1][x] >= height) return 1;
    return scoreS(forest, x, y + 1, height) + 1;
}