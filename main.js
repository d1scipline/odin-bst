function compareNumbers(a, b) {
  return a - b;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = arr.filter((item, index) => arr.indexOf(item) === index);
    arr.sort(compareNumbers);
    let root = this.buildTreeRec(arr, 0, arr.length - 1);
    return root;
  }

  buildTreeRec(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor(end / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTreeRec(
      arr.slice(start, mid),
      0,
      arr.slice(start, mid).length - 1,
    );
    root.right = this.buildTreeRec(
      arr.slice(mid + 1, end + 1),
      0,
      arr.slice(mid + 1, end + 1).length - 1,
    );
    return root;
  }
}

const BST = new Tree([-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(BST.root);
