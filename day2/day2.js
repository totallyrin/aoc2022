var fs = require('fs');

fs.readFile('day2.txt', 'utf8', function(err, data){
    // part 1
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        let curr = input[i];
        switch (curr[0]) {
            case 'A':
                switch (curr[2]) {
                    case 'X': score += 1 + 3; break;
                    case 'Y': score += 2 + 6; break;
                    case 'Z': score += 3; break;
                } break;
            case 'B':
                switch (curr[2]) {
                    case 'X': score += 1; break;
                    case 'Y': score += 2 + 3; break;
                    case 'Z': score += 3 + 6; break;
                } break;
            case 'C':
                switch (curr[2]) {
                    case 'X': score += 1 + 6; break;
                    case 'Y': score += 2; break;
                    case 'Z': score += 3 + 3; break;
                } break;
        }
    }
    return score;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        let curr = input[i];
        switch (curr[0]) {
            // rock
            case 'A':
                switch (curr[2]) {
                    // lose: choose scissors
                    case 'X': score += 3; break;
                    // draw: choose rock
                    case 'Y': score += 1 + 3; break;
                    // win: choose paper
                    case 'Z': score += 2 + 6; break;
                } break;
            // paper
            case 'B':
                switch (curr[2]) {
                    // lose: choose rock
                    case 'X': score += 1; break;
                    // draw: choose paper
                    case 'Y': score += 2 + 3; break;
                    // win: choose scissors
                    case 'Z': score += 3 + 6; break;
                } break;
            // scissors
            case 'C':
                switch (curr[2]) {
                    // lose: choose paper
                    case 'X': score += 2; break;
                    // draw: choose scissors
                    case 'Y': score += 3 + 3; break;
                    // win: choose rock
                    case 'Z': score += 1 + 6; break;
                } break;
        }
    }
    return score;
}
