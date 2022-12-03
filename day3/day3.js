var fs = require('fs');

fs.readFile('day3.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let c1 = input[i].substring(0, input[i].length / 2);
        let c2 = input[i].substring(input[i].length / 2, input[i].length);
        for (let j = 0; j < c1.length; j++) {
            if (c2.includes(c1[j])) {
                if (c1.charCodeAt(j) > 96) sum += c1.charCodeAt(j) - 96;
                else sum += c1.charCodeAt(j) - 64 + 26;
                break;
            }
        }
    }
    return sum;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    let sum = 0;
    for (let i = 0; i < input.length - 2; i += 3) {
        let bag1 = input[i], bag2 = input[i + 1], bag3 = input[i + 2];
        for (let j = 0; j < bag1.length; j++) {
            if (bag2.includes(bag1[j]) && bag3.includes(bag1[j])) {
                if (bag1.charCodeAt(j) > 96) sum += bag1.charCodeAt(j) - 96;
                else sum += bag1.charCodeAt(j) - 64 + 26;
                break;
            }
        }
    }
    return sum;
}
