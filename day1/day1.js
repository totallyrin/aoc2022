// import fetch from "node-fetch";
//
// var url = 'https://adventofcode.com/2022/day/1/input';
// var storedText;
//
// fetch(url)
//     .then(function(response) {
//         response.text().then(function(text) {
//             storedText = text;
//             console.log(storedText);
//         });
//     });

// const fr = new FileReader();
// fr.readAsArrayBuffer('day1.txt');
// let input = fr.result;
// console.log(input);

var fs = require('fs');

fs.readFile('day1.txt', 'utf8', function(err, data){
    // part 1
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    let cals = 0, max = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            if (cals > max) max = cals;
            cals = 0;
        }
        else {
            cals += parseInt(input[i]);
        }
    }
    return max;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    let cals = 0, max = 0, max2 = 0, max3 = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            if (cals > max) max = cals;
            else if (cals > max2) max2 = cals;
            else if (cals > max3) max3 = cals;
            cals = 0;
        }
        else {
            cals += parseInt(input[i]);
        }
    }
    return max + max2 + max3;
}
