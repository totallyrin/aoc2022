const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    let input = data.split(/\r?\n/);
    console.log(part1(input));
    console.log(part2(input));
});

function part1(input) {
    let monkeys = [];
    // initialize monkey items at start
    for (let i = 0; i < input.length; i += 7) {
        monkeys.push([]);
        let items = input[i + 1].split(/\s/);
        for (let j = 0; j < items.length; j++) {
            if (!isNaN(items[j]) && items[j] !== "") monkeys[i / 7].push(parseInt(items[j]));
            else if (!isNaN(items[j].substring(0, items[j].length - 1)) && items[j] !== "") monkeys[i / 7].push(parseInt(items[j].substring(0, items[j].length - 1)));
        }
    }
    let inspections = [];
    for (let i = 0; i < monkeys.length; i++) inspections.push(0);
    // 20 rounds
    for (let i = 0; i < 20; i++) {
        // each monkey takes its turn
        for (let j = 0; j < monkeys.length; j++) {
            if (monkeys[j].length === 0) continue;
            let operation = input[(j * 7) + 2].split(/\s/);
            let test = [parseInt((input[(j * 7) + 3].split(/\s/)).pop()), parseInt((input[(j * 7) + 4].split(/\s/)).pop()), parseInt((input[(j * 7) + 5].split(/\s/)).pop())];
            // monkey inspects each item
            for (let k = 0; k < monkeys[j].length; k++) {
                inspections[j]++;
                let worry = monkeys[j][k];
                // worry level increases using operation
                let operator = operation[operation.length - 2], num = operation[operation.length - 1];
                switch (operator) {
                    case "+":
                        if (isNaN(num)) worry += worry;
                        else worry += parseInt(num);
                        break;
                    case "-":
                        if (isNaN(num)) worry -= worry;
                        else worry -= parseInt(num);
                        break;
                    case "*":
                        if (isNaN(num)) worry *= worry;
                        else worry *= parseInt(num);
                        break;
                    case "/":
                        if (isNaN(num)) worry = Math.floor(worry / worry);
                        else worry = Math.floor(worry / parseInt(num));
                        break;
                }
                worry = Math.floor(worry / 3);
                // do test
                if (worry % test[0] === 0) monkeys[test[1]].push(worry);
                else monkeys[test[2]].push(worry);
            }
            monkeys[j] = [];
        }
    }
    let max1 = 0, max2 = 0;
    for (let i = 0; i < inspections.length; i++)
        if (inspections[i] > Math.min(max1, max2)) {
            if (Math.min(max1, max2) === max1) max1 = inspections[i];
            else max2 = inspections[i];
        }
    return max1 * max2;
}

function part2(input) {
    let monkeys = [];
    // initialize monkey items at start
    for (let i = 0; i < input.length; i += 7) {
        monkeys.push([]);
        let items = input[i + 1].split(/\s/);
        for (let j = 0; j < items.length; j++) {
            if (!isNaN(items[j]) && items[j] !== "") monkeys[i / 7].push(parseInt(items[j]));
            else if (!isNaN(items[j].substring(0, items[j].length - 1)) && items[j] !== "") monkeys[i / 7].push(parseInt(items[j].substring(0, items[j].length - 1)));
        }
    }
    let mod = 1;
    for (let i = 3; i < input.length; i += 7) {
        mod *= parseInt((input[i].split(/\s/)).pop());
    }
    let inspections = [];
    for (let i = 0; i < monkeys.length; i++) inspections.push(0);
    // 20 rounds
    for (let i = 0; i < 10000; i++) {
        // each monkey takes its turn
        for (let j = 0; j < monkeys.length; j++) {
            if (monkeys[j].length === 0) continue;
            let operation = input[(j * 7) + 2].split(/\s/);
            let test = [parseInt((input[(j * 7) + 3].split(/\s/)).pop()), parseInt((input[(j * 7) + 4].split(/\s/)).pop()), parseInt((input[(j * 7) + 5].split(/\s/)).pop())];
            // monkey inspects each item
            for (let k = 0; k < monkeys[j].length; k++) {
                inspections[j]++;
                let worry = monkeys[j][k];
                // worry level increases using operation
                let operator = operation[operation.length - 2], num = operation[operation.length - 1];
                switch (operator) {
                    case "+":
                        if (isNaN(num)) worry += worry;
                        else worry += parseInt(num);
                        break;
                    case "-":
                        if (isNaN(num)) worry -= worry;
                        else worry -= parseInt(num);
                        break;
                    case "*":
                        if (isNaN(num)) worry *= worry;
                        else worry *= parseInt(num);
                        break;
                    case "/":
                        if (isNaN(num)) worry = Math.floor(worry / worry);
                        else worry = Math.floor(worry / parseInt(num));
                        break;
                }
                worry = Math.floor(worry % mod);
                // do test
                if (worry % test[0] === 0) monkeys[test[1]].push(worry);
                else monkeys[test[2]].push(worry);
            }
            monkeys[j] = [];
        }
    }
    let max1 = 0, max2 = 0;
    for (let i = 0; i < inspections.length; i++)
        if (inspections[i] > Math.min(max1, max2)) {
            if (Math.min(max1, max2) === max1) max1 = inspections[i];
            else max2 = inspections[i];
        }
    return max1 * max2;
}
