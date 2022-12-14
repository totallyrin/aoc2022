var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data){
    console.log(part1(data));
    console.log(part2(data));
});

function part1(data) {
    let input = data.split(/\r?\n/);
    const fileTree = new Tree(new Node("/"));
    let curr = fileTree.root;
    for (let i = 0; i < input.length; i++) {
        // if line starts with '$', then it is a command
        if (input[i].charAt(0) === '$') {
            let command = input[i].split(/\s/);
            // cd command
            if (command[1] === "cd") {
                if (command[2] === "/") curr = fileTree.root;
                else if (command[2] === "..") {
                    curr = curr.parent;
                }
                else {
                    if (curr.getChild(command[2]) === null) curr.addChild(new Node(command[2], curr));
                    curr = curr.getChild(command[2]);
                }
            }
            // ls command
            else {}
        }
        // otherwise it is output
        else {
            let line = input[i].split(/\s/);
            // if line starts with 'dir', then directory, otherwise file
            if (line[0] === "dir") curr.addChild(new Node(line[1], curr));
            else curr.addChild(new Node(line[1], curr, parseInt(line[0])));
        }
    }
    let nodes = fileTree.root.getAllChildren().concat([fileTree.root]);
    let sum = 0;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].value <= 100000 && !nodes[i].isLeaf()) sum += nodes[i].value;
    }
    return sum;
}

function part2(data) {
    let input = data.split(/\r?\n/);
    const fileTree = new Tree(new Node("/"));
    let curr = fileTree.root;
    for (let i = 0; i < input.length; i++) {
        // if line starts with '$', then it is a command
        if (input[i].charAt(0) === '$') {
            let command = input[i].split(/\s/);
            // cd command
            if (command[1] === "cd") {
                if (command[2] === "/") curr = fileTree.root;
                else if (command[2] === "..") {
                    curr = curr.parent;
                }
                else {
                    if (curr.getChild(command[2]) === null) curr.addChild(new Node(command[2], curr));
                    curr = curr.getChild(command[2]);
                }
            }
            // ls command
            else {}
        }
        // otherwise it is output
        else {
            let line = input[i].split(/\s/);
            // if line starts with 'dir', then directory, otherwise file
            if (line[0] === "dir") curr.addChild(new Node(line[1], curr));
            else curr.addChild(new Node(line[1], curr, parseInt(line[0])));
        }
    }
    let nodes = fileTree.root.getAllChildren().concat([fileTree.root]);
    let sum = fileTree.root.value;
    let total = 70000000, req = 30000000;
    let unused = total - sum;
    let del = req - unused;
    for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].isLeaf() && nodes[i].value >= del && nodes[i].value < sum) sum = nodes[i].value;
    }
    return sum;
}

class Tree {
    constructor(root = null) {
        this.root = root;
    }

    contains(key) {
        let nodes = this.root.getAllChildren.concat([this.root]);
        for (let i = 0; i < nodes.length; i++) if (nodes[i].key === key) return true;
        return false;
    }
}

class Node {
    constructor(key, parent = null, value = 0, children = []) {
        this.key = key;
        this.value = value;
        this.children = children;
        if (parent != null) parent.addChild(this);
        else this.parent = null;
    }

    addChild(child) {
        if (this.getChild(child.key) === null) {
        child.parent = this;
        this.children.push(child);
        this.incrVal(child.value);
        }
    }

    getChild(key) {
        for (let i = 0; i < this.children.length; i++) {
            if (key === this.children[i].key) return this.children[i];
        }
        return null;
    }

    incrVal(val, curr = this) {
        curr.value += val;
        if (curr.parent !== null) {
            curr.incrVal(val, curr.parent);
        }
    }

    isLeaf() {
        return this.children.length === 0;
    }

    getAllChildren(currNode = this) {
        let nodes = [];
        for (let i = 0; i < currNode.children.length; i++) {
            nodes.push(currNode.children[i]);
            nodes = nodes.concat(currNode.getAllChildren(currNode.children[i]));
        }
        return nodes;
    }
}
