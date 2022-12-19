const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    let input = data.split(/\r?\n/);
    console.log(part1(input));
    console.log(part2(input));
});

function part1(data) {
    let head = [0,0], tail = [0,0];
    let visited = new Set();
    visited.add(tail.toString());
    for (let i = 0; i < data.length; i++) {
        let instr = data[i].split(/\s/);
        switch (instr[0]) {
            case 'U':
                for (let j = 0; j < instr[1]; j++) {
                    head[1]++;
                    if (!isAdj(head, tail)) {
                        tail = [head[0], head[1] - 1];
                        visited.add(tail.toString());
                    }
                }
                break;
            case 'D':
                for (let j = 0; j < instr[1]; j++) {
                    head[1]--;
                    if (!isAdj(head, tail)) {
                        tail = [head[0], head[1] + 1];
                        visited.add(tail.toString());
                    }
                }
                break;
            case 'L':
                for (let j = 0; j < instr[1]; j++) {
                    head[0]--;
                    if (!isAdj(head, tail)) {
                        tail = [head[0] + 1, head[1]];
                        visited.add(tail.toString());
                    }
                }
                break;
            case 'R':
                for (let j = 0; j < instr[1]; j++) {
                    head[0]++;
                    if (!isAdj(head, tail)) {
                        tail = [head[0] - 1, head[1]];
                        visited.add(tail.toString());
                    }
                }
                break;
        }
    }
    return visited.size;
}

function part2(data) {
    let snake = [];
    for (let i = 0; i < 10; i++) snake.push([0,0]);
    let visited = new Set();
    visited.add(snake[snake.length - 1].toString());
    for (let i = 0; i < data.length; i++) {
        let instr = data[i].split(/\s/);
        switch (instr[0]) {
            case 'U':
                for (let j = 0; j < instr[1]; j++) {
                    snake[0][1]++;
                    moveTails(snake);
                    visited.add(snake[snake.length - 1].toString());
                }
                break;
            case 'D':
                for (let j = 0; j < instr[1]; j++) {
                    snake[0][1]--;
                    moveTails(snake);
                    visited.add(snake[snake.length - 1].toString());
                }
                break;
            case 'L':
                for (let j = 0; j < instr[1]; j++) {
                    snake[0][0]--;
                    moveTails(snake);
                    visited.add(snake[snake.length - 1].toString());
                }
                break;
            case 'R':
                for (let j = 0; j < instr[1]; j++) {
                    snake[0][0]++;
                    moveTails(snake);
                    visited.add(snake[snake.length - 1].toString());
                }
                break;
        }
    }
    return visited.size;
}

function isAdj(head, tail) {
    // same x
    if (head[0] === tail[0]) return Math.max(head[1], tail[1]) - Math.min(head[1], tail[1]) <= 1;
    // same y
    if (head[1] === tail[1]) return Math.max(head[0], tail[0]) - Math.min(head[0], tail[0]) <= 1;
    // diff x and diff y (diagonal)
    return Math.max(head[0], tail[0]) - Math.min(head[0], tail[0]) <= 1 && Math.max(head[1], tail[1]) - Math.min(head[1], tail[1]) <= 1;
}

function moveTails(snake) {
    for (let i = 1; i < snake.length; i++) {
        let head = snake[i - 1], tail = snake[i];
        if (!isAdj(head, tail)) {
            // same x
            if (head[0] === tail[0]) {
                if (head[1] > tail[1]) tail[1]++;
                else tail[1]--;
            }
            // same y
            else if (head[1] === tail[1]) {
                if (head[0] > tail[0]) tail[0]++;
                else tail[0]--;
            }
            // diagonal
            else {
                // move right
                if (head[0] > tail[0]) {
                    tail[0]++;
                    if (head[1] > tail[1]) tail[1]++;
                    else tail[1]--;
                }
                // move left
                else {
                    tail[0]--;
                    if (head[1] > tail[1]) tail[1]++;
                    else tail[1]--;
                }
            }
        }
    }
}
