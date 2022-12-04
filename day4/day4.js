var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split(/,/);
        let elf1 = input[i][0].split(/-/), elf2 = input[i][1].split(/-/);
        if (parseInt(elf1[0]) >= parseInt(elf2[0]) && parseInt(elf1[1]) <= parseInt(elf2[1])) count++;
        else if (parseInt(elf2[0]) >= parseInt(elf1[0]) && parseInt(elf2[1]) <= parseInt(elf1[1])) count++;
    }
    return count;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split(/,/);
        let elf1 = input[i][0].split(/-/), elf2 = input[i][1].split(/-/);
        if (!(parseInt(elf2[0]) > parseInt(elf1[1])) && !(parseInt(elf2[1]) < parseInt(elf1[0]))) count++;
    }
    return count;
}
