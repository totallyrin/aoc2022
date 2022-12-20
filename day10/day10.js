const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    let input = data.split(/\r?\n/);
    console.log(part1(input));
    console.log(part2(input));
});

function part1(input) {
    let x = 1, cycle = 1, str = 0;
    for (let i = 0; i < input.length; i++) {
        if (cycle === 20 || (cycle - 20) % 40 === 0) str += (cycle * x);
        let instr = input[i].split(/\s/);
        if (instr.length !== 1) {
            cycle++;
            if (cycle === 20 || (cycle - 20) % 40 === 0) str += (cycle * x);
            x += parseInt(instr[1]);
            cycle++;
        }
        else cycle++;
    }
    if (cycle === 20 || (cycle - 20) % 40 === 0) str += (cycle * x);
    return str;
}

function part2(input) {
    let x = 1, cycle = 1;
    let crt = "";
    for (let i = 0; i < input.length; i++) {
        crt = draw(crt, x, cycle);
        cycle++;
        let instr = input[i].split(/\s/);
        if (instr.length !== 1) {
            crt = draw(crt, x, cycle);
            cycle++;
            x += parseInt(instr[1]);
        }
    }
    return crt;
}

function draw(crt, x, cycle) {
    if ((cycle - 1) % 40 === 0) crt = crt.concat("\n");
    let pos = (cycle - 1) % 40;
    if (pos === x - 1 || pos === x || pos === x + 1) {
        crt = crt.concat("#");
    }
    else crt = crt.concat(".");
    return crt;
}
