var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    // get each line of code
    let input = data.split(/\r?\n/);
    // array to hold stacks
    const stacks = [];
    // array to hold instructions
    const instr = [];
    // for loop reads input
    for (let i = 0; i < input.length; i++) {
        // if diagram, add to stacks
        if (input[i].includes('[')) {
            let str = input[i].replace(/\s{2,4}/g, '_');
            str = str.replace(/[\[\] ]/g, '');
            for (let j = 0; j < str.length; j++) {
                if (str.charAt(j).match(/^[a-zA-Z]$/)) {
                    while (stacks.length <= j) stacks.push([]);
                    stacks[j].push(str.charAt(j));
                }
            }
        }
        // if instruction, add to instructions
        else if (input[i].includes('move')) {
            let instruction = input[i].replace(/[^0-9\s]*/g, '');
            let x = instruction.split(/\s/g).filter(Boolean);
            instr.push(x);
        }
    }
    // reverse stacks so most recent element is at end
    for (let i = 0; i < stacks.length; i++) stacks[i] = stacks[i].reverse();
    // iterate through instructions
    for (let i = 0; i < instr.length; i++) {
        let num = parseInt(instr[i][0]);
        for (let j = 0; j < num; j++) {
            let crate = stacks[parseInt(instr[i][1]) - 1].pop();
            stacks[parseInt(instr[i][2]) - 1].push(crate);
        }
    }
    let str = "";
    for (let i = 0; i < stacks.length; i++) str += stacks[i][stacks[i].length - 1];
    return str;
}

function part2(data) {
    // get each line of code
    let input = data.split(/\r?\n/);
    // array to hold stacks
    const stacks = [];
    // array to hold instructions
    const instr = [];
    // for loop reads input
    for (let i = 0; i < input.length; i++) {
        // if diagram, add to stacks
        if (input[i].includes('[')) {
            let str = input[i].replace(/\s{2,4}/g, '_');
            str = str.replace(/[\[\] ]/g, '');
            for (let j = 0; j < str.length; j++) {
                if (str.charAt(j).match(/^[a-zA-Z]$/)) {
                    while (stacks.length <= j) stacks.push([]);
                    stacks[j].push(str.charAt(j));
                }
            }
        }
        // if instruction, add to instructions
        else if (input[i].includes('move')) {
            let instruction = input[i].replace(/[^0-9\s]*/g, '');
            let x = instruction.split(/\s/g).filter(Boolean);
            instr.push(x);
        }
    }
    // reverse stacks so most recent element is at end
    for (let i = 0; i < stacks.length; i++) stacks[i] = stacks[i].reverse();
    // iterate through instructions
    for (let i = 0; i < instr.length; i++) {
        let num = parseInt(instr[i][0]);
        if (num < 2) {
            for (let j = 0; j < num; j++) {
                let crate = stacks[parseInt(instr[i][1]) - 1].pop();
                stacks[parseInt(instr[i][2]) - 1].push(crate);
            }
        }
        else { // move multiple crates at once
            let temp = [];
            for (let j = 0; j < num; j++) {
                let crate = stacks[parseInt(instr[i][1]) - 1].pop();
                temp.push(crate);
            }
            for (let j = 0; j < num; j++) {
                let crate = temp.pop();
                stacks[parseInt(instr[i][2]) - 1].push(crate);
            }
        }
    }
    let str = "";
    for (let i = 0; i < stacks.length; i++) str += stacks[i][stacks[i].length - 1];
    return str;
}
