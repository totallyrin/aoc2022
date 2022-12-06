var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (i % 4 < arr.length) arr[i % 4] = data.charAt(i);
        else arr.push(data.charAt(i));
        if (((new Set(arr)).size === arr.length && arr.length === 4) && !(arr.includes(undefined)))
            return i + 1;
    }
    return undefined;
}

function part2(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (i % 14 < arr.length) arr[i % 14] = data.charAt(i);
        else arr.push(data.charAt(i));
        if (((new Set(arr)).size === arr.length & arr.length === 14) && !(arr.includes(undefined)))
            return i + 1;
    }
    return undefined;
}
